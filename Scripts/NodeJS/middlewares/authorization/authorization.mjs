import { configVars } from "../../../../Config/configVars.mjs";
import fetch from "node-fetch";
import fs  from "fs-extra"



export const getToken = async() => {

    let clientId = configVars.clientId
    let clientSecret = configVars.clientSecret
    let salesforceOrgApiUrl = configVars.salesforceOrgApiUrl
    let grantType = configVars.grantType
    let endPoint = configVars.endPoints.getToken

    console.log(clientId)
    console.log(clientSecret)
    console.log(salesforceOrgApiUrl)
    console.log(grantType)
    console.log(endPoint)

    const rawResp = await fetch(salesforceOrgApiUrl+endPoint+"client_id="+clientId+"&client_secret="+clientSecret+"&grant_type="+grantType)

    const respJson = await rawResp.json()

    const myAccessToken = Buffer.from("Bearer "+respJson.access_token)

    // console.log(myAccessToken)
    const myFile = fs.writeFileSync("./token", myAccessToken)

    return myFile

}

await getToken()