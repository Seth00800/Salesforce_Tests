import { configVars } from "../../../../Config/configVars.mjs";
// import fetch from 'node-fetch'
import fetch from "fetch-with-proxy";
import { getActiveStateUserInfo } from "./getUsers.mjs";


export const activateUsers = async(req, res, next) => {

    const myToken = req.body.accessToken
    const users = req.body.userList
    const sfUrl = req.body.salesforceOrgApiUrl
    const myUserList = await getActiveStateUserInfo(users, myToken, sfUrl)
    const successful = [];
    const failed = [];

    try {
        for (let i = 0; i < myUserList.length; i++) {
            try {
                let bodyData = {
                    "IsActive": true
                }

                let headers = {
                    "Content-Type": "application/json",
                    "Authorization": myToken
                }
                const myRawResp = await fetch.default(sfUrl + configVars.endPoints.userActivation + myUserList[i].userId, {
                    method: 'PATCH',
                    body: JSON.stringify(bodyData),
                    headers: headers
                })
                const myStatus = myRawResp.status
                console.log(myRawResp.status)
                if (myStatus === 204) {
                    console.log("Successfully Activated User: " + myUserList[i].loginId)
                    successful.push("Successfully Activated User: " + myUserList[i].loginId + " Status: " + myStatus)
                } else {
                    console.log("Failed To Activate User: " + myUserList[i].loginId + " Status: " + myStatus)
                    failed.push("Failed To Activate User: " + myUserList[i].loginId + " Status: " + myStatus)
                }

            } catch (e) {
                console.log("Failed To Start Activate Users Subroutine")
                console.log(e)
                e.statusCode = 500
                e.message = {
                    "Message": "Failed To Start Activate Users Subroutine"
                }
                e.name = "Activation Failed"
                next(e)
            }
        }
        res.statusCode = 200
        res.message = "Successfully Activated All Or Part Of Login Ids Specified"
        res.success = {
            "successful": successful,
            "failed": failed
        }
        console.log(res.success)
        next()
    }catch (e){
        console.log("Failed To Start Activation Subroutine")
        console.log(e)
        e.statusCode = 500
        e.message = {
            "Message": "Could Not Start User Activation Subroutine"
        }
        e.name = "Failed To Start Activation Subroutine"
        next(e)
    }
}
