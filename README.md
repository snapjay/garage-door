Garage Door Install

Get the latest of Node
* sudo apt-get install npm
* sudo npm cache clean -f
* sudo npm install -g n 
* sudo n stable 


Get the latest code and install
* git clone https://github.com/snapjay/garage-door.git
* sudo npm i --production
* npm start


Install as service:
* npm install -g forever
* npm install -g forever-service
* sudo forever-service install garage --script index.js --start


* sudo service garage start
* sudo service garage stop
* sudo service garage status
* sudo service garage restart


