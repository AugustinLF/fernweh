(function() {
  var app = angular.module('app', ['iso.directives', 'ui.router']);

  Parse.initialize("ePIyiLv520OUiP4YYPdUFwue7JeVsWsxsSUvvUpc", "xAqLZYUadKWeZrLf2x5aF4RtJyH086R6I1cbbMjk");

  app.config(['$stateProvider', function($stateProvider) {
    // Set up the states
    $stateProvider
      .state('connected', {
        templateUrl: "partials/gallery.html"
      })
      .state('notConnected', {
        templateUrl: "partials/signup.html"
      });
    }]);

  //headroom
  app.directive('headroom', function() {
    return {
      restrict: 'EA',
      scope: {
        tolerance: '=',
        offset: '=',
        classes: '='
      },
      link: function(scope, element) {
        var options = {};
        angular.forEach(Headroom.options, function(value, key) {
          options[key] = scope[key] || Headroom.options[key];
        });
        var headroom = new Headroom(element[0], options);
        headroom.init();
        scope.$on('destroy', function() {
          headroom.destroy();
        });
      }
    };
  });

  app.controller('indexController', function($state) {

      if (Parse.User.current()) {
        $state.go('connected');
      } else {
        $state.go('notConnected');
      }

      this.logOut = function() {
        Parse.User.logOut();
        $state.go('notConnected');
      };
  });

  app.controller('signInController', function($state) {
    this.user = {};
    this.signIn = function() {
      Parse.User.logIn(this.user.email, this.user.password, {
        success: function(user) {
          $state.go('connected');
        },
        error: function(user, error) {
          // The login failed. Check error to see why.
          alert("Error: " + error.code + " " + error.message);
        }
      });
    };
  });

  app.controller('registerController', function() {
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
          alert("Error: " + error.code + " " + error.message);
        }
      });
      this.user = {};
    };
  });

  app.controller('gridController', function() {
    this.photos = photos;

    this.loadMore = function() {
      console.log('brrra');
      morephotos.forEach(function(morephoto) {
        photos.push(morephoto);
      });     /* <=> photos.push.apply(photos,morephotos);*/
    }
    /* needs to ajax request new morephotos array! */
  });



  app.directive('mainGrid', function() {
    return {
      restrict: 'E',
      templateUrl: 'partials/main_grid.html'
    };
  });

  app.controller('itemController', function() {

    this.isSrc = 'load';
    this.setSrc = function(setSrc) {
      this.isSrc = setSrc;
      /*$('#itemContainer').isotope('layout');*/
    };

    this.followUser = function(status, username) {
      this.isSrc = setSrc;
    }
  });

  app.controller('navController', function() {

  });


  var photos = [
    {"id":"1","country":'Denmark',"month":"May","year":"2003","user":"Thomas","img":{"load": {"src":"img/photos/300/1.jpg","height":"400","width":"300"} } },
    {"id":"2","country":'Italy',"month":"April","year":"2008","user":"Thomas","img":{"load": {"src":"img/photos/300/2.jpg","height":"400","width":"300"} } },
    {"id":"3","country":'Germany',"month":"May","year":"2014","user":"Thomas","img":{"load": {"src":"img/photos/300/3.jpg","height":"225","width":"300"} } },
    {"id":"4","country":'USA',"month":"September","year":"2014","user":"Thomas","img":{"load": {"src":"img/photos/300/2.jpg","height":"400","width":"300"} } },
    {"id":"5","country":'Denmark',"month":"November","year":"2009","user":"Thomas","img":{"load": {"src":"img/photos/300/3.jpg","height":"225","width":"300"} } }
  ];

  var morephotos = [
    {"id":"6","country":'Denmark',"month":"May","year":"2003","user":"Thomas","img":{"load": {"src":"img/photos/300/1.jpg","height":"400","width":"300"} } },
    {"id":"7","country":'Italy',"month":"April","year":"2008","user":"Thomas","img":{"load": {"src":"img/photos/300/2.jpg","height":"400","width":"300"} } },
    {"id":"8","country":'Germany',"month":"May","year":"2014","user":"Thomas","img":{"load": {"src":"img/photos/300/3.jpg","height":"225","width":"300"} } },
    {"id":"9","country":'USA',"month":"September","year":"2014","user":"Thomas","img":{"load": {"src":"img/photos/300/2.jpg","height":"400","width":"300"} } },
    {"id":"10","country":'Denmark',"month":"November","year":"2009","user":"Thomas","img":{"load": {"src":"img/photos/300/3.jpg","height":"225","width":"300"} } },
    {"id":"11","country":'Italy',"month":"April","year":"2008","user":"Thomas","img":{"load": {"src":"img/photos/300/2.jpg","height":"400","width":"300"} } },
    {"id":"12","country":'Germany',"month":"May","year":"2014","user":"Thomas","img":{"load": {"src":"img/photos/300/3.jpg","height":"225","width":"300"} } },
    {"id":"13","country":'USA',"month":"September","year":"2014","user":"Thomas","img":{"load": {"src":"img/photos/300/2.jpg","height":"400","width":"300"} } },
    {"id":"14","country":'Denmark',"month":"November","year":"2009","user":"Thomas","img":{"load": {"src":"img/photos/300/3.jpg","height":"225","width":"300"} } },
    {"id":"15","country":'Italy',"month":"April","year":"2008","user":"Thomas","img":{"load": {"src":"img/photos/300/2.jpg","height":"400","width":"300"} } },
    {"id":"16","country":'Germany',"month":"May","year":"2014","user":"Thomas","img":{"load": {"src":"img/photos/300/3.jpg","height":"225","width":"300"} } },
    {"id":"17","country":'USA',"month":"September","year":"2014","user":"Thomas","img":{"load": {"src":"img/photos/300/2.jpg","height":"400","width":"300"} } },
    {"id":"18","country":'Denmark',"month":"November","year":"2009","user":"Thomas","img":{"load": {"src":"img/photos/300/3.jpg","height":"225","width":"300"} } }
  ];

})();
