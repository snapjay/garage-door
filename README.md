Garage Door API Install

## SETUP

Get the latest of Node and Git
* `sudo apt-get update`
* `sudo apt-get install npm git`
* `sudo npm install -g n` 
* `sudo n stable` 


Get the latest code and install
* `git clone https://github.com/snapjay/garage-door.git`
* `sudo npm i --production`
* `cp .env.example .env`
*  Download and add the Firebase database credentials file `firebase.json` to root
* `npm start`

Install as service:
* `npm install -g forever forever-service`
* `sudo forever-service install garage --script index.js --start`

Set TimeZone
* `cp /usr/share/zoneinfo/America/Toronto /etc/localtime`

Commands to interact with service garage
* `sudo service garage start`
* `sudo service garage stop`
* `sudo service garage status`
* `sudo service garage restart`


## API

`/status`  
Returns status of door 'OPEN', 'CLOSED', 'TRANSITION' or 'ERROR' 

`/action`  
Actions the door

`/hue`  
`state=ON`
`state=OFF`
Turn on or off hue lights

## SOCKET

* `STATUS_CHANGE` 

has values of:
* `OPEN` 
* `CLOSED` 
* `TRANSITION` 

### Alerts

* `ALERT` 

has values of:
* `HOME_ALONE` 
* `DOOR_TRANSITION` 
* `NIGHT_WATCH` 
* `DOOR_OPEN` 
