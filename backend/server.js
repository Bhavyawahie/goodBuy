const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');

const connectDB = require('./config/db.js')
const products = require('./data/products.js');

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

app.get("/api/products", (req, res) => {
    res.status(200).json(products)
})

app.get("/api/products/:id", (req, res) => {
    const fetchProduct = products.find(p => p._id === req.params.id)
    res.status(200).json(fetchProduct)
})

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server Started running in ${process.env.NODE_ENV} mode at http://localhost:${PORT}`.yellow.bold.inverse)
});