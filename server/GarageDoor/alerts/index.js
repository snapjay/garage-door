const events = require('events');
let Alerts = {};

Alerts.events = new events.EventEmitter(); //TODO: Extend into class

Alerts.emit = (code) => {
    module.exports.events.emit('ALERT', code);
};


module.exports = Alerts;
