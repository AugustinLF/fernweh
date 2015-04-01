(function() {
    'use strict';

    // Handle the display of the trips
    angular.module('photoApp')
        .config(gridRtr)
        .controller('gridController', gridController);

    var injectParams = ['$http'];
    gridController.$inject = injectParams;

    function gridController($http) {
      /* jshint validthis: true */
      var vm = this;
      vm.photos = [];
      vm.loadMore = loadMore;

      // Load a first round of trips
      $http.get('data/photos.json').success(function(data) {
        vm.photos = data;
      });

      // Used on click to display more trips
      function loadMore() {
        $http.get('data/morePhotos.json').success(function(data) {
          data.forEach(function(morephoto) {
            vm.photos.push(morephoto);
          });
        });
      }

    }
    
    gridRtr.$inject = ['$stateProvider'];
    
    function gridRtr($stateProvider) {
      $stateProvider.state('connected.feed', {
        templateUrl: 'states/connected/feed/main_grid.html',
        controller: 'gridController as grid'
      });
    }
}());