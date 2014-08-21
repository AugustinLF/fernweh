/* global angular, Parse */

angular.module('parseServices', [])
  .factory('ParseSDK', function() {
    // pro-tip: swap these keys out for PROD keys automatically on deploy using grunt-replace
    Parse.initialize('ePIyiLv520OUiP4YYPdUFwue7JeVsWsxsSUvvUpc', 'xAqLZYUadKWeZrLf2x5aF4RtJyH086R6I1cbbMjk');
  })

  .service('parseUserServices', function($q) {

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

    // Logs in the user with the email/password input, and returns a promise
    this.logIn = function(email, password) {
      var deferred = $q.defer();

      Parse.User.logIn(email, password, {
        success: function(user) {
          console.log('perfect');
          deferred.resolve();
        },
        error: function(user, error) {
          console.log('problem');
          deferred.reject(error);
        }
      });

      return deferred.promise;
    };

  });