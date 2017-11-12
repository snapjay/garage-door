const path = require('path');
const express = require('express');
const settings = require('./settings');

const app = express();
const http = require('http');
const server = require('http').Server(app);
const io = require('socket.io')(server);

const api = require('./api');

app.use('/api', api);
app.use('/', express.static(path.join(__dirname, '../public')));
app.use('/bower_components', express.static(path.join(__dirname, '../bower_components')));

server.listen(settings.port, function () {
    console.log('Garage Door listening on port ' + settings.port + '!');
});

module.exports = {
    server:server,
    io:io
};