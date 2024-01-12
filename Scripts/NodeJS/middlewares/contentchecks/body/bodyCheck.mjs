export const bodyData = async(req, res, next) => {
    console.log("I Am In bodyData Middleware")
    console.log(req.method)
    const myMethods = ['POST', 'PUT', 'PATCH']
    try {
        console.log("I AM IN TRY/CATCH REQ BODY")
        if(myMethods.includes(req.method) && req.body.constructor === Object && Object.keys(req.body).length === 0) {
                throw new Error()
            } else {
                console.log("Request Payload Has Body Data Or Is Using Method Which Does Not Require It")
                next()
            }
    }catch (e) {
        e.statusCode = 400
        e.message = {
            "Message": "Missing Body Data"
        }
        e.name = "Request Body Content"
        return next(e)
    }
}