(function() {
  'use strict';
  
  angular.module('photoApp', [
    'ui.router',
    'iso.directives'
  ])
  // Initialisation of Parse SDK
  .run(['ParseSDK', function(parseServices) {
  }]);
})();
