// Using the MongoDB Aggregation Stage with Nodejs: $match and $group
const { MongoClient } = require('mongodb')
require('dotenv').config()

const uri = process.env.MONGO_URI
const client = new MongoClient(uri)

const connectToDatabase = async () => {
    try{
        await client.connect()
        console.log(`Connected to the ${dbname} database \nFull connection string: ${uri}`)
    }catch (err) {
        console.error(`Error connecting to the database: ${err}`)
    }
}

const pipeline = [
    // Stage 1: match the accounts with a balance greater than $1,000
    { $match: { balance: { $gt: 1000 } } },

    // Stage 2: calculate average balance and total balance
    {
        $group: {
            _id: '$account_type',
            total_balance: { $sum: '$balance' },
            avg_balance: { $avg: '$balance' },
        },
    },
]

const main = async () => {
    try{
        await connectToDatabase()
        let accounts = client.db('bank').collection('accounts')
        let result = await accounts.aggregate(pipeline)
        for await (const doc of result) {
            console.log(doc)
        }
    }catch (err) {
        console.error(`Error connecting to the database: ${err}`)
    }finally {
        await client.close()
    }
}

main()