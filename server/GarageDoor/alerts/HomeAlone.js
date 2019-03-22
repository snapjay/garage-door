require('dotenv').config()
const GarageDoor = require('../index')
const axios = require('axios')
const Alerts = require('./index')
let HomeAlone = {}

GarageDoor.events.on('STATUS_CHANGE', (newStatus) => {
  if (newStatus === 'OPEN') {
    module.exports.checkHome()
  }
})

HomeAlone.checkHome = function () {
  axios({
    method: 'get',
    url: `https://developer-api.nest.com/structures/${process.env.NEST_STRUCTURE}/away`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.NEST_AUTHORIZATION}`
    }
  }).then(function (data) {
    if (data.data === 'away') {
      Alerts.emit('HOME_ALONE')
    }
  })
}

module.exports = HomeAlone
