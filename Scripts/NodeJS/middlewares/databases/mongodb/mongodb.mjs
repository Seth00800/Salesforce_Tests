// import { MongoClient } from "mongodb";
// const uri = "mongodb://34.228.245.173:27017"
// const client = new MongoClient(uri)
//
//
// export const mongoConnectGet = async(qsp, username, pwd, url, prefix, req, res, next) => {
//
//     try {
//         console.log("IM IN MONGOCONNECTGET TRY")
//         console.log(qsp)
//         let searchFilter;
//         let myId;
//         let myVersion;
//         let collection;
//         if(qsp.id) {
//             myId = qsp.id
//         }
//         if(qsp.version){
//             myVersion = qsp.version
//         }
//         if(qsp.coll){
//             collection = qsp.coll
//         }
//         if(qsp.id && qsp.version){
//             searchFilter = {"id": myId, "version": myVersion};
//         }
//
//         console.log(prefix + username + ":" + pwd + url)
//
//         const client = await MongoClient.connect(prefix + username + ":" + pwd + url, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//
//         const coll = client.db('cloudmentordb').collection(collection);
//         const cursor = coll.find(searchFilter);
//         let result = await cursor.toArray();
//         if(qsp.id && qsp.version){
//             result = JSON.parse(JSON.stringify(result[0], null, 2))
//         }else {
//             result = JSON.parse(JSON.stringify(result, null, 2))
//         }
//         await client.close();
//         return result
//     }catch (e){
//         console.log("IM IN MONGOCONNECTGET CATCH")
//         throw new Error()
//     }
// }
//
// export const mongoConnectPost = async(qsp, username, pwd, url, prefix, req, res, next) => {
//
//     let collection;
//     if(qsp.coll){
//         collection = qsp.coll
//     }
//
//     try {
//         console.log("IM IN MONGOCONNECTPOST TRY")
//
//         const client = await MongoClient.connect(prefix + username + ":" + pwd + url, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//
//         const coll = client.db('cloudmentordb').collection(collection);
//         let newDocument = qsp.homework
//         newDocument.date = new Date();
//         let result = await coll.insertOne(newDocument);
//         console.log(result)
//
//         await client.close();
//         return result
//     }catch (e){
//         console.log("IM IN MONGOCONNECTPOST CATCH")
//         throw new Error()
//     }
// }
//
// export const run = async() => {
//
//
//
//     try{
//         await client.connect()
//         console.log("Connected to MongoDB")
//         const db = client.db('admin');
//         const username = "Seth008";
//         const password = "3Commerce#"
//         const roles = [{role: 'readWrite', db: 'admin'}];
//         const roleToRemove = 'readWrite';
//         const database = 'admin,TESSTDB';
//
//         await db.command({
//             createUser: username,
//             pwd: password,
//             roles: roles
//         })
//
//         // await db.command({
//         //     updateUser: username,
//         //     roles: [{ role: roleToRemove, db: database, drop: true }]
//         // });
//
//         console.log(`User ${username} created successfully`)
//     }catch (e) {
//         console.log("An error occurred: ", e)
//     }finally {
//         await client.close()
//     }
//
// }
//
// await run()

