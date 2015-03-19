(function() {
  'use strict';
  
  angular.module('photoApp', [
    'ui.router',
    'ngSlider',
    'iso.directives'
  ])
  // Initialisation of Parse SDK
  .run(['ParseSDK', function(parseServices) {
  }]);
})();
