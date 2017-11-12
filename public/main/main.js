'use strict';
angular.module('gDoor.main', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'main/main.html',
            controller: 'mainCtrl',
            resolve: {
                initStatus: ['$http', function ($http) {

                    return $http.get('api/getStatus')
                        .then(function (data) {
                            return data.data.status;
                        })
                }],

                currentAuth: ['$firebaseAuth', function ($firebaseAuth) {
                    return $firebaseAuth().$requireSignIn();
                }]

            }
        });
    }])

    .controller('mainCtrl', ['$scope', '$http', 'initStatus', 'currentAuth', 'mySocket',
        function ($scope, $http, initStatus, currentAuth, mySocket) {
            let fireActions = firebase.database().ref('actions');

            $scope.alerts = [];

            $scope.status = initStatus;
            $scope.doorState = $scope.status === 'open';


            mySocket.on('alert', function (alert) {
                console.log(alert.status);
                $scope.alerts.push(alert.status);

            });

            mySocket.on('statusChange', function (data) {

                // Set Animation
                if ($scope.status === 'open') {
                    $scope.doorState = false
                } else if ($scope.status === 'closed') {
                    $scope.doorState = true
                }

                // Update new Status
                $scope.status = data.status;

                fireActions.push({
                    user: currentAuth.uid,
                    email: currentAuth.email,
                    date: new Date().getTime(),
                    action: $scope.status
                });
            });

            $scope.setDoor = function () {

                $http.get('api/action')
                    .then(function (data) {
                        console.log(data.data.result);
                    })
            }

        }]);