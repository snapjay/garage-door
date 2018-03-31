const io = require('../index').io
const SocketIO = {}

io.on('connection', function (socket) {
  console.log(socket.handshake.headers['user-agent'])

  console.log(`Socket Welcomes ${socket.handshake.headers['user-agent']}`)
  socket.on('statusChange', function (payload) {
    console.log('statusChange: ' + payload.status)
  })
})

SocketIO.sendAlert = (code) => {
  io.emit('alert', {
    status: code
  })
}

SocketIO.sendStatus = (status) => {
  io.emit('statusChange', {
    status: status
  })
}

module.exports = SocketIO
