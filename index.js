/**
 * Created by dan on 09/09/16.
 */

const express = require('express');
const port = 3000;

const http = require('http');
const api = require('./server/api');
const exec = require('child_process').exec;
const firebase = require("firebase");

const app = express();
const path = require('path');

firebase.initializeApp({
    databaseURL: "https://garage-door-9135e.firebaseio.com",
    serviceAccount: "firebaseCredentials.json"
});

var db = firebase.database();
var ref = db.ref("actions");


app.use('/bower_components', express.static(path.join(__dirname, 'bower_components')));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use('/api', api);


app.listen(port, function () {
    console.log('Garage Door listening on port ' + port + '!');
});



// Constant loop checking for switch status changes
var oldStatus = null;
function checkStatus(){
    var script= ("python " + __dirname + "/scripts/reed.py");

    //https://dzone.com/articles/execute-unix-command-nodejs/
    var child = exec(script, function (error, stdout, stderr) {
        var status = (stdout.trim());
        if (oldStatus != status) {
            ref.push({
                action: status,
                user: "serverDetected",
                date: new Date().getTime()
            });

            console.log('Status Change to: ' + status);
            oldStatus = status;
        }
    });

    setTimeout(checkStatus, 250)

}
checkStatus();
