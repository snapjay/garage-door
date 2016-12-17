const express = require('express');
const app = express();
const port = 3000;

const http = require('http');
const server  = require('http').Server(app);
const api = require('./server/api');
//const alerts = require('./server/alerts');
const exec = require('child_process').exec;
//const firebase = require('firebase');

const path = require('path');

var accountSid = 'AC174b04cc94a540558e8a3e4e920918ee';  var authToken = '0acb766e9142d717eb35ad7ac523ae06';

//require the Twilio module and create a REST client
var client = require('twilio')(accountSid, authToken);

var io = require('socket.io')(server);

// firebase.initializeApp({
//     databaseURL: "https://garage-door-9135e.firebaseio.com",
//     serviceAccount: "firebaseCredentials.json"
// });
//
// var db = firebase.database();
// var ref = db.ref("actions");

app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/api', api);

io.on('connection', function(socket){
    console.log(socket.handshake.headers['user-agent']);

    socket.on('statusChange', function(payload){
        console.log('statusChange: ' + payload.status)
    });


   socket.on('dog', function(msg){
       console.log('dog ' + msg)
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

var oldStatus = null;

function checkStatus(){
//  var script= ("python " + __dirname + "/scripts/test.py");
    var script= ("python " + __dirname + "/scripts/reed.py");

    //https://dzone.com/articles/execute-unix-command-nodejs/
    var child = exec(script, function (error, stdout, stderr) {

        var status = (stdout.trim());

        if (oldStatus != status) {

            io.emit('statusChange', {
                status:status
            });

            if (status == 'open') watchOpen();
            if (status != 'open') stopWatchOpen();

            if (status == 'transition')  watchTransition();
            if (status != 'transition')  stopWatchTransition();
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

var openTimer = null;
var transitionTimer = null;

var watchOpen = function (){
    if (openTimer != null) return;

    console.log('startOpenWatch!');
    openTimer = setTimeout(function () {
        console.log('Alert: DOOR STILL OPEN!');

        io.emit('alert', {
            status:'DOOR_OPEN'
        });

        client.calls.create({
            to: "+16473301029",
            from: "+16473301029",
            url:"https://handler.twilio.com/twiml/EH690893e8188ef78e7651ea6829619fe8"

        }, function(err, call) {
            console.log(err);
            console.log(call);
            console.log(call.sid);
        });

    }, (1*60*1000))

};

var stopWatchOpen = function (){

    clearTimeout(openTimer);
    openTimer = null;
    console.log('stopOpenWatch!');

};

var watchTransition = function (){
    if (transitionTimer != null) return;

    console.log('startTransitionWatch!');
    transitionTimer = setTimeout(function () {
        console.log('Alert: DOOR IN TRANSITION FOR TOO LONG!');

        io.emit('alert', {
            status:'DOOR_TRANSITION'
        });

    }, (30*1000))

};

var stopWatchTransition = function (){

    clearTimeout(transitionTimer);
    transitionTimer = null;
    console.log('stopTransitionWatch!');

};
