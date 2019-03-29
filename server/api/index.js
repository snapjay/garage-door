const routes = require('express').Router()
const GarageDoor = require('../GarageDoor/index')
const Firebase = require('../../server/Respones/Firebase')
let Hue = require('philips-hue')
let hue = new Hue()
const Settings = require('../settings')

routes.get('/status', function (req, res) {
  GarageDoor.getStatus((result, error) => {
    if (error) {
      Firebase.saveLog('ERROR', error)
    }
    res.json({
      error: error,
      status: result
    })
  })
})

routes.get('/action', function (req, res) {
  GarageDoor.action((result, error) => {
    Firebase.saveLog('ACTION', result)
    if (error) {
      Firebase.saveLog('ERROR', error)
    }
    res.json({
      error: error,
      status: (result === 'DONE')
    })
  })
})

routes.get('/hue', function (req, res) {
  hue.bridge = process.env.HUE_BRIDGE
  hue.username = process.env.HUE_USERNAME
  let promise = Promise
  if (req.query.state === 'ON') {
    promise = Promise.all([hue.light(1).on(), hue.light(2).on(), hue.light(3).on()])
  } else if (req.query.state === 'OFF') {
    promise = Promise.all([hue.light(1).off(), hue.light(2).off(), hue.light(3).off()])
  }

  promise.then(function (lights) {
    Firebase.saveLog('LIGHTS', req.query.state)
    res.json(
      lights)
  })
})

routes.get('/settings', function (req, res) {
  res.json(Settings)
})
module.exports = routes
