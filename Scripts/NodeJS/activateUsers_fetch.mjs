import { configVars } from "../../Config/configVars.mjs";
import fetch from "node-fetch"


const main = async() => {

    console.log("I AM IN DEACTIVATE USER FETCH")

    const token = process.env['myToken']
    const sfURL = process.env['sfOrgURL']
    const users = process.env['users']
    console.log(users)
    const userFormat = users.replace(/\s+/g, "")
    const userArr = userFormat.split(',')
    // const id = process.env['Credentials']

    const headers = {
        "Content-Type": "application/json",
        "Authorization": token
    }

    const url = configVars.sfDomain+'/data/api-management/apis/v1/activateUsers';
    const data = {
        "salesforceOrgApiUrl": sfURL,
        "accessToken": token,
        "userList": userArr
    }

    console.log(data)

    const rawResp = await fetch(url, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(data),
    })

    const rawRespJson = await rawResp.json()
    console.log(rawRespJson)

}

await main()