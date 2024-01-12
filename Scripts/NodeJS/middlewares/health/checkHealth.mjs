import { qpExtract } from "../queryparams/getQueryParams.mjs";
// import { mongoConnectGet } from "../databases/mongodb/mongodb.mjs";
import { configVars } from "../../../../Config/configVars.mjs";

export const healthStatus = async(req, res, next) => {

    try{
        res.statusCode = 200
        next()
    }catch (e) {
        res.statusCode = 500
        next(e)
    }

    // try{
    //     console.log("I AM IN MY HEALTH STATUS TRY/CATCH")
    //     const QP = await qpExtract(req, res, next)
    //     console.log("MY QUERY PARAMETERS: "+ JSON.stringify(QP))
    //     const healthCheck = await mongoConnectGet(QP, configVars.mongoUname, configVars.mongoPwd, configVars.mongoUrl, configVars.mongoUrlPrefix)
    //     console.log(healthCheck)
    //
    //     res.statusCode = 200
    //     res.message = "Healthy"
    //     res.success = {
    //         uptime: process.uptime(),
    //         message: 'Ok',
    //         date: new Date()
    //     }
    //     console.log(res.success)
    //     next()
    // }catch(e){
    //     console.log("I AM IN MY HEALTH STATUS TRY/CATCH ERROR")
    //     e.statusCode = 500
    //     e.message = {
    //         "Status": "Unhealthy",
    //         "Message": "Check Service Logs"
    //     }
    //     e.name = "Health Check"
    //     next(e)
    // }

}