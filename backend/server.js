const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');

const {notFound, errorHandler} = require('./middlewares/errorMiddleware')

const productRoutes = require('./routes/productRoutes')

const connectDB = require('./config/db.js')


dotenv.config( {path: './config/.env'} );

connectDB();
const app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if(process.env.NODE_ENV === "development") {
    app.use(morgan('dev'))
}

app.get("/", (req, res) => {
    res.send("API in work!")
})

app.use("/api/products", productRoutes)
app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server Started running in ${process.env.NODE_ENV} mode at http://localhost:${PORT}`.yellow.bold.inverse)
});