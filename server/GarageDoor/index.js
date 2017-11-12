const scriptPath = 'python ' + __dirname + '/scripts/';
const exec = require('child_process').exec;
const events = require('events');

let _oldStatus = null;
let _timer = null;

GarageDoor = {};
GarageDoor.events = new events.EventEmitter(); //TODO: Extend into class

GarageDoor.getStatus = function (callback) {
    let script = (scriptPath + 'reed.py');
    exec(script, function (error, stdout, stderr) {
        callback(stdout.trim(), error);
    });
};

GarageDoor.action = (callback) => {
    let script = (scriptPath + 'relay.py');
    exec(script, function (error, stdout, stderr) {
        const result = (stdout.trim() === 'done');
        callback(result, error);
    });
};

GarageDoor.startWatch = () => {
    _timer = setInterval(module.exports.checkStatus, 700);
};

GarageDoor.stopWatch = () => {
    clearInterval(_timer)
};

GarageDoor.checkStatus = () => {
    module.exports.getStatus(function (status) {
        if (module.exports._oldStatus !== status) {
            module.exports.events.emit('STATUS_CHANGE', status);
            module.exports._oldStatus = status;
        }
    })
};

module.exports = GarageDoor;
