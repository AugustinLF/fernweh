/* global angular */

angular.module('photoApp', [
    'ui.router',
    'photoAppControllers',
    'photoAppDirectives',
    'parseServices'
  ])

  .config(['$stateProvider', function($stateProvider) {

    // Set up the states via ui.router to display or the signup or the login, if the user is connected or not
    $stateProvider
      .state('connected', {
        templateUrl: 'partials/gallery.html'
      })
      .state('notConnected', {
        templateUrl: 'partials/signup.html'
      });
    }])

  // Initialisation of Parse SDK
  .run(['ParseSDK', function(parseServices) {
  }]);
