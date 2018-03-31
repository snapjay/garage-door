const routes = require('express').Router()
const GarageDoor = require('../GarageDoor/index')
let env = require('../../env')
let Hue = require('philips-hue')
let hue = new Hue()

routes.get('/status', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  GarageDoor.getStatus((result, error) => {
    res.send(JSON.stringify(
      {
        error: error,
        status: result
      }))
  })
})

routes.get('/action', function (req, res) {
  GarageDoor.action()
  // Send Response; don't wait for script to complete
  res.setHeader('Content-Type', 'application/json')
  res.send(JSON.stringify(
    {
      error: null,
      result: true
    }))
})

routes.get('/hue', function (req, res) {
  res.setHeader('Content-Type', 'application/json')
  hue.bridge = env.hue.bridge
  hue.username = env.hue.username
  let promise = Promise
  if (req.query.state === 'on') {
    promise = Promise.all([hue.light(1).on(), hue.light(2).on(), hue.light(3).on()])
  } else {
    promise = Promise.all([hue.light(1).off(), hue.light(2).off(), hue.light(3).off()])
  }

  promise.then(function (lights) {
    res.send(JSON.stringify(
      lights))
  })
})

module.exports = routes
