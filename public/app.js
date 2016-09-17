'use strict';
// Declare app level module which depends on views, and components
angular.module('gDoor', [
    'snap',
    'firebase',
    'ngRoute',
    'ngStorage',
    'gDoor.main',
    'gDoor.login',
    'gDoor.logs'
])


.config(['$locationProvider', '$routeProvider', 'snapRemoteProvider', function($locationProvider, $routeProvider, snapRemoteProvider) {
    snapRemoteProvider.globalOptions.disable = 'right';
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({redirectTo: '/'});
}])

.run(["$rootScope", "$location", '$firebaseAuth', 'snapRemote', function($rootScope, $location, $firebaseAuth, snapRemote) {

    $rootScope.$on("$routeChangeSuccess", function(event, next, previous, error) {
        snapRemote.getSnapper().then(function (snapper) {
            snapper.close();
        });
    })


    $rootScope.$on("$routeChangeError", function(event, next, previous, error) {
        if (error === "AUTH_REQUIRED") {
            $location.path("/login");
        }
    });

    $rootScope.logout = function(){
        $firebaseAuth().$signOut();
        $location.path("/login");
    }
}])


.controller("ctrlMaster", ['$scope', '$firebaseAuth', function($scope, $firebaseAuth) {
    // any time auth state changes, add the user data to scope
    $firebaseAuth().$onAuthStateChanged(function(firebaseUser) {
        $scope.firebaseUser = firebaseUser;
    });

    }
]);

