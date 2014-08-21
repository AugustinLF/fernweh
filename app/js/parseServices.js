/* global angular, Parse */

angular.module('parseServices', [])
  .factory('ParseSDK', function() {
    // pro-tip: swap these keys out for PROD keys automatically on deploy using grunt-replace
    Parse.initialize('ePIyiLv520OUiP4YYPdUFwue7JeVsWsxsSUvvUpc', 'xAqLZYUadKWeZrLf2x5aF4RtJyH086R6I1cbbMjk');
  })

  .service('parseUserServices', function() {

    // Creates a user with an input of an email/password, and asynchronously sets the callback
    this.createUser = function(email, password, callback) {
      var user = new Parse.User();
      user.set('username', email);
      user.set('email', email);
      user.set('password', password);

      user.signUp(null, {
        success: function(user) {
          callback();
        },
        error: function(user, error) {
          callback(error);
        }
      });
    };

    // Returns Parse user object is a user is connected, if not returns null
    this.getCurrentUser = function() {
      return Parse.User.current();
    };

    // Logs out the current user
    this.logOut = function() {
      Parse.User.logOut();
    };

    // Logs in the user with the email/password input, and asynchronously returns the eventual error
    this.logIn = function(email, password, callback) {
      Parse.User.logIn(email, password, {
        success: function(user) {
          callback();
        },
        error: function(user, error) {
          callback(error);
        }
      });
    };

  });