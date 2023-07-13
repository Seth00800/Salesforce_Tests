import {logger} from "../logging/logging.mjs";


export const ErrorHandler = (err, req, res, next) => {
    console.log("Middleware Error Handling");
    const errStatus = err.statusCode || 500;
    const errMsg = err.message || 'Something went wrong';
    const errDesc = err.name
    const correlationId = req.headers['correlation-id']
    res.set('correlation-id', correlationId)
    res.removeHeader('x-transaction-id')

    logger.error(res.status(errStatus).json({
            "errors": {
                "error": {
                    "traceId": correlationId,
                    "errorCode": errStatus || res.status,
                    "errorDescription": errDesc,
                    "errorDetails": errMsg
                }
            }
        }).send()
    )
}