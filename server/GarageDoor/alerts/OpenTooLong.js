const GarageDoor = require('../index');
const Settings = require('../../settings');
const Alerts = require('./index');

let OpenTooLong = {};
let _timer = null;

GarageDoor.events.on('STATUS_CHANGE', (newStatus) => {
    if (newStatus === 'open') {
        module.exports.startWatch();
    } else {
        module.exports.stopWatch();
    }
});

OpenTooLong.startWatch = function () {
    if (_timer !== null) return;
    console.log('Starting to watch time Open ...');
    _timer = setTimeout(function () {
        Alerts.emit('DOOR_OPEN');
    }, (Settings.doorOpenWarning * 1000))
};

OpenTooLong.stopWatch = function () {

    if (_timer !== null) {
        clearTimeout(_timer);
        _timer = null;
        console.log('Open watch Cancelled');
    }
};

module.exports = OpenTooLong;
