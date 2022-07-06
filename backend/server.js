const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const {notFound, errorHandler} = require('./middlewares/errorMiddleware')
const productRoutes = require('./routes/productRoutes')
const userRoutes = require('./routes/userRoutes')
const orderRoutes = require('./routes/orderRoutes')

const connectDB = require('./config/db.js')


dotenv.config( {path: './.env'} );

connectDB();
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if(process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}
// app.use("/api/upload", uploadRoutes)
app.use("/api/products", productRoutes)
app.use("/api/users", userRoutes)
app.use("/api/orders", orderRoutes)
app.get("/api/config/razorpay", (req, res) => res.send(process.env.RAZORPAY_API_KEY))
app.use('/uploads', express.static('uploads'));
app.use(notFound)
app.use(errorHandler)

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '/frontend/build')))
    app.get('*', (req, res) => res.sendFile(path.resolve(__dirname,'frontend', 'build', 'index.html')))
} else {
    app.get("/", (req, res) => {
        res.send("API in work!")
    })
}

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server Started running in ${process.env.NODE_ENV} mode at http://localhost:${PORT}`.yellow.bold.inverse)
});