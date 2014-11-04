/* global angular */

angular.module('photoAppControllers', ['ui.router', 'parseServices'])

  // Handle the registration process by creating a new user through Parse
  .controller('signUpController', function($state, parseUserServices) {
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

  .controller('testUploadController', function(parseTripService, parseUserServices) {
    this.submit = function() {
      parseTripService.uploadATrip(
        parseUserServices.getCurrentUser().id,
        undefined,
        'None',
        ['#Awesome', '#Pro', '#Brrra', '#lol'],
        'Italy',
        'August',
        2014
        );
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
      $state.go('connected.feed');
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
      parseUserServices.signIn(this.user.email, this.user.password)
      .then(function() {  // No errors
        $state.go('connected.feed');
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

  })

  // Handle the status of the create process TO DO
  .controller('createController',  ['CreateBindingService', function(createBinding) {

    // Alternative to the drag and drop feature
    this.browseImages = function(){

    };

    // The controls at the bottom are hidden as long a picture is not uploaded
    // Contained isUploaded & status
    this.data = createBinding.data;

    this.info = {};

    this.resetInterface = function() {
      this.data.status = 'upload';
      this.data.isUploaded = false;
      createBinding.resetImage();
    };

    // The status defines where we are in the create section (upload, crop, filter, info or publish)

    this.setStatus = function(status) {
      if(this.data.isUploaded !== false) {
        this.data.status = status;
      }
    };

    this.isSetsStatus = function(statusName) {
      return this.data.status === statusName;
    };

    // Activated when clicked on the previous control. Cycles back through the status
    this.goToPreviousStatus = function() {
      switch(this.data.status) {
        case 'upload':
          this.setStatus('publish');
          break;

        case 'crop':
          this.setStatus('upload');
          break;

        case 'filter':
          this.setStatus('crop');
          break;

        case 'info':
          this.setStatus('filter');
          break;

        case 'publish':
          this.setStatus('info');
          break;
      }
    };

  // Activated when clicked on the next control. Cycles through the status
    this.goToNextStatus = function() {
      switch(this.data.status) {
        case 'upload':
          this.setStatus('crop');
          break;

        case 'crop':
          this.setStatus('filter');
          break;

        case 'filter':
          this.setStatus('info');
          break;

        case 'info':
          this.setStatus('publish');
          break;

        case 'publish':
          this.setStatus('upload');
          break;
      }
    };
  }]);
