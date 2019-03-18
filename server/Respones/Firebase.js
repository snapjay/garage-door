const admin = require('firebase-admin')
const serviceAccount = require('../../garage-door-9135e-firebase-adminsdk-hq82q-f1c50a06c7')

class Firebase {
  constructor () {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://garage-door-9135e.firebaseio.com'
    })

    this.db = admin.database()
    this.AlertRef = this.db.ref('alerts')
    this.LogRef = this.db.ref('logs')
  }

  saveAlert (alert) {
    this.AlertRef.push({
      date: admin.database.ServerValue.TIMESTAMP,
      alert
    })
  }

  saveLog (type, value) {
    this.LogRef.push({
      date: admin.database.ServerValue.TIMESTAMP,
      type,
      value
    })
  }
}

module.exports = new Firebase()
