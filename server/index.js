require('dotenv').config()
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})) // support encoded bodi

const api = require('./api')

app.use('/api', api)
app.use('/', express.static(path.join(__dirname, '../public')))

server.listen(process.env.PORT, function () {
  console.log('Garage Door listening on port ' + process.env.PORT + '!')
})

module.exports = {
  server: server,
  io: io
}
