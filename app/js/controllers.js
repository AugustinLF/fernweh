/* global angular */

angular.module('photoAppControllers', ['ui.router', 'parseServices'])

  // Handle the registration process by creating a new user through Parse
  .controller('registerController', function($state, parseUserServices) {
    // Initialiases the model of the form
    this.user = {};

    // Add a user to the database and if success, changes the state to connected
    this.addUser = function() {
      parseUserServices.createUser(this.user.email, this.user.password)
      .then(function() {  // No errors
        $state.go('connected');
      }, function(error) { // Error
        // Do stuff
        console.log(error); // temporary
      });

      // We reinitialise the user model in case of letter use of the sign up form
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

  // Handles the display of the view in the index, if the user should see the login view or the home
  .controller('indexController', function($state, parseUserServices) {
    if (parseUserServices.getCurrentUser()) {
      $state.go('connected');
    } else {
      $state.go('notConnected');
    }

    // Logout the user and changes the view
    this.logOut = function() {
      parseUserServices.logOut();
      $state.go('notConnected');
    };
  })

  // Controller of the sign in form
  .controller('signInController', function($state, parseUserServices) {
    this.user = {};

    // Activated when the users validates the form
    this.signIn = function() {
      parseUserServices.logIn(this.user.email, this.user.password)
      .then(function() {  // No errors
        $state.go('connected');
      }, function(error) {
        // The login failed. Check error to see why.
        alert('Error: ' + error.code + ' ' + error.message);
      });
    };
  })

  // Controller instanciated for each item (trip)
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
