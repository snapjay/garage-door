require('dotenv').config()
const GarageDoor = require('../index')
const axios = require('axios')
const Alerts = require('./index')
const environment = require('../../../.env')

let HomeAlone = {}

GarageDoor.events.on('STATUS_CHANGE', (newStatus) => {
  if (newStatus === 'open') {
    module.exports.checkHome()
  }
})

HomeAlone.checkHome = function () {
  axios({
    method: 'get',
    url: `https://developer-api.nest.com/structures/${process.env.DB_HOST.NEST_STRUCTURE}/away`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.DB_HOST.NEST_AUTHORIZATION}`
    }
  }).then(function (data) {
    if (data.data === 'away') {
      Alerts.emit('HOME_ALONE')
    }
  })
}

module.exports = HomeAlone
