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
      .state('notConnected', {
        templateUrl: 'partials/start.html'
      })
      .state('connected', {
        templateUrl: 'partials/connected.html'
      })
      .state('connected.feed', {
        templateUrl: 'partials/main_grid.html'
      })
      .state('connected.create', {
        templateUrl: 'partials/create.html'
      });
    }])

  // Initialisation of Parse SDK
  .run(['ParseSDK', function(parseServices) {
  }]);
