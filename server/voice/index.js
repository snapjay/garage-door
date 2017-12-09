const routes = require('express').Router();
const GarageDoor = require('../GarageDoor/index');

routes.post('/*', function (req, res) {

    GarageDoor.getStatus((result, error) => {

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(
            {
                "speech": `The Garage door is ${result}`,
                "displayText": `The Garage door is ${result}`,
                "data": {status: result},
                "contextOut": [{status: result}],
                "source": 'DuckDuckGo',
                "intent": req.body.result.metadata.intentName
            }
        ));

    });
});

module.exports = routes;
