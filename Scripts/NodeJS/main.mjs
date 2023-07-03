import { configVars } from "../../Config/configVars.mjs";
import { getAllUsers } from "./testEndpoints.mjs";
import { getToken } from "./authorization.mjs";


const main = async() => {

    await getAllUsers(await getToken(), configVars.salesforceOrgApiUrl)




}

await main()