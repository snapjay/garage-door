const io = require('../index').io
const SocketIO = {}

io.on('connection', function (socket) {
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
