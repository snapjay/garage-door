const GarageDoor = require('../index')
const axios = require('axios')
const Alerts = require('./index')
const environment = require('./../../../env.json')

let HomeAlone = {}

GarageDoor.events.on('STATUS_CHANGE', (newStatus) => {
  if (newStatus === 'open') {
    module.exports.checkHome()
  }
})

HomeAlone.checkHome = function () {
  axios({
    method: 'get',
    url: `https://developer-api.nest.com/structures/${environment.nest.structure}/away`,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${environment.nest.authorization}`
    }
  }).then(function (data) {
    if (data.data === 'away') {
      Alerts.emit('HOME_ALONE')
    }
  })
}

module.exports = HomeAlone
