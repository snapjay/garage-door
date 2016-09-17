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
    .controller('loginCtrl', ['$scope', '$firebaseAuth', '$localStorage','$location', function($scope, $firebaseAuth, $localStorage, $location) {
        $scope.email = $localStorage.email;
        $scope.password = $localStorage.password;

        $scope.login = function(){

            $scope.error = null;
            $firebaseAuth().$signInWithEmailAndPassword($scope.email, $scope.password)
                .then(function() {

                    $localStorage.email = $scope.email;
                    $localStorage.password = $scope.password;
                    $location.url('/main');
                })
                .catch(function(error) {
                  $scope.error = error;

            });

        }

    }]);

