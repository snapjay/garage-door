'use strict';
angular.module('gDoor.main', ['ngRoute'])
    .config(['$routeProvider',  function($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'main/main.html',
            controller: 'mainCtrl',
            resolve: {
                isOpen: ['$http', function($http){
                    return $http.get('exec/status')
                                .then(function(data){
                                    return data.data.isOpen;
                                })
                }]

            }
        });
    }])
    .controller('mainCtrl', ['$scope', '$http', 'isOpen', function($scope, $http, isOpen) {
<<<<<<< HEAD

        $scope.isOpen = isOpen;

        $scope.detectedStatus = isOpen;
=======
        var fireActions = firebase.database().ref('actions');
        $scope.isOpen = isOpen;
        $scope.detectedStatus = isOpen;

>>>>>>> 3ce1c4d39a97e3f3dad4bb875a22fb4ca20ea5df
        //console.log (firebase.auth().currentUser.uid);

//    elDoor.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
//            if (state == 'open') {
//                elButtonClose.attr('disabled',false);
//            } else {
//                elButtonOpen.attr('disabled',false);
//            }
//        });

<<<<<<< HEAD
        var fireActions = firebase.database().ref('actions');
        fireActions.limitToLast(1).on('child_added', function(data) {

            $scope.detectedStatus = data.val().action;
            $scope.isOpen = data.val().action;
            console.log($scope);
            console.log(data.val());
            $scope.$apply();
        });


        $scope.setDoor = function(state){
            $http.get('exec/action')
                .then(function(data){
                    $scope.isOpen = !$scope.isOpen;
                    console.log (data.data.isOpen);
=======

        fireActions.limitToLast(1).on('child_added', function(data) {

            if (data.val().user != firebase.auth().currentUser.uid) {  // nevermind; I did it!
                $scope.detected = data.val();
                $scope.detectedStatus = data.val().action;
                $scope.isOpen = data.val().action;
                $scope.$apply();
            }

        });

        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position.coords.latitude, position.coords.longitude);
        });

        $scope.setDoor = function(state){
            fireActions.push({
                user: firebase.auth().currentUser.uid,
                date: new Date().getTime(),
                action : state
            });

            $scope.isOpen = !$scope.isOpen;
            $http.get('exec/action')
                .then(function(data){
                    console.log (data.data.result);
>>>>>>> 3ce1c4d39a97e3f3dad4bb875a22fb4ca20ea5df
                })
        }

    }]);