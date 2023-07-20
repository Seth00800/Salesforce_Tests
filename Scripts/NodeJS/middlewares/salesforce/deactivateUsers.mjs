import { configVars } from "../../../../Config/configVars.mjs";
// import fetch from 'node-fetch'
import fetch from "fetch-with-proxy";
import { getActiveStateUserInfo } from "./getUsers.mjs";


export const deactivateUsers = async(req, res, next) => {

    const myToken = req.body.accessToken
    const users = req.body.userList
    const sfUrl = req.body.salesforceOrgApiUrl
    const myUserList = await getActiveStateUserInfo(users, myToken, sfUrl)
    const successful = [];
    const failed = [];

    try{
        for(let i=0; i<myUserList.length; i++){
                try {
                    let bodyData = {
                        "IsActive": false
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
                    console.log(myRawResp)
                    const myStatus = myRawResp.status
                    console.log(myRawResp.status)
                    if(myStatus === 204){
                        console.log("Successfully Deactivated User: "+ myUserList[i])
                        successful.push("Successfully Deactivated User: "+ myUserList[i] + " Status: "+myStatus)
                    }else {
                        console.log("Failed To Deactivate User: "+myUserList[i] + " Status: "+myStatus)
                        failed.push("Failed To Deactivate User: "+myUserList[i] + " Status: "+myStatus)
                    }

                } catch (e) {
                    console.log(e)
                    console.log("Failed To Deactivate Users")
                    console.log(e)
                    e.statusCode = 500
                    e.message = {
                        "Message": "Could Not Deactivate Users"
                    }
                    e.name = "Deactivation Failed"
                    next(e)
                }
            }
            res.statusCode = 200
            res.message = "Successfully Deactivated All Or Part Of Login Ids Specified"
            res.success = {
                "successful": successful,
                "failed": failed
            }
            console.log(res.success)
            next()
        }catch (e) {
            console.log("Failed To Start Deactivation Subroutine")
            console.log(e)
            e.statusCode = 500
            e.message = {
                "Message": "Could Not Start User Deactivation Subroutine"
            }
            e.name = "Failed To Start Deactivation Subroutine"
            next(e)
        }
    }