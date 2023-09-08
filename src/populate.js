require('dotenv').config()
const connectDB = require('./db/connect')
const Product = require('./model/products')

const jsonProducts = require('./products.json')

const start = async()=> {
    try{
        await connectDB(process.env.CONNECTION_STRING)
        await Product.deleteMany();
        await Product.create(jsonProducts)
        console.log('operation is a success!')
        process.exit(0)
    }
    catch(err){
        console.log(err)
        process.exit(1)

    }
}
start()
