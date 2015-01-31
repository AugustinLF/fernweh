(function() {
  'use strict';
  
  // Controller instanciated for each card (trip)
  angular.module('photoApp')
  .controller('cardController', cardController);
  
  function cardController() {
    /* jshint validthis: true */
    var vm = this;
    vm.isSrc = 'load';
    vm.setSrc = setSrc;
    
    function setSrc(src) {
      vm.isSrc = src;
    }
  }
}());