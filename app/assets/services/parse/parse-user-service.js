/* global Parse */

(function() {
    'use strict';
    
    // Services providing an interface to the Parse user services
   angular.module('photoApp')
        .service('ParseUserServices', parseUserService);
    
    parseUserService.$inject = ['$q'];
    
    function parseUserService($q) {
        /* jshint validthis: true */
        // Creates a user with an input of an email/password, and returns a promise
        this.createUser = function(email, password) {
          var user = new Parse.User(),
            deferred = $q.defer();

          user.set('username', email);
          user.set('email', email);
          user.set('password', password);

          user.signUp(null, {
            success: function(user) {
              deferred.resolve();
            },
            error: function(user, error) {
              deferred.reject(error);
            }
          });

          return deferred.promise;
        };

        // Returns Parse user object is a user is connected, if not returns null
        this.getCurrentUser = function() {
          return Parse.User.current();
        };

        // Logs out the current user
        this.logOut = function() {
          Parse.User.logOut();
        };

        // Signs in the user with the email/password input, and returns a promise
        this.signIn = function(email, password) {
          var deferred = $q.defer();

          Parse.User.logIn(email, password, {
            success: function(user) {
              deferred.resolve();
            },
            error: function(user, error) {
              deferred.reject(error);
            }
          });

          return deferred.promise;
        };
    }
}());