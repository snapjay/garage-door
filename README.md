Garage Door API Install

Get the latest of Node and Git
* `sudo apt-get update`
* `sudo apt-get install npm git`
* `sudo npm install -g n` 
* `sudo n stable` 


Get the latest code and install
* `git clone https://github.com/snapjay/garage-door.git`
* `sudo npm i --production`
* `cp env.example.json env.json`
* `npm start`

Install as service:
* `npm install -g forever forever-service`
* `sudo forever-service install garage --script index.js --start`

Commands to interact with service garage
* `sudo service garage start`
* `sudo service garage stop`
* `sudo service garage status`
* `sudo service garage restart`
