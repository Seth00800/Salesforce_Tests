import { qpExtract } from "../queryparams/getQueryParams.mjs";

import { mongoConnectPost } from "../databases/mongodb/mongoClient.mjs"
import { configVars } from "../../../../Config/configVars.mjs";


export const postHomework = async(req, res, next) => {
    console.log("I AM IN POST HOMEWORK")
    let myQP = req.query;
    const requiredEle = JSON.stringify(["id", "version", "type", "object", "homework"])
    const bodyEle = JSON.stringify(Object.keys(req.body))

    try {
        if(requiredEle === bodyEle) {
            myQP = await qpExtract(req, res, next)
            myQP.type = req.body
            console.log(myQP)
        }else{
            throw new Error
        }

        const result = await mongoConnectPost(myQP, req, res, next)
        console.log(result)

        if(result.acknowledged === true) {
            console.log("I am in IF")
            res.success = result
            res.statusCode = 201
            res.message = "Created Homework In Collection: " + req.query.coll
            console.log(res.message)
            next()
        } else {
            throw new Error
        }
    }catch (e) {
        e.name = "Post Object To Database"
        e.statusCode = 400
        e.message = {
            "Status": 400,
            "Message": "Failed To Create Homework In Collection: "+ req.query.coll
        }
        next(e)
    }
}