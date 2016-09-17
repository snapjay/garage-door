'use strict';
// Declare app level module which depends on views, and components
angular.module('gDoor', [
    'snap',
    'firebase',
    'ngRoute',
    'gDoor.main',
    'gDoor.login',
    'gDoor.logs'
])


.config(['$locationProvider', '$routeProvider', 'snapRemoteProvider', function($locationProvider, $routeProvider, snapRemoteProvider) {
    snapRemoteProvider.globalOptions.disable = 'right';
    $locationProvider.hashPrefix('!');
    $routeProvider.otherwise({redirectTo: '/'});
}]);

