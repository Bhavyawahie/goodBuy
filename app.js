const express = require('express')
const app = express()
const path = require('path')
const dotenv = require('dotenv')
const colors = require('colors')
const morgan = require('morgan')
const cors = require('cors')

const {notFound, errorHandler} = require('./middlewares/errorMiddleware')

const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')

const connectDB = require('./config/db.js')

dotenv.config( {path: '/.env'} )

connectDB()

app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({ extended: true }))
app.use(cors())

if(process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}

app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/orders", orderRoutes)
app.get("/api/config/razorpay", (req, res) => res.send(process.env.RAZORPAY_API_KEY))
if(process.env.NODE_ENV === 'production') {
    app.get("/", (req, res) => {
        res.send("API in work!")
    })
}
app.use(notFound)
app.use(errorHandler)

module.exports = app