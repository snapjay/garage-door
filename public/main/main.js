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
                })
        }

    }]);