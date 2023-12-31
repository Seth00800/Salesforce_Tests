import {qpExtract} from "../queryparams/getQueryParams.mjs";
import {mongoConnectGet} from "../databases/mongodb/mongodb.mjs";


export const createAllMyUsers = async(req, res, next, token, config, idArr) => {

    console.log("I AM IN CR")
    const updatedMergeArr = []
    const myToken = token
    const configVars = config
    const profileIds = idArr
    let mergedArr;
    const QP = await qpExtract(req, res, next)
    console.log("MY QUERY PARAMETERS: "+ JSON.stringify(QP))
    let newUsers = await mongoConnectGet(QP, configVars.mongoUname, configVars.mongoPwd, configVars.mongoUrl, configVars.mongoUrlPrefix)
    console.log("BLAH BLAH BLAH")
    console.log(newUsers)

    newUsers = newUsers.userList

    console.log(newUsers)

    // res.statusCode = 200
    // res.message = "Successful"
    // res.success = {
    //     "newUsers": newUsers
    // }
    // console.log(res.success)
    // next()

    let headers = {
        "Content-Type": "application/json",
        "Authorization": myToken
    }

    try {
        for (let i = 0; i < newUsers.length; i++) {
            let myUserJson = newUsers[i]
            const keys = Object.entries(myUserJson)
            // console.log(keys)
            for (const [key, value] of keys) {
                if (key === "ProfileId" && value === "Partner") {
                    console.log("I GOT MY PARTNER")
                    for (let j = 0; j < profileIds.length; j++) {
                        let myProfId = profileIds[j]
                        const keys = Object.entries(myProfId)
                        for (const [key, value] of keys) {
                            if (key === "profileName" && value === "Partner") {
                                myUserJson["ProfileId"] = myProfId.profileId
                                mergedArr = {...myUserJson, ...configVars.createUserObj}
                                updatedMergeArr.push(mergedArr)
                            }
                        }
                    }
                } else if (key === "ProfileId" && value === "Attorney") {
                    console.log("I GOT MY ATTORNEY")
                    for (let j = 0; j < profileIds.length; j++) {
                        let myProfId = profileIds[j]
                        const keys = Object.entries(myProfId)
                        for (const [key, value] of keys) {
                            if (key === "profileName" && value === "Attorney") {
                                myUserJson["ProfileId"] = myProfId.profileId
                                mergedArr = {...myUserJson, ...configVars.createUserObj}
                                updatedMergeArr.push(mergedArr)
                            }
                        }
                    }
                } else if (key === "ProfileId" && value === "Paralegal/CM") {
                    console.log("I GOT MY Paralegal/CM")
                    for (let j = 0; j < profileIds.length; j++) {
                        let myProfId = profileIds[j]
                        const keys = Object.entries(myProfId)
                        for (const [key, value] of keys) {
                            if (key === "profileName" && value === "Paralegal/CM") {
                                myUserJson["ProfileId"] = myProfId.profileId
                                mergedArr = {...myUserJson, ...configVars.createUserObj}
                                updatedMergeArr.push(mergedArr)
                            }
                        }
                    }
                } else if (key === "ProfileId" && value === "Financial") {
                    console.log("I GOT MY FINANCIAL")
                    for (let j = 0; j < profileIds.length; j++) {
                        let myProfId = profileIds[j]
                        const keys = Object.entries(myProfId)
                        for (const [key, value] of keys) {
                            if (key === "profileName" && value === "Financial") {
                                myUserJson["ProfileId"] = myProfId.profileId
                                mergedArr = {...myUserJson, ...configVars.createUserObj}
                                updatedMergeArr.push(mergedArr)
                            }
                        }
                    }
                } else if (key === "ProfileId" && value === "IT/Admin") {
                    console.log("I GOT MT IT/Admin")
                    for (let j = 0; j < profileIds.length; j++) {
                        let myProfId = profileIds[j]
                        const keys = Object.entries(myProfId)
                        for (const [key, value] of keys) {
                            if (key === "profileName" && value === "IT/Admin") {
                                myUserJson["ProfileId"] = myProfId.profileId
                                mergedArr = {...myUserJson, ...configVars.createUserObj}
                                updatedMergeArr.push(mergedArr)
                            }
                        }
                    }
                }
            }
        }
    }catch (e){
        console.log("In Building Array Create New User")
        console.log(e)
    }


    // try {
    //     for (let i = 0; i < updatedMergeArr.length; i++) {
    //         const rawResp = await fetch(configVars.salesforceOrgApiUrl + configVars.endPoints.createNewUser, {
    //             method: 'POST',
    //             body: JSON.stringify(updatedMergeArr[i]),
    //             headers: headers
    //         })
    //         const rawRespJson = await rawResp.json()
    //         console.log("This is HTTP Status For: "+ updatedMergeArr[i] +" "+rawRespJson.status)
    //     }
    // }catch (e) {
    //     console.log("In API Call To Create New User")
    //     console.log(e)
    // }
}