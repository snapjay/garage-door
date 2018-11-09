require('dotenv').config()
const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const http = require('http')
const server = http.Server(app)
const io = require('socket.io')(server)

app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})) // support encoded bodi
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  next()
})
const api = require('./api')

app.use('/api', api)
app.use('/', express.static(path.join(__dirname, '../public')))

require('greenlock-express').create({
  version: 'draft-11',
  server: 'https://acme-v02.api.letsencrypt.org/directory',
  configDir: path.join(__dirname, '../cert'),
  email: 'dan@snapjay.com',
  approvedDomains: ['localhost', 'api.door.snapjay'],
  agreeTos: true,
  app: app,
  communityMember: true,
  telemetry: true,
  debug: true
}).listen(80, 8443)

module.exports = {
  server: server,
  io: io
}
