'use strict';
angular.module('gDoor.logs', ['ngRoute'])
    .config(['$routeProvider',  function($routeProvider) {
        $routeProvider.when('/logs', {
            templateUrl: 'logs/logs.html',
            controller: 'logsCtrl',
            resolve: {
                currentAuth: ['$firebaseAuth', function($firebaseAuth) {
                    return $firebaseAuth().$requireSignIn();
                }]

            }
        });
    }])
    .controller('logsCtrl', ['$scope', '$firebaseObject',  function($scope, $firebaseObject) {

        var ref = firebase.database().ref('actions').orderByKey()
        $scope.data = $firebaseObject(ref);
    }])
    .filter('status', function(){
        return function(input) {

            if (input){
                return 'Open';
            } else {
                return 'Closed';
            }
        }
    })
    .filter('user', function(){
        return function(input) {

            if (input){
                return input;
            } else {
                return 'Physical';
            }
        }
    });