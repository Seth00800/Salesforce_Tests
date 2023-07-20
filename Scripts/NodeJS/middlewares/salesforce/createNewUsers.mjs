import fetch from "node-fetch";
import {qpExtract} from "../queryparams/getQueryParams.mjs";
import {mongoConnectGet} from "../databases/mongodb/mongodb.mjs";
import {configVars} from "../../../../Config/configVars.mjs";


export const getProfileIds = async(req, res, next) => {
    console.log("I AM IN getProfileId")
    const myToken = req.body.accessToken
    // console.log(myToken)
    const myOrgUrl = req.body.salesforceOrgApiUrl
    const myIdArr = []
    // console.log(myOrgUrl+configVars.endPoints.profileIds)

    let headers = {
        "Authorization": myToken,
        "Content-Type": "application/json"
    }

    const reqOptions = {method: 'GET',headers: headers}


    const rawResp1 = await fetch(myOrgUrl+configVars.endPoints.profileIds, reqOptions)
    console.log(rawResp1)
    const rawResp1Json = await rawResp1.json()
    console.log(rawResp1Json)
    const myIdRecords = rawResp1Json.records
    console.log(myIdRecords)
    const reqUrl = req.originalUrl
    const myEndpoint = reqUrl.substring(reqUrl.lastIndexOf("/") + 1, reqUrl.lastIndexOf("?"))
    try {
        for (let i = 0; i < myIdRecords.length; i++) {

            let attributeURL = myIdRecords[i].attributes.url
            const rawResp2 = await fetch(myOrgUrl + attributeURL, reqOptions)
            const rawResp2Json = await rawResp2.json()
            const name = rawResp2Json.Name
            const id = rawResp2Json.Id

            if (name === "Partner" || name === "Attorney" || name === "Paralegal/CM" || name === "Financial" || name === "IT/Admin") {

                let myProfIdObj = {
                    "profileName": name,
                    "profileId": id
                }

                myIdArr.push(myProfIdObj)
            }
        }
        if(myEndpoint === 'getProfileIds') {
            console.log("IN MY IF")
            res.statusCode = 200
            res.message = "Successfully Pulled All Needed Profile Ids"
            res.success = {
                "profileIds": myIdArr
            }
            console.log(res.success)
            next()
        }else{
            console.log("IN MY ELSE")
            return myIdArr
        }
    }catch (e){
            console.log(e)
    }
}

export const createUsers = async(req, res, next) => {
    console.log("I AM IN createUsers")
    const profileIds = await getProfileIds(req, res, next)
    console.log(profileIds)
    const updatedMergeArr = []
    const myToken = req.body.accessToken
    const sfUrl = req.body.salesforceOrgApiUrl
    let mergedArr;
    const QP = await qpExtract(req, res, next)
    console.log("MY QUERY PARAMETERS: "+ JSON.stringify(QP))
    let newUsers = await mongoConnectGet(QP, configVars.mongoUname, configVars.mongoPwd, configVars.mongoUrl, configVars.mongoUrlPrefix)
    console.log(JSON.stringify(newUsers, null, 2))

    newUsers = newUsers.homework.userList

    console.log(newUsers)

    let headers = {
        "Authorization": myToken,
        "Content-Type": "application/json"
    }
    //
    // const reqOptions = {method: 'GET',headers: headers, agent: newProxy}

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
        res.statusCode = 200
        res.message = "Successfully Updated Salesforce User Listing With New User Array"
        res.success = {
            "updatedMergedArray": updatedMergeArr
        }
        console.log(res.success)
        next()
    }catch (e){
        console.log("In Building Array Create New User Error")
        console.log(e)
        e.statusCode = 500
        e.message = {
            "Message": "Could not build user array list to import"
        }
        e.name = "Failed To Build User Array List"
        next(e)
    }


    try {
        for (let i = 0; i < updatedMergeArr.length; i++) {
            const rawResp = await fetch(sfUrl + configVars.endPoints.createNewUser, {
                method: 'POST',
                body: JSON.stringify(updatedMergeArr[i]),
                headers: headers
            })
            const rawRespJson = await rawResp.json()
            console.log("This is HTTP Status For: "+ JSON.stringify(updatedMergeArr[i].Username) +" HTTP STATUS: "+rawResp.status)
        }
        res.statusCode = 200
        res.message = "Successfully Updated Salesforce User Listing With New User Array"
        res.success = {
            "updatedMergedArray": JSON.stringify(updatedMergeArr, null, 2)
        }
        console.log(res.success)
        next()
    }catch (e) {
        console.log(e)
        e.statusCode = 500
        e.message = {
            "Message": "Failed To Upload Users To Salesforce User Directory"
        }
        e.name = "Failed To Upload Users To Salesforce User Directory"
        next(e)
    }
}