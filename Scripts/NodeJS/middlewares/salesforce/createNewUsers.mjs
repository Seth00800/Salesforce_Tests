import fetch from "node-fetch";
import {qpExtract} from "../queryparams/getQueryParams.mjs";
import {mongoConnectGet} from "../databases/mongodb/mongodb.mjs";
import {configVars} from "../../../../Config/configVars.mjs";

const getProfileId = async() => {
    console.log("I AM IN getProfileId")
    const myToken = configVars.accessToken
    const myIdArr = []

    let headers = {
        "Authorization": myToken,
        "Content-Type": "application/json"
    }

    const rawResp1 = await fetch(configVars.salesforceOrgApiUrl+configVars.endPoints.profileIds, {headers: headers})
    console.log(rawResp1)
    const rawResp1Json = await rawResp1.json()
    console.log(rawResp1Json)
    const myIdRecords = rawResp1Json.records
    console.log(myIdRecords)
    try {
        for (let i = 0; i < myIdRecords.length; i++) {

            let attributeURL = myIdRecords[i].attributes.url
            const rawResp2 = await fetch(configVars.salesforceOrgApiUrl + attributeURL, {headers: headers})
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
        // console.log(myIdArr)
        return myIdArr
    }catch (e){
            console.log(e)
    }


}

export const createUsers = async(req, res, next) => {
    const profileIds = await getProfileId()
    console.log("I AM IN createUsers")
    console.log(profileIds)
    const updatedMergeArr = []
    const myToken = configVars.accessToken
    let mergedArr;
    const QP = await qpExtract(req, res, next)
    console.log("MY QUERY PARAMETERS: "+ JSON.stringify(QP))
    let newUsers = await mongoConnectGet(QP, configVars.mongoUname, configVars.mongoPwd, configVars.mongoUrl, configVars.mongoUrlPrefix)
    console.log("BLAH BLAH BLAH")
    console.log(newUsers)

    newUsers = newUsers.userList

    console.log(newUsers)

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
            const rawResp = await fetch(configVars.salesforceOrgApiUrl + configVars.endPoints.createNewUser, {
                method: 'POST',
                body: JSON.stringify(updatedMergeArr[i]),
                headers: headers
            })
            const rawRespJson = await rawResp.json()
            console.log("This is HTTP Status For: "+ JSON.stringify(updatedMergeArr[i]) +" HTTP STATUS: "+rawResp.status)
        }
        res.statusCode = 200
        res.message = "Successfully Updated Salesforce User Listing With New User Array"
        res.success = {
            "updatedMergedArray": updatedMergeArr
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