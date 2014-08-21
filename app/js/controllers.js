/* global angular, Parse, photos, morephotos */

angular.module('photoAppControllers', ['ui.router'])
  .controller('registerController', function() {
    this.user = {};
    this.addUser = function() {
      var user = new Parse.User();
      user.set('username', this.user.email);
      user.set('email', this.user.email);
      user.set('password', this.user.password);

      user.signUp(null, {
        success: function(user) {
          // Hooray! Let them use the app now.
        },
        error: function(user, error) {
          // Show the error message somewhere and let the user try again.
          alert('Error: ' + error.code + ' ' + error.message);
        }
      });
      this.user = {};
    };
  })

  .controller('gridController', [ '$http', function($http){
    var grid = this;
    this.photos = [];
    $http.get('data/photos.json').success(function(data) {
      grid.photos = data;
    });

     this.loadMore = function() {
      $http.get('data/morePhotos.json').success(function(data) {
        data.forEach(function(morephoto) {
           grid.photos.push(morephoto);
        });     /* <=> photos.push.apply(photos,morephotos);*/
      });
    };
  }])

  .controller('indexController', function($state) {

    if (Parse.User.current()) {
      $state.go('connected');
    } else {
      $state.go('notConnected');
    }

    this.logOut = function() {
      Parse.User.logOut();
      $state.go('notConnected');
    };
  })

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