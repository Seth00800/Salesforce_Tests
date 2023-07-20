import { configVars } from "../../Config/configVars.mjs";
import fetch from "node-fetch"


const main = async() => {

    console.log("I AM IN FIRST MAIN")

    const token = process.env['myToken']
    const sfURL = process.env['sfOrgURL']
    const id = process.env['Credentials']

    const headers = {
        "Content-Type": "application/json",
        "Authorization": token
    }

    const url = sfURL+'/data/api-management/apis/v1/createusers?id='+id+'&version=1.0.0&coll=homework';
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