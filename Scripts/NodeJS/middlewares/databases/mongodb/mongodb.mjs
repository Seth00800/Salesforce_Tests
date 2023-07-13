import { MongoClient } from "mongodb";


export const mongoConnectGet = async(qsp, username, pwd, url, prefix, req, res, next) => {

    try {
        console.log("IM IN MONGOCONNECTGET TRY")
        console.log(qsp)
        let searchFilter;
        let myId;
        let myVersion;
        let collection;
        if(qsp.id) {
            myId = qsp.id
        }
        if(qsp.version){
            myVersion = qsp.version
        }
        if(qsp.coll){
            collection = qsp.coll
        }
        if(qsp.id && qsp.version){
            searchFilter = {"id": myId, "version": myVersion};
        }

        console.log(prefix + username + ":" + pwd + url)

        const client = await MongoClient.connect(prefix + username + ":" + pwd + url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const coll = client.db('homework').collection(collection);
        const cursor = coll.find(searchFilter);
        let result = await cursor.toArray();
        if(qsp.id && qsp.version){
            result = JSON.parse(JSON.stringify(result[0], null, 2))
        }else {
            result = JSON.parse(JSON.stringify(result, null, 2))
        }
        await client.close();
        return result
    }catch (e){
        console.log("IM IN MONGOCONNECTGET CATCH")
        throw new Error()
    }
}

export const mongoConnectPost = async(qsp, username, pwd, url, prefix, req, res, next) => {

    let collection;
    if(qsp.coll){
        collection = qsp.coll
    }

    try {
        console.log("IM IN MONGOCONNECTPOST TRY")

        const client = await MongoClient.connect(prefix + username + ":" + pwd + url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        const coll = client.db('msapigw').collection(collection);
        let newDocument = qsp.schema
        newDocument.date = new Date();
        let result = await coll.insertOne(newDocument);
        console.log(result)

        await client.close();
        return result
    }catch (e){
        console.log("IM IN MONGOCONNECTPOST CATCH")
        throw new Error()
        next(e)
    }
}
