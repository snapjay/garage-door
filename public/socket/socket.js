'use strict';
angular.module('gDoor.socket', ['ngRoute'])

    .config(['$routeProvider',  function($routeProvider) {
        $routeProvider.when('/socket', {
            templateUrl: 'socket/socket.html',
            controller: 'socketCtrl'
        });
    }])

    .controller('socketCtrl', ['$rootScope', '$scope', 'mySocket',  function($rootScope, $scope, mySocket) {

        $scope.sendMessage = function(msg) {
            console.log('emit "dog":' + msg);
             mySocket.emit('dog', msg)
        };

        mySocket.on('dog', function(data){
            $scope.dog = data;
            console.log('Received \'dog\':' + data);
        });

        $scope.sendStatusSim = function(msg) {
            console.log('emit "statusSim":' + msg);
            mySocket.emit('statusSim', msg)
        };

        mySocket.on('statusSim', function(data){
            $scope.statusSimRec = data;
            console.log('Received \'statusSim\':' + data);
        });


    }]);
