const routes = require('express').Router()
const GarageDoor = require('../GarageDoor/index')

routes.get('/getStatus', function (req, res) {
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

module.exports = routes
