const routes = require('express').Router();
const exec = require('child_process').exec;

var scriptPath = "python " + __dirname + "/../../scripts/";

routes.get('/getStatus', function(req, res)  {

        var script= (scriptPath + "reed.py");

        //https://dzone.com/articles/execute-unix-command-nodejs/
        var child = exec(script, function (error, stdout, stderr) {
 	

            res.setHeader('Content-Type', 'application/json');
            res.send(JSON.stringify(
                {
                    error: error,
                    status: stdout.trim()
                }));
        });

});

routes.get('/action', function(req, res)  {
    var script= (scriptPath + "relay.py");
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
