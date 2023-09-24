import { configVars } from "../../../../Config/configVars.mjs";
import fetch from "node-fetch";
import { getToken } from "../../middlewares/authorization/authorization.mjs"
import { getAllUsers } from "./testEndpoints.mjs"


export const deactivateAllUsers = async(token, users, config) => {

    const myToken = token
    const myUserList = users
    const configVars = config

    for(let i=0; i<myUserList.length; i++){
        // const myUserId = myUserList[i].userId
        // const myUserName = myUserList[i].userName
            try {
                let bodyData = {
                    "IsActive": false
                }

                let headers = {
                    "Content-Type": "application/json",
                    "Authorization": myToken
                }
                const myRawResp = await fetch(configVars.salesforceOrgApiUrl + configVars.endPoints.deactivateUser + myUserList[i].userId, {
                    method: 'PATCH',
                    body: JSON.stringify(bodyData),
                    headers: headers
                })
                const myStatus = myRawResp.status
                console.log(myRawResp.status)
                if(myStatus === 204){
                    console.log("Successfully Deactivated User: "+ myUserList[i].userName)
                }else {
                    const myRespJson = await myRawResp.json()
                    myRespJson["userName"] = myUserList[i].userName
                    myRespJson["userId"] = myUserList[i].userId
                    console.log(myRespJson)
                    // console.log(myRawResp)
                }

            } catch (e) {
                console.log(e)
            }
        }
    }


await deactivateAllUsers(await getToken(), await getAllUsers(await getToken(), configVars), configVars)