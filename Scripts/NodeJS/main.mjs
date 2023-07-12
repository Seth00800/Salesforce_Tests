import { configVars } from "../../Config/configVars.mjs";
import { createSfUser } from "./testEndpoints.mjs";
import { getToken } from "./middlewares/authorization/authorization.mjs";
import { getProfileId } from "./createNewUsers.mjs";
import { userDataObj } from "../../Config/importUsers.mjs";


const main = async() => {

    await createSfUser(await getToken(), configVars, await getProfileId(await getToken(), configVars.salesforceOrgApiUrl, configVars.endPoints.profileIds, configVars.endPoints.profileId), userDataObj)

}

await main()