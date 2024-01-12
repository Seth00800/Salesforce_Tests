import express, {json} from 'express'
export const api = express.Router()

import { ErrorHandler } from '../../NodeJS/middlewares/resphandlers/errors.mjs'
import { appJsonHeader, authCheck } from "../../NodeJS/middlewares/contentchecks/headers/headerCheck.mjs";
import { SuccessHandler } from "../../NodeJS/middlewares/resphandlers/success.mjs";
import { healthStatus } from "../../NodeJS/middlewares/health/checkHealth.mjs";
import { bodyData } from "../../NodeJS/middlewares/contentchecks/body/bodyCheck.mjs";
import {qpCheck, qpExtract} from "../../NodeJS/middlewares/queryparams/getQueryParams.mjs";
import { createUsers, getProfileIds } from "../../NodeJS/middlewares/salesforce/createNewUsers.mjs";
import { postHomework } from "../../NodeJS/middlewares/salesforce/postHomework.mjs";
import { deactivateUsers } from "../../NodeJS/middlewares/salesforce/deactivateUsers.mjs";
import { activateUsers } from "../../NodeJS/middlewares/salesforce/activateUsers.mjs";


//Application Middleware
api.use( authCheck )
api.use( appJsonHeader )
// api.use( qpCheck )
api.use( bodyData )


//GET Methods
api.get('/health', healthStatus, (req, res, next) => {
    console.log("EXITED health")
    next()
})

//POST Methods
api.post('/getProfileIds', qpCheck, getProfileIds, (req, res, next) => {
    console.log("EXITED getProfileIds")
    next()
})

api.post('/createUsers', qpCheck, createUsers, (req, res, next) => {
    console.log("EXITED createUsers")
    next()
})

api.post('/uploadHomework', postHomework, (req, res, next) => {
    console.log("EXITED uploadHomework")
    next()
})

api.post('/activateUsers', activateUsers, (req, res, next) => {
    console.log("EXITED activateUsers")
    next()
})

api.post('/deactivateUsers', deactivateUsers, (req, res, next) => {
    console.log("EXITED deactivateUsers")
    next()
})


api.use(SuccessHandler)

api.use(ErrorHandler)


