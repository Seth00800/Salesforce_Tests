import express from 'express'
import bodyParser from 'body-parser'
export const app = express()
import { logger } from '../../middlewares/logging/logging.mjs'
import { api } from '../../../express/routes/routes.mjs'
import transactionId from "express-transaction-id";

app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json({extended: true}))


app.use((req, res, next) => {
    // Log an info message for each incoming request
    logger.info(`Received a ${req.method} request for ${req.url}`);
    next();
});


app.use(transactionId({ header: 'correlation-id' }), (req, res, next) => {
    let correlationId = req.headers['correlation-id']
    if(correlationId === undefined) {
        req.headers['correlation-id'] = req.getId()
        correlationId = req.headers['correlation-id']
        logger.info("No correlation-id found creating new correlation-id header of: "+correlationId)
        next()
    }
    next()
})

app.use('/data/api-management/apis/v1', api, (error, req, res) => {

})

app.listen(8004, function() {
    console.log("Server Started On Port 8004")
})
