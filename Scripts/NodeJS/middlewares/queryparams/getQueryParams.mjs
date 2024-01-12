

export const qpExtract = async(req, res, next) => {

    try {
        console.log("I AM IN QP EXTRACT")
        console.log(req.query)
        const reqUrl = req.originalUrl
        req.query.myEndpoint = reqUrl.substring(reqUrl.lastIndexOf("/") + 1, reqUrl.lastIndexOf("?"))

        if (req.query.myEndpoint === "uploadHomework") {
            if(!req.query.coll || !req.query.db || !req.query.type){
                throw new Error
            }
        }else {
            if(Object.keys(req.query).length === 0) {
                throw new Error
            }else if(!req.query.db){
                throw new Error
            }else if(!req.query.coll){
                throw new Error
            }else if(!req.query.type){
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
            e.name = "Missing Query Parameters: type, version, and coll"
        }else if(!req.query.type){
            e.name = "Missing Query Parameter: type"
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
        if (req.query.myEndpoint === "uploadHomework") {

            if(!req.query.coll){
                throw new Error
            }

            if(!req.query.db){
                throw new Error
            }

            if(!req.query.type){
                throw new Error
            }

            if(Object.keys(req.query).length === 0) {
                throw new Error
            }
        }

        console.log("GOING TO NEXT")

        next()
    }catch (e) {
        e.name = "Missing Required Query Parameter"
        e.statusCode = 400
        e.message = {
            "Status": 400,
            "Message": "Missing Query Parameter"
        }
        next(e)
    }

    // if(myCollectionQP){
    //     next()
    // }else{
    //     throw new Error
    // }

}