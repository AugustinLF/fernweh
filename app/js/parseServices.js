/* global angular, Parse */

angular.module('parseServices', [])
  // The app runs this services when booting to initialiase the Parse services
  .factory('ParseSDK', function() {
    // pro-tip: swap these keys out for PROD keys automatically on deploy using grunt-replace
    Parse.initialize('ePIyiLv520OUiP4YYPdUFwue7JeVsWsxsSUvvUpc', 'xAqLZYUadKWeZrLf2x5aF4RtJyH086R6I1cbbMjk');
  })

  // Services providing an interface to the Parse user services
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

  })


  .service('parseTripService', function() {

    // Upload a trip (picture + info)
    // @param User ID
    // @param Picture file
    // @param The filter used (or 'None')
    // @param An array of up to five hashtags
    // @param A country
    // @param A month
    // @param A year
    this.uploadATrip = function(userId, pictureFile, filter, hashtags, country, month, year) {
      var Trip = Parse.Object.extend('Trip'),
        trip = new Trip(),
        i;

      var parseFile = new Parse.File('trip.png', pictureFile);

      parseFile.save().then(function() {
        trip.set('userId', userId);
        trip.set('filter', filter);

        for (i = 1; i < 6; i++) {
          trip.set('hashtag' + i, hashtags[i-1] || 'no hashtag');
        }

        trip.set('country', country);
        trip.set('month', month);
        trip.set('year', year);
        trip.set('timestamp', Date.now());
        trip.set('picture', parseFile);

        trip.save(null, {
          success: function(trip) {
            alert('New object created with objectId: ' + trip.id);
          },
          error: function(trip, error) {
            alert('Failed to create new object, with error code: ' + error.message);
          }
        });
      }, function(error) {
        // Handle error
        console.log(error);
      });
    };
  });
