const app = require('./app')
const http = require('http')
const server = http.createServer(app)
const PORT = process.env.PORT || 4000

server.listen(PORT, () => {
    console.log(`Server Started running in ${process.env.NODE_ENV} mode at http://localhost:${PORT}`.yellow.bold.inverse)
})