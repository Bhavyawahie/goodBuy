const path = require('path')
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const colors = require('colors');
const users = require('./data/users.js');
const products = require('./data/products.js');
const User = require('./models/userModel');
const Product = require('./models/productModel');
const Order = require('./models/orderModel');
const connectDB = require('./config/db')

dotenv.config( {path: './config/.env'} );

connectDB();

const importData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        const createdUser = await User.insertMany(users)
        const adminUser = createdUser[0]._id
        const sampleProducts = products.map((product) => {
            return {
                ...product,
                user: adminUser
            }
        })
        await Product.insertMany(sampleProducts)

        console.log('Data imported!'.magenta.inverse);
        process.exit()
    } catch (error) {
        console.log(`${error}`.red.inverse)
    }
}

const destroyData = async () => {
    try {
        await Order.deleteMany()
        await Product.deleteMany()
        await User.deleteMany()

        console.log('Data Destroyed!'.red.inverse);
        process.exit()
    } catch (error) {
        console.log(`${error}`.red.inverse)
    }
}

if (process.argv[2] === '-d') {
    destroyData()
} else {
    importData()
}
