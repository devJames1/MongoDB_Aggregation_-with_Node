

const { MongoClient } = require('mongodb')
require('dotenv').config()

const uri = process.env.MONGO_URI
console.log(uri)
// const client = new MongoClient(uri)

// const connectToDatabase = async () => {
//     try{
//         await client.connect()
//         console.log(`Connected to the ${dbname} database \nFull connection string: ${uri}`)
//     }catch (err) {
//         console.error(`Error connecting to the database: ${err}`)
//     }
// }

// const dbname = 'bank'
// const collection_name = 'accounts'
// const accountsCollection = client.db(dbname).collection(collection_name)