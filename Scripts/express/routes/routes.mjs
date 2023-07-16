import express, {json} from 'express'
export const api = express.Router()

import { ErrorHandler } from '../../NodeJS/middlewares/resphandlers/errors.mjs'
import { appJsonHeader, authCheck } from "../../NodeJS/middlewares/contentchecks/headers/headerCheck.mjs";
import { SuccessHandler } from "../../NodeJS/middlewares/resphandlers/success.mjs";
import { healthStatus } from "../../NodeJS/middlewares/health/checkHealth.mjs";
import { bodyData } from "../../NodeJS/middlewares/contentchecks/body/bodyCheck.mjs";
import { qpCheck } from "../../NodeJS/middlewares/queryparams/getQueryParams.mjs";
import { createUsers } from "../../NodeJS/middlewares/salesforce/createNewUsers.mjs";







//Application Middleware
api.use( authCheck )
api.use( appJsonHeader )
api.use( qpCheck )
api.use( bodyData )


//GET Methods

api.get('/createusers', createUsers, (req, res, next) => {
    console.log("EXITED HOMEWORK")
    next()
})

api.get('/health', healthStatus, (req, res, next) => {
    next()
})



api.use(SuccessHandler)

api.use(ErrorHandler)


