const bcrypt = require('bcryptjs')

const users = [
    {
        name: 'Admin User',
        email: 'admin@example.com',
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: 'Joe Burns',
        email: 'joe@example.com',
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: 'Rory Burns',
        email: 'rory@example.com',
        password: bcrypt.hashSync('123456', 10),
    }
]

module.exports = users;