import {configVars} from "../../../../../Config/configVars.mjs";


export const appJsonHeader = async(req, res, next) => {
    console.log("I Am In appJsonHeader Middleware")
    const contentType = req.headers['content-type']
    const myMethods = ['POST', 'PUT', 'PATCH']

    try {
        if(myMethods.includes(req.method) && req.body.constructor === Object && Object.keys(req.body).length === 0) {
            throw new Error()
        } else {
            if (contentType === "application/json") {
                console.log("Content Type Is Application/JSON")
                next()
                return true
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
    console.log(process.env.AUTH_KEY)
    let myKubeSecretKey;
    let myReqKey2;

    try {
        if (req.headers['authorization']) {
            console.log("Received Authorization Header")
            let myAuthHeader = req.headers['authorization']
            myAuthHeader = myAuthHeader.replace("Bearer", "")
            myKubeSecretKey = Buffer.from(configVars.apiAuthKey, "base64").toString()
            const myReqKey1 = Buffer.from(myAuthHeader, "base64").toString()
            myReqKey2 = Buffer.from(myReqKey1, "base64").toString()
        } else {
            console.log("No Authorization Header Found")
            throw new Error
        }
    }catch (e) {
        e.statusCode = 401
        e.message = "Not Authorized"
        e.name = "Failed To Supply Authorization"
        next(e)
    }

    try {
        if (myKubeSecretKey === myReqKey2) {
            console.log("Authorization Successful")
            next()
        } else {
            console.log("Not Authorized")
            throw new Error
        }
    }catch (e) {
        e.statusCode = 401
        e.message = "Not Authorized"
        e.name = "Failed To Supply Authorization"
        next(e)
    }



}