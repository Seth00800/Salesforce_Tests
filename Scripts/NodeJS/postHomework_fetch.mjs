import { configVars } from "../../Config/configVars.mjs";
import fetch from "node-fetch"


const main = async() => {

    console.log("I AM IN FIRST POST HOMEWORK FETCH")

    const token = process.env['myToken']
    const sfURL = process.env['sfOrgURL']
    // const id = process.env['Credentials']

    const headers = {
        "Content-Type": "application/json",
        "Authorization": token
    }

    const url = configVars.sfDomain+'/data/api-management/apis/v1/postHomework?coll=homework';
    const data = {
        "salesforceOrgApiUrl": sfURL,
        "accessToken": token
    }

    const rawResp = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
    })

    const rawRespJson = await rawResp.json()
    console.log(rawRespJson)

}

await main()