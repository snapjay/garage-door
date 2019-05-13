const admin = require('firebase-admin')
const serviceAccount = require('../../firebase')

class Firebase {
  constructor () {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    })
    this.db = admin.firestore()
    this.logCollection = this.db.collection('logs')
  }

  saveLog (type, value) {
    return this.logCollection.add({
      created: admin.firestore.FieldValue.serverTimestamp(),
      type,
      value
    })
  }

  getLogs () {
    return this.logCollection.orderBy('created', 'desc').limit(100).get().then(snapshot => {
      let build = []
      snapshot.forEach(doc => {
        build.push(doc.data())
      })
      return build
    })
  }
}

module.exports = new Firebase()
