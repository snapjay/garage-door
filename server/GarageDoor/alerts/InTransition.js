const GarageDoor = require('../index')
const Settings = require('../../settings')
const Alerts = require('./index')

let InTransition = {}
let _timer = null

GarageDoor.events.on('STATUS_CHANGE', (newStatus) => {
  if (newStatus === 'transition') {
    module.exports.startWatch()
  } else {
    module.exports.stopWatch()
  }
})

InTransition.startWatch = function () {
  if (_timer !== null) return
  _timer = setTimeout(function () {
    Alerts.emit('DOOR_TRANSITION')
  }, (Settings.doorTransitionWarning * 1000))
}

InTransition.stopWatch = function () {

  if (_timer !== null) {
    clearTimeout(_timer)
    _timer = null
  }
}

module.exports = InTransition
