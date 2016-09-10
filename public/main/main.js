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
        var fireActions = firebase.database().ref('actions');
        $scope.isOpen = isOpen;
        $scope.detectedStatus = isOpen;

        //console.log (firebase.auth().currentUser.uid);

//    elDoor.one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(e) {
//            if (state == 'open') {
//                elButtonClose.attr('disabled',false);
//            } else {
//                elButtonOpen.attr('disabled',false);
//            }
//        });


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
                })
        }

    }]);