'use strict'

const path = require('path')

require('greenlock-express').create({
  version: 'draft-11',
  // Note: If at first you don't succeed, switch to staging to debug
  // https://acme-staging-v02.api.letsencrypt.org/directory
  // https://acme-staging-v02.api.letsencrypt.org/directory
  server: 'https://acme-v02.api.letsencrypt.org/directory',
  // Where the certs will be saved, MUST have write access
  configDir: path.join(__dirname, '../cert'),
  email: 'dan@snapjay.com',
  // You MUST change these to valid domains
  // NOTE: all domains will validated and listed on the certificate
  approvedDomains: ['api.door.snapjay.com'],
  // You MUST NOT build clients that accept the ToS without asking the user
  agreeTos: true,
  app: require('express')().use('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    res.end('Hello, World!\n\n💚 🔒.js')
  }),
  // Join the community to get notified of important updates
  communityMember: true,
  // Contribute telemetry data to the project
  telemetry: true,
  debug: true
}).listen(80, 443)

// require('dotenv').config()
// const path = require('path')
// const express = require('express')
// const bodyParser = require('body-parser')
//
// const app = express()
// const http = require('http')
// const server = http.Server(app)
// const io = require('socket.io')(server)
//
// app.use(bodyParser.json()) // support json encoded bodies
// app.use(bodyParser.urlencoded({extended: true})) // support encoded bodi
// app.use(function (req, res, next) {
//   res.header('Access-Control-Allow-Origin', '*')
//   res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
//   res.header('Access-Control-Allow-Headers', 'X-Requested-With')
//   next()
// })
// const api = require('./api')
//
// app.use('/api', api)
// app.use('/', express.static(path.join(__dirname, '../public')))
//
// require('greenlock-express').create({
//   version: 'draft-11',
//   server: 'https://acme-v02.api.letsencrypt.org/directory',
//   configDir: path.join(__dirname, '../cert'),
//   email: 'dan@snapjay.com',
//   approvedDomains: ['api.door.snapjay.com'],
//   agreeTos: true,
//   app: require('express')().use('/', function (req, res) {
//     res.setHeader('Content-Type', 'text/html; charset=utf-8')
//     res.end('Hello, World!\n\n💚 🔒.js');
//   }),
//   communityMember: true,
//   telemetry: true,
//   debug: true
// }).listen(80, 443)
//
// module.exports = {
//   server: server,
//   io: io
// }
