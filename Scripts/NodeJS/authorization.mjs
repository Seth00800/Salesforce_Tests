import { configVars } from "../../Config/configVars.mjs";
import fetch from "node-fetch";


export const getToken = async() => {

    let clientId = configVars.clientId
    let clientSecret = configVars.clientSecret
    let salesforceTokenUrl = configVars.salesforceTokenUrl
    let grantType = configVars.grantType

    const rawResp = await fetch(salesforceTokenUrl+"client_id="+clientId+"&client_secret="+clientSecret+"&grant_type="+grantType)

    const respJson = await rawResp.json()

    const myAccessToken = "Bearer "+respJson.access_token

    // console.log(myAccessToken)

    return myAccessToken



}