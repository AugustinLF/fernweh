/* global angular */

angular.module('photoApp', [
    'ui.router',
    'photoAppControllers',
    'bindingServices',
    'photoAppDirectives',
    'parseServices'
  ])

  // We set up the stats with ui.router
  // Mapping the states to the partial views
  .config(['$stateProvider', function($stateProvider) {
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
