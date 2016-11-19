const routes = require('express').Router();
const exec = require('child_process').exec;


routes.get('/getStatus', function(req, res)  {

        var script= ("python " + __dirname + "/scripts/reed.py");

        //https://dzone.com/articles/execute-unix-command-nodejs/
        var child = exec(script, function (error, stdout, stderr) {
            var status = (stdout.trim() == 'open');

            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(
                {
                    error: error,
                    isOpen: status
                }));
        });

});

routes.get('/action', function(req, res)  {
    var script= ("python " + __dirname + "/scripts/relay.py");
    var child = exec(script, function (error, stdout, stderr) {

        var status = (stdout.trim() == 'done');

        res.setHeader('Content-Type', 'application/json');
        res.send(JSON.stringify(
            {
                error: error,
                result: status
            }));
    });
});

module.exports = routes;