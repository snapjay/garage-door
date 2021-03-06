'use strict'

require('dotenv').config()
const path = require('path')
const api = require('./api')

const bodyParser = require('body-parser')
const express = require('express')
const app = express()

app.use(bodyParser.json()) // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})) // support encoded body
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'X-Requested-With')
  next()
})

app.use('/api', api)
app.use('/', express.static(path.join(__dirname, '../public')))

let server
if (process.env.ENV === 'DEVELOP') {
  server = app.listen(process.env.PORT)
  console.log(`http://localhost:${process.env.PORT}`)
} else {
  const greenLock = require('greenlock-express')
  server = greenLock.create({
    version: 'draft-11',
    server: 'https://acme-v02.api.letsencrypt.org/directory',
    configDir: path.join(__dirname, '../cert'),
    email: 'dan@snapjay.com',
    approvedDomains: ['api.door.snapjay.com'],
    agreeTos: true,
    app,
    communityMember: true,
    telemetry: true,
    debug: true
  }).listen(process.env.PORT, process.env.S_PORT)
  console.log(`https://localhost:${process.env.S_PORT}`)
}

const io = require('socket.io')(server)
module.exports = {
  server,
  io
}
