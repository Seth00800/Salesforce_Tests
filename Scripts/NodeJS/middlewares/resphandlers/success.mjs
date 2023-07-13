import { logger } from "../logging/logging.mjs";


export const SuccessHandler = (req, res, next) => {
    console.log("Executing Success Handler");
    const resStatus = res.statusCode || 200;
    const resMsg = res.success || 'OK';
    const resDesc = res.message;
    const correlationId = req.headers['correlation-id']
    res.set('correlation-id', correlationId)
    res.removeHeader('x-transaction-id')
    logger.info(res.status(resStatus).json({
            "success": {
                "message": {
                    "traceId": correlationId,
                    "statusCode": resStatus,
                    "description": resDesc,
                    "details": resMsg
                }
            }
        }).send().end()
    )
}