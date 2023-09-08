const express = require('express')
const errorHandler = require('./middleware/errorHandler')
const notFound = require('./middleware/notFound')
const connectDB = require('./db/connect')
const dotenv = require('dotenv').config()
const app = express()
const port = process.env.PORT || 3000
const productRouter = require('./routes/products') 
 require('express-async-handler')
//middleware
app.use(express.json())

//product routes

app.use('/api/v1/products', productRouter)

app.use(errorHandler)
app.use(notFound)




const start = async() => {
try {
    //connectDB
    await connectDB(process.env.CONNECTION_STRING)
    app.listen(port,()=>{
        console.log(`server's listening on port: ${port}...`)
    })
} catch (error) {
    console.log(error)

}
}

start()

