//
// const server  = require('http').Server(require('express')());
// const exec = require('child_process').exec;
// const path = require('path');
//
// var io = require('socket.io')(server);

// var oldStatus = null;
//
//
// function checkStatus(){
//      var script= ("python " + __dirname + "/../../scripts/test.py");
//     //var script= ("python " + __dirname + "/scripts/reed.py");
//
//     //https://dzone.com/articles/execute-unix-command-nodejs/
//     var child = exec(script, function (error, stdout, stderr) {
//
//         var status = (stdout.trim());
//
//         if (oldStatus != status) {
//
//             io.emit('statusChange', {
//                 status:status
//             });
//
//             if (status != 'closed') watchOpen();
//             if (status == 'closed') stopWatchOpen();
//             // ref.push({
//             //     action: status,
//             //     user: "serverDetected",
//             //     date: new Date().getTime()
//             // });
//
//
//             console.log('Status Change to: ' + status);
//             oldStatus = status;
//         }
//     });
//
//     setTimeout(checkStatus, 200)
//
// }
// checkStatus();
//
// var openTimer = null;
//
// var watchOpen = function (){
//     if (openTimer != null) return;
//
//     console.log('startWatch!');
//     openTimer = setTimeout(function () {
//         console.log('Alert: DOOR STILL OPEN!');
//
//         io.emit('alert', {
//             status:'DOOR_OPEN'
//         });
//
//     }, (5*1000))
//
// };
//
// var stopWatchOpen = function (){
//
//     clearTimeout(openTimer);
//     openTimer = null;
//     console.log('stopWatch!');
//
// };
//
// exports.watchOpen;
// exports.stopWatchOpen;