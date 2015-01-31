(function() {
'use strict';

// Handles the display of the view in the index, if the user should see the login view or the home
angular.module('photoApp')
    .controller('IndexController', IndexController);
  
    var injectParams = ['$state', 'ParseUserServices'];
    IndexController.$inject = injectParams;
  
    function IndexController($state, parseUserServices) {
        activate();

        function activate() {
            if (parseUserServices.getCurrentUser()) {
                $state.go('connected.feed');
            } else {
                $state.go('notConnected');
            }
        }
    }
}());
