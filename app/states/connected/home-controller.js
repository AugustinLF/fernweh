(function() {
'use strict';

// Handles the display of the view in the index, if the user should see the login view or the home
angular.module('photoApp')
    .config(homeRtr)
    .controller('HomeController', HomeController);
  
    var injectParams = ['$state', 'ParseUserServices'];
    HomeController.$inject = injectParams;
  
    function HomeController($state, parseUserServices) {
        /* jshint validthis: true */
        var vm = this;
        vm.logOut = logOut;
        
        // Logout the user and changes the view
        function logOut() {
            parseUserServices.logOut();
            $state.go('notConnected');
        }
    }
    
    homeRtr.$inject = ['$stateProvider'];
    
    function homeRtr($stateProvider) {
    $stateProvider
    .state('connected', {
        abstract: true,
        templateUrl: 'states/connected/home.html',
        controller: 'HomeController as homeCtrl'
    });
    }
}());
