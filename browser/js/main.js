'use strict';

var app = angular.module('footy', ['ui.router', 'ngAnimate', 'ui.bootstrap', 'ngSanitize'])
.run(function($state, $rootScope) {
    $state.go('home');  
});

// .run(function ($rootScope) {
//   $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
//     console.error('Error transitioning from "' + fromState.name + '" to "' + toState.name + '":', error);
//   });
// });