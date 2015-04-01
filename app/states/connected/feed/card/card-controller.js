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
    vm.optionsDetails = optionsDetails;
    vm.optionsLike = optionsLike;
    vm.optionsComment = optionsComment;
    vm.optionsForward = optionsForward;
    vm.commenting = false;
    
    function setSrc(src) {
      vm.isSrc = src;
    }

    function optionsDetails($event) {
      alert('opens the image in single view');
    }

    function optionsLike($event) {
      var ele = $event.delegateTarget;
      alert('like the pic');
      angular.element(ele).toggleClass('on-r');
    }

    function optionsComment($event) {
      var ele = $event.delegateTarget;
      angular.element(ele).toggleClass('on-b');
      vm.commenting = !vm.commenting;

    }

    function optionsForward($event) {
      alert('opens options to share via mail or url or social networks');
    }
  }
}());