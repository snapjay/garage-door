const admin = require('firebase-admin')
const serviceAccount = require('../../firebase')

class Firebase {
  constructor () {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: 'https://garage-door-9135e.firebaseio.com'
    })

    this.db = admin.database()
    this.LogRef = this.db.ref('logs')
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
