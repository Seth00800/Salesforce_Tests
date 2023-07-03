import fetch from 'node-fetch'
import { configVars } from "../../Config/configVars.mjs";


export const getAllUsers = async(token, sfUrl) => {

    // console.log(token)
    // console.log(sfUrl)
    let myUserArr = []

    let headers = {
        "Content-Type": "application/json",
        "Authorization": token
    }

    const rawResp = await fetch(sfUrl+'/services/data/v41.0/query?q=SELECT+UserName+FROM+User', {headers: headers})

    // console.log(rawResp)

    const respJson = await rawResp.json()
    const records = respJson.records
    // console.log(JSON.stringify(respJson, null, 2))
    // console.log(respJson.records[0].attributes.url)
    // const individualRecord = respJson.records[0].attributes.url

    const rawResp2 = await fetch(sfUrl+'/services/data/v41.0/sobjects/User/0058c00000CEV5dAAH', {headers: headers})

    const respJson2 = await rawResp2.json()
    // console.log(respJson2)
    // const userName= respJson2.Name
    // const userId=  respJson2.Id
    // const activeState = respJson2.IsActive
    //
    // const myUserJson = {
    //     "userName": userName,
    //     "userId": userId,
    //     "activeState": activeState
    // }

    // console.log(myUserJson)



    for(let i=0; i<records.length; i++ ) {
        const individualRecord = respJson.records[i].attributes.url
        const rawResp2 = await fetch(sfUrl+individualRecord, {headers: headers})

        const respJson2 = await rawResp2.json()
        const userName= respJson2.Name
        const userId=  respJson2.Id
        const activeState = respJson2.IsActive

        const myUserJson = {
            "userName": userName,
            "userId": userId,
            "activeState": activeState
        }
        myUserArr.push(myUserJson)
    }

    console.log(myUserArr)

}
