import fetch from 'node-fetch'
import { configVars } from "../../../../Config/configVars.mjs";
import {getToken} from "../authorization/authorization.mjs";


export const getAllUsers = async(token, config) => {
    let myUserArr = []
    let activeState;
    let myUserJson;

    let headers = {
        "Content-Type": "application/json",
        "Authorization": token
    }

    const rawResp = await fetch(config.salesforceOrgApiUrl+config.endPoints.getAllUsers, {headers: headers})

    const respJson = await rawResp.json()
    const records = respJson.records

    for(let i=0; i<records.length; i++ ) {
        const individualRecord = respJson.records[i].attributes.url
        const rawResp2 = await fetch(config.salesforceOrgApiUrl+individualRecord, {headers: headers})


        const respJson2 = await rawResp2.json()
        // console.log(respJson2)
        if(respJson2.IsActive === true) {
            const userName= respJson2.Name
            const userId=  respJson2.Id
            activeState = respJson2.IsActive
            myUserJson = {
                "userName": userName,
                "userId": userId,
                "activeState": activeState
            }
        }


        myUserArr.push(myUserJson)
    }

    console.log(myUserArr)

    return myUserArr

}

