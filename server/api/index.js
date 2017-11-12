const routes = require('express').Router();
const GarageDoor = require('../GarageDoor/index');

routes.get('/getStatus', function (req, res) {

    GarageDoor.getStatus((result, error) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(
            {
                error: error,
                status: result
            }));

    });
});

routes.get('/action', function (req, res) {

    GarageDoor.action((result, error) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(
            {
                error: error,
                result: result
            }));

    });
});

module.exports = routes;
