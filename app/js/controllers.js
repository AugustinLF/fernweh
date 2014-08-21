/* global angular, Parse */

angular.module('photoAppControllers', ['ui.router'])

  // Handle the registration process by creating a new user through Parse
  .controller('registerController', function($state) {
    this.user = {};

    this.addUser = function() {
      var user = new Parse.User();
      user.set('username', this.user.email);
      user.set('email', this.user.email);
      user.set('password', this.user.password);

      user.signUp(null, {
        success: function(user) {
          // Once the user is created, we change the state so the user is logged in and brought to the home view
          $state.go('connected');
        },
        error: function(user, error) {
          // Show the error message somewhere and let the user try again.
          alert('Error: ' + error.code + ' ' + error.message);
        }
      });
      this.user = {};
    };
  })

  // Handle the display of the trips
  .controller('gridController', [ '$http', function($http){
    var grid = this;

    // Load a first round of trips
    this.photos = [];
    $http.get('data/photos.json').success(function(data) {
      grid.photos = data;
    });

    // Used on click to display more trips
     this.loadMore = function() {
      $http.get('data/morePhotos.json').success(function(data) {
        data.forEach(function(morephoto) {
           grid.photos.push(morephoto);
        });
      });
    };
  }])

  // Handle the display of the view in the index, if the user should see the login view or the home
  .controller('indexController', function($state) {
    if (Parse.User.current()) {
      $state.go('connected');
    } else {
      $state.go('notConnected');
    }

    // Logout the user and changes the view
    this.logOut = function() {
      Parse.User.logOut();
      $state.go('notConnected');
    };
  })

  // Controller of the sign in form
  .controller('signInController', function($state) {
    this.user = {};
    this.signIn = function() {
      Parse.User.logIn(this.user.email, this.user.password, {
        success: function(user) {
          $state.go('connected');
        },
        error: function(user, error) {
          // The login failed. Check error to see why.
          alert('Error: ' + error.code + ' ' + error.message);
        }
      });
    };
  })

  // Controller instanciated for each item
  .controller('itemController', function() {
    this.isSrc = 'load';
    this.setSrc = function(setSrc) {
      this.isSrc = setSrc;
      /*$('#itemContainer').isotope('layout');*/
    };

    this.followUser = function(status, username) {
      
    };
  })

  .controller('navController', function() {

  });