const server = require('./server/index');
const GarageDoor = require('./server/GarageDoor/index');
const SocketIO = require('./server/Respones/SocketIO');

const Alerts = require('./server/GarageDoor/alerts');
require('./server/GarageDoor/alerts/OpenTooLong');
require('./server/GarageDoor/alerts/InTransition');
require('./server/GarageDoor/alerts/NightWatch');
require('./server/GarageDoor/alerts/HomeAlone');

GarageDoor.startWatch();

//Subscribe for FirstEvent
GarageDoor.events.on('STATUS_CHANGE',  (newStatus) => {
    console.log(`Changed to ${newStatus}`);
    SocketIO.sendStatus(newStatus);
});

// NIGHT_WATCH HOME_ALONE DOOR_TRANSITION DOOR_OPEN
Alerts.events.on('ALERT',  (code) => {
    console.log(`ALERT: ${code}`);
    SocketIO.sendAlert(code);
});
Alerts.events.on('ALERT',  (code) => {
    if (code === 'NIGHT_WATCH'){
        GarageDoor.action(()=>{})
    }
});
