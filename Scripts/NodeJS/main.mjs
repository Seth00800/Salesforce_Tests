import { configVars } from "../../Config/configVars.mjs";
import fetch from "node-fetch"


const main = async() => {
    const myToken = configVars.accessToken
    const sfurl = configVars.salesforceOrgApiUrl
    const headers = {
        "Content-Type": "application/json",
        "Authorization": myToken
    }
    const rawResp = await fetch('http://localhost:30003/data/api-management/apis/v1/createusers?id=TammiLaw&version=1.0.0&coll=homework&token='+myToken+'&sfurl='+sfurl, {headers: headers})
    const rawRespJson = await rawResp.json()
    console.log(rawRespJson)

}

await main()