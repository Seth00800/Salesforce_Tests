import { configVars } from "../../Config/configVars.mjs";
import fetch from "node-fetch"


const main = async() => {
    const myToken = configVars.accessToken
    const headers = {
        "Content-Type": "application/json",
        "Authorization": myToken
    }
    const rawResp = await fetch('http://localhost:30003/data/api-management/apis/v1/createusers?id=TammiLaw&version=1.0.0&coll=homework', {headers: headers})
    const rawRespJson = await rawResp.json()
    console.log(rawRespJson)

}

await main()