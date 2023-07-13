

export const qpExtract = async(req, res, next) => {

    try {
        console.log("I AM IN QP EXTRACT")
        console.log(req.query)
        const reqUrl = req.originalUrl
        req.query.myEndpoint = reqUrl.substring(reqUrl.lastIndexOf("/") + 1, reqUrl.lastIndexOf("?"))

        if (req.query.myEndpoint === "schemas") {
            if(!req.query.coll){
                throw new Error
            }
        }else {
            if(Object.keys(req.query).length === 0) {
                throw new Error
            }else if(!req.query.id){
                throw new Error
            }else if(!req.query.version){
                throw new Error
            }
        }

        return req.query

    }catch (e) {
        e.statusCode = 400
        e.message = {
            "Status": "Missing Required Content",
            "Message": "Missing Required Query Parameters"
        }
        console.log(req.query)
        if(Object.keys(req.query).length === 0) {
            e.name = "Missing Query Parameters: id, version, and coll"
        }else if(!req.query.id){
            e.name = "Missing Query Parameter: id"
        }else if(!req.query.version){
            e.name = "Missing Query Parameter: version"
        }else if(!req.query.coll){
            e.name = "Missing Query Parameter: coll"
        }
       return next(e)
    }

}

export const qpCheck = async(req, res, next) => {
    console.log("I AM IN qpCheck")

    try {
        if (Object.keys(req.query.coll)) {
            const myCollectionQP = req.query
            console.log(myCollectionQP)
            next()
        } else {
            throw new Error
        }
    }catch (e) {
        e.name = "Missing Required Query Parameter"
        e.statusCode = 400
        e.message = {
            "Status": 400,
            "Message": "Missing Query Parameter: coll"
        }
        next(e)
    }

    // if(myCollectionQP){
    //     next()
    // }else{
    //     throw new Error
    // }

}