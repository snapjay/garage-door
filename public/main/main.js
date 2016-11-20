'use strict';
angular.module('gDoor.main', ['ngRoute'])
    .config(['$routeProvider',  function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'main/main.html',
            controller: 'mainCtrl',
            resolve: {
                initStatus: ['$http', function($http){

                    return $http.get('api/getStatus')
                                .then(function(data){
                                    return data.data.status;
                                })
                }],

                currentAuth: ['$firebaseAuth', function($firebaseAuth) {
                    return $firebaseAuth().$requireSignIn();
                }]

            }
        });
    }])

    .controller('mainCtrl', ['$scope', '$http', 'initStatus', 'currentAuth', 'mySocket',
        function($scope, $http, initStatus, currentAuth, mySocket) {
        var fireActions = firebase.database().ref('actions');

     //   $scope.status = initStatus;
        $scope.status = initStatus;

        mySocket.on('statusChange', function(data){

            $scope.status  =  data.status
        });


        // fireActions.limitToLast(1).on('child_added', function(data) {
        //     if (data.val().user != currentAuth.uid) {  // nevermind; I did it!
        //         $scope.detected = data.val();
        //         $scope.detectedStatus = data.val().action;
        //         $scope.isOpen = data.val().action;
        //     }
        // });

        // navigator.geolocation.getCurrentPosition(function(position) {
        //     console.log(position.coords.latitude, position.coords.longitude);
        // });

        $scope.setDoor = function(state){
            fireActions.push({
                user: currentAuth.uid,
                email: currentAuth.email,
                date: new Date().getTime(),
                action : state
            });

            $http.get('api/action')
                .then(function(data){
                    console.log (data.data.result);
                })
        }

    }]);