'use strict';
angular.module('gDoor.login', ['ngRoute'])
    .config(['$routeProvider',  function($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'loginCtrl',
            resolve: {

            }
        });
    }])
    .controller('loginCtrl', ['$scope', '$http',  function($scope, $http) {


    }]);