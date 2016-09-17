'use strict';
angular.module('gDoor.logs', ['ngRoute'])
    .config(['$routeProvider',  function($routeProvider) {
        $routeProvider.when('/logs', {
            templateUrl: 'logs/logs.html',
            controller: 'logsCtrl'
        });
    }])
    .controller('logsCtrl', ['$scope', '$firebaseObject',  function($scope, $firebaseObject) {

        var ref = firebase.database().ref('actions').orderByKey()

        // download the data into a local object
        $scope.data = $firebaseObject(ref);
    }]);