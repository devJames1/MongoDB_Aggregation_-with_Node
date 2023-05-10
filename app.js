// Using the MongoDB Aggregation Stage with Nodejs: $match and $group
// const { MongoClient } = require('mongodb')
// require('dotenv').config()

// const uri = process.env.MONGO_URI
// const client = new MongoClient(uri)

// const dbname = 'bank'

// const connectToDatabase = async () => {
//     try{
//         await client.connect()
//         console.log(`Connected to the ${dbname} database \nFull connection string: ${uri}`)
//     }catch (err) {
//         console.error(`Error connecting to the database: ${err}`)
//     }
// }

// const pipeline = [
//     // Stage 1: match the accounts with a balance greater than $1,000
//     { $match: { balance: { $gt: 1000 } } },

//     // Stage 2: calculate average balance and total balance
//     {
//         $group: {
//             _id: '$account_type',
//             total_balance: { $sum: '$balance' },
//             avg_balance: { $avg: '$balance' },
//         },
//     },
// ]

// const main = async () => {
//     try{
//         await connectToDatabase()
//         let accounts = client.db(dbname).collection('accounts')
//         let result = await accounts.aggregate(pipeline)
//         for await (const doc of result) {
//             console.log(doc)
//         }
//     }catch (err) {
//         console.error(`Error connecting to the database: ${err}`)
//     }finally {
//         await client.close()
//     }
// }

// main()



//  Using MongoDB Aggregation Stages with Node.js: $sort and $project

const { MongoClient } = require('mongodb')
require('dotenv').config()

const uri = process.env.MONGO_URI
const client = new MongoClient(uri)

const dbname = 'bank'

const connectToDatabase = async () => {
    try{
        await client.connect()
        console.log(`Connected to the ${dbname} database \nFull connection string: ${'#'}`)
    }catch (err) {
        console.error(`Error connecting to the database: ${err}`)
    }
}

const pipeline = [
    // Stage 1: $match - filter the documents (checking, balance > 1500)
    { $match: { account_type: 'checking', balance: { $gt: 1500 }  } },

    // Step 2: $sort - sorts the documents in descending order (balance)
    { $sort: { balance: -1 } },

    // Step 3: $project- project only the requested fields and one computed field (account_type, balance, gbd_balance)
    { 
        $project: {
            _id: 0,
            account_id: 1,
            account_type: 1,

            //GBP stands for Great Britain Pound
            gbp_balance: { 
                $divide: [ '$balance', 1.3 ] 
            },
        },
    },
]

const main = async () => {
    try{
        await connectToDatabase()
        let accounts = client.db(dbname).collection('accounts')
        let result = accounts.aggregate(pipeline)
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