import {configVars} from "../../../../../Config/configVars.mjs";
import { exec } from 'child_process'


export const appJsonHeader = async(req, res, next) => {
    console.log("I Am In appJsonHeader Middleware")
    const contentType = req.headers['content-type']
    const myMethods = ['POST', 'PUT', 'PATCH']
    const reqUrl = req.originalUrl

    try {
        console.log("I AM IN HEADER TRY")
        if(myMethods.includes(req.method) && req.body.constructor === Object && Object.keys(req.body).length === 0) {
            console.log("I AM IN IF")
            throw new Error()
        } else {
            console.log("I AM IN ELSE")
            if(reqUrl !== "/data/api-management/apis/v1/health") {
                if (contentType === "application/json") {
                    console.log("Content Type Is Application/JSON")
                    next()
                }
            }else{
                next()
            }
        }
    }catch (e) {
        e.statusCode = 415
        e.message = req.headers
        e.name = "Unsupported Media Type"
        next(e)
    }
}

export const authCheck = async(req, res, next)=> {
    console.log("I AM IN AUTH CHECK")
    // exec('printenv', (error, stdout, stderr) => {
    //     if (error) {
    //         console.error(`exec error: ${error}`);
    //         return
    //     }
    //     console.log(`stdout: ${stdout}`);
    //     console.error(`stderr: ${stderr}`);
    // })
    let myKubeSecretKey;
    let myKubeSecretKey2;
    let myReqKey2;
    const reqUrl = req.originalUrl
    req.query.myEndpoint = reqUrl.substring(reqUrl.lastIndexOf("/") + 1, reqUrl.lastIndexOf("?"))
    let myEnvAuthKey = JSON.parse(configVars.apiAuthKey)
    let AUTH_KEY = myEnvAuthKey.AUTH_KEY

    if(reqUrl !== "/data/api-management/apis/v1/health") {
        try {
            if (req.headers['authorization']) {
                console.log("Received Authorization Header")
                let myAuthHeader = req.headers['authorization']
                myAuthHeader = myAuthHeader.replace("Bearer", "")
                myKubeSecretKey = Buffer.from(AUTH_KEY, "base64").toString()
                myKubeSecretKey2 = Buffer.from(myKubeSecretKey, "base64").toString()
                const myReqKey1 = Buffer.from(myAuthHeader, "base64").toString()
                myReqKey2 = Buffer.from(myReqKey1, "base64").toString()
                // console.log("THIS IS MY AUTH KEY BEING SENT WITH REQUEST: "+myReqKey2)
                // console.log("THIS IS MY AUTH KEY PULLED FROM SECRETS MGR: "+myKubeSecretKey2)
            } else {
                console.log("No Authorization Header Found")
                throw new Error
            }
        } catch (e) {
            e.statusCode = 401
            e.message = "Not Authorized"
            e.name = "Failed To Supply Authorization"
            next(e)
        }

        try {
            if (myKubeSecretKey2 === myReqKey2) {
                console.log("Authorization Successful")
                next()
            } else {
                console.log("Not Authorized")
                throw new Error
            }
        } catch (e) {
            e.statusCode = 401
            e.message = "Not Authorized"
            e.name = "Failed To Supply Authorization"
            next(e)
        }
    } else {
        next()
    }

}