import { configVars } from "../../../../Config/configVars.mjs";
import fetch from "node-fetch";


export const getToken = async() => {

    let clientId = configVars.clientId
    let clientSecret = configVars.clientSecret
    let salesforceOrgApiUrl = configVars.salesforceOrgApiUrl
    let grantType = configVars.grantType
    let endPoint = configVars.endPoints.getToken

    const rawResp = await fetch(salesforceOrgApiUrl+endPoint+"client_id="+clientId+"&client_secret="+clientSecret+"&grant_type="+grantType)

    const respJson = await rawResp.json()

    const myAccessToken = "Bearer "+respJson.access_token

    // console.log(myAccessToken)

    return myAccessToken

}

// await getToken()