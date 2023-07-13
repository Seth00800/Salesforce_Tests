import express, {json} from 'express'
export const api = express.Router()
import { ErrorHandler } from '../../NodeJS/middlewares/resphandlers/errors.mjs'
import { appJsonHeader, authCheck } from "../../NodeJS/middlewares/contentchecks/headers/headerCheck.mjs";
import { SuccessHandler } from "../../NodeJS/middlewares/resphandlers/success.mjs";
import { healthStatus } from "../../NodeJS/middlewares/health/checkHealth.mjs";
import { bodyData } from "../../NodeJS/middlewares/contentchecks/body/bodyCheck.mjs";
import { qpCheck } from "../../NodeJS/middlewares/queryparams/getQueryParams.mjs";






//Application Middleware
api.use( authCheck )
api.use( appJsonHeader )
api.use( qpCheck )
api.use( bodyData )


//GET Methods
api.get('/health', healthStatus, (req, res, next) => {
    next()
})

api.get('/homework', (req, res) => {
    next()
})

api.use(SuccessHandler)

api.use(ErrorHandler)


