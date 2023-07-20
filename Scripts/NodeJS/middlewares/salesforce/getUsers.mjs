// import fetch from 'node-fetch'
import fetch from "fetch-with-proxy";
import { configVars } from "../../../../Config/configVars.mjs";
import {getToken} from "../authorization/authorization.mjs";
import {qpExtract} from "../queryparams/getQueryParams.mjs";
import {mongoConnectGet} from "../databases/mongodb/mongodb.mjs";
// import { HttpsProxyAgent } from 'https-proxy-agent';
// const newProxy = new HttpsProxyAgent('http://dickersons:Setdic575605@10.98.21.24:8080')


export const getAllUsers = async(config) => {
    let myUserArr = []
    let activeState;
    let myUserJson;

    let headers = {
        "Content-Type": "application/json",
        "Authorization": config.accessToken
    }

    // const reqOptions = {
    //
    // }

    const rawResp = await fetch.default(config.salesforceOrgApiUrl+config.endPoints.getAllUsers, {headers: headers})

    const respJson = await rawResp.json()
    const records = respJson.records

    for(let i=0; i<records.length; i++ ) {
        const individualRecord = respJson.records[i].attributes.url
        const rawResp2 = await fetch.default(config.salesforceOrgApiUrl+individualRecord, {headers: headers})


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

    console.log(JSON.stringify(myUserArr, null, 2))

    return myUserArr

}

export const getActiveStateUserInfo = async(users, token, url) => {
    let myUserArr = []
    let activeState;
    let myUserJson;

    let headers = {
        "Content-Type": "application/json",
        "Authorization": token
    }

    const rawResp = await fetch.default(url+configVars.endPoints.getAllUsers, {headers: headers})

    const respJson = await rawResp.json()
    const records = respJson.records

    for(let i=0; i<records.length; i++ ) {
        for(let j=0; j<users.length; j++) {
            const userListMember = users[j]
            const currentRecord = records[i].Username
            if (currentRecord === userListMember) {
                const individualRecord = records[i].attributes.url
                const rawResp2 = await fetch.default(url + individualRecord, {headers: headers})
                const respJson2 = await rawResp2.json()
                const userName = respJson2.Username
                const userId = respJson2.Id
                activeState = respJson2.IsActive
                myUserJson = {
                    "loginId": userName,
                    "userId": userId,
                    "activeState": activeState
                }
                myUserArr.push(myUserJson)
            }
        }
    }

    console.log(JSON.stringify(myUserArr, null, 2))

    return myUserArr

}
