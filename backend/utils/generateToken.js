const jwt = require('jsonwebtoken');
const dotenv = require('dotenv')
const path = require('path')
dotenv.config({path: '../config/.env' })

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "30d"
    })
}

module.exports = generateToken