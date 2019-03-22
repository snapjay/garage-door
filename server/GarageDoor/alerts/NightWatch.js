const GarageDoor = require('../index')
const Settings = require('../../settings')
const Alerts = require('./index')
const schedule = require('node-schedule')

let NightWatch = {}
let rule = new schedule.RecurrenceRule()
rule.hour = Settings.nightCheck.hour
rule.minute = Settings.nightCheck.minute
schedule.scheduleJob(rule, function () {
  GarageDoor.getStatus((status) => {
    if (status === 'OPEN') {
      GarageDoor.action(() => {
        Alerts.emit('NIGHT_WATCH')
      })
    }
  })
})

module.exports = NightWatch
