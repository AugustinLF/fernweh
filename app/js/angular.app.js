/* global angular */

angular.module('photoApp', [
    'ui.router',
    'photoAppControllers',
    'photoAppDirectives',
    'photoAppServices'
  ])
  .config(['$stateProvider', function($stateProvider) {
    // Set up the states
    $stateProvider
      .state('connected', {
        templateUrl: 'partials/gallery.html'
      })
      .state('notConnected', {
        templateUrl: 'partials/signup.html'
      });
    }])
  .run(['ParseSDK', function(photoAppServices) {

  }]);
