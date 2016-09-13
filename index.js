/**
 * Created by dan on 09/09/16.
 */

const express = require('express');
const http = require('http');
const exec = require('child_process').exec;
const port = 3000;
const app = express();
const path = require('path');
const firebase = require("firebase");

firebase.initializeApp({
    databaseURL: "https://garage-door-9135e.firebaseio.com",
    serviceAccount: "firebaseCredentials.json"
});


var db = firebase.database();
var ref = db.ref("actions");



function _execStatus(req, res){

    var script= ("python " + __dirname + "/scripts/reed.py");

    //https://dzone.com/articles/execute-unix-command-nodejs/
    var child = exec(script, function (error, stdout, stderr) {
    var status = (stdout.trim() == 'open');

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(
            {
                error: error,
                isOpen: status
            }));
    });
}

function _execAction(req, res){
    var script= ("python " + __dirname + "/scripts/relay.py");
    var child = exec(script, function (error, stdout, stderr) {

        var status = (stdout.trim() == 'done');

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(
            {
                error: error,
                result: status
            }));
    });
}

app.get('/exec/:action', function(req, res) {

    switch(req.params.action) {

        case 'status':
            _execStatus(req, res);
            break;

        case 'action':
            _execAction(req, res);
            break;
    }

});

var oldStatus = null;

function checkStatus(){
    var script= ("python " + __dirname + "/scripts/reed.py");

    //https://dzone.com/articles/execute-unix-command-nodejs/
    var child = exec(script, function (error, stdout, stderr) {
        var status = (stdout.trim() == 'open');
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

    setTimeout(checkStatus, 500)

}
checkStatus();

app.use('/', express.static(path.join(__dirname, 'public')));


app.listen(port, function () {
    console.log('Example app listening on port 3000!');
});

