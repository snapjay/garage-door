const express = require('express');
const app = express();
const port = 3000;

const http = require('http');
const server  = require('http').Server(app);
const api = require('./server/api');
const exec = require('child_process').exec;
const firebase = require('firebase');

const path = require('path');

var io = require('socket.io')(server);

firebase.initializeApp({
    databaseURL: "https://garage-door-9135e.firebaseio.com",
    serviceAccount: "firebaseCredentials.json"
});

var db = firebase.database();
var ref = db.ref("actions");

app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/api', api);

io.on('connection', function(socket){
    console.log(socket.handshake.headers['user-agent']);

    socket.on('dog', function(msg){
        io.emit('dog', msg);
    });

    socket.on('statusSim', function(status){
        console.log('statusSim' + status);
        io.emit('statusSim', {
            status:status
        });
    });
});

server.listen(port, function () {
    console.log('Garage Door listening on port ' + port + '!');
});



// Constant loop checking for switch status changes
var oldStatus = null;
function checkStatus(){
   // var script= ("python " + __dirname + "/scripts/test.py");
    var script= ("python " + __dirname + "/scripts/reed.py");

    //https://dzone.com/articles/execute-unix-command-nodejs/
    var child = exec(script, function (error, stdout, stderr) {

        var status = (stdout.trim());

        if (oldStatus != status) {

            io.emit('statusChange', {
                status:status
            });
            // ref.push({
            //     action: status,
            //     user: "serverDetected",
            //     date: new Date().getTime()
            // });

            console.log('Status Change to: ' + status);
            oldStatus = status;
        }
    });

    setTimeout(checkStatus, 200)

}
checkStatus();
