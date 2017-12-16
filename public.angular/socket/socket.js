'use strict';
angular.module('gDoor.socket', ['ngRoute'])

    .config(['$routeProvider',  function($routeProvider) {
        $routeProvider.when('/socket', {
            templateUrl: 'socket/socket.html',
            controller: 'socketCtrl'
        });
    }])

    .controller('socketCtrl', ['$rootScope', '$scope', 'mySocket',  function($rootScope, $scope, mySocket) {

        mySocket.on('alert', function(data){
            $scope.alert = data;
            console.log('Received \'alert\':',  data);
        });

        $scope.sendStatusSim = function(msg) {
            console.log('emit "statusSim":' + msg);
            mySocket.emit('statusSim', msg)
        };

        mySocket.on('statusSim', function(data){
            $scope.statusSimRec = data;
            console.log('Received \'statusSim\':', data);
        });


    }]);
