import { MongoClient } from 'mongodb'
// const client = new MongoClient


export const getMongo = async() => {

    const connect = await MongoClient.connect("mongodb://adminuser:password123@127.0.0.1:32000")
    console.log(connect)


}

await getMongo()