(function() {
    'use strict';

    // Handle the registration process by creating a new user through Parse
    angular.module('photoApp')
        .config(loginScreenControllerRtr)
        .controller('LoginScreenController', LoginScreenController);

    var injectParams = ['$state', 'ParseUserServices'];
    LoginScreenController.$inject = injectParams;
  
    function LoginScreenController($state, parseUserServices) {
        /* jshint validthis: true */
        var vm = this;
        vm.signInUser = {};
        vm.registerUser = {};
        vm.signIn = signIn;
        vm.register = register;

        // Add a user to the database and if success, changes the state to connected
        function register() {
            console.log(vm.registerUser);
            parseUserServices.createUser(vm.registerUser.email, vm.registerUser.password)
                .then(function() {  // No errors
                    $state.go('connected.feed');
                }, function(error) { // Error
                    // Do stuff
                    console.log(error); // temporary
                });

            // We reinitialise the user model in case of later use of the sign-up form
            vm.registerUser = {};
        }
      
        // Activated when the users validates the form
        function signIn() {
            parseUserServices.signIn(vm.signInUser.email, vm.signInUser.password)
                .then(function() {  // No errors
                    $state.go('connected.feed');
                }, function(error) {
                    // The login failed. Check error to see why.
                    alert('Error: ' + error.code + ' ' + error.message);
                });
        }
    }
    
    loginScreenControllerRtr.$inject = ['$stateProvider'];
    
    function loginScreenControllerRtr($stateProvider) {
        $stateProvider.state('notConnected', {
            templateUrl: 'states/notConnected/start.html',
            controller: 'LoginScreenController as loginScreenCtrl'
        });
    }
}());