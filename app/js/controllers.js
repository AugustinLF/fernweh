/* global angular, Caman */

angular.module('photoAppControllers', ['ui.router', 'parseServices', 'bindingServices'])

  // Handle the registration process by creating a new user through Parse
  .controller('signUpController', ['$state', 'ParseUserServices', function($state, parseUserServices) {
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
  }])

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
  .controller('indexController', ['$state', 'ParseUserServices', function($state, parseUserServices) {
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
  }])

  // Controller of the sign in form
  .controller('signInController', ['$state', 'ParseUserServices', function($state, parseUserServices) {
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
  }])

  // Controller instanciated for each card (trip)
  .controller('cardController', function() {
    this.isSrc = 'load';
    this.setSrc = function(setSrc) {
      this.isSrc = setSrc;
    };

    this.followUser = function(status, username) {
      
    };
  })

  .controller('navController', function() {

  })

  // Handle the status of the create process
  .controller('createController',  ['CreateBindingService', 'ParseUserServices', 'ParseTripService', '$scope', function(createBinding, parseUserServices, parseTripService, $scope) {
    // Alternative to the drag and drop feature
    this.browseImages = function() {

    };

    // The controls at the bottom are hidden as long a picture is not uploaded
    // Contained isUploaded & status

    // Can only updates values shared in this.data (we are in createBinding, not in the controller)
    createBinding.uploadImage = function(fileSrc) {
      this.data.isUploaded = true;
      this.data.image = fileSrc;
      var img = new Image();
      img.onload = function () {
        $scope.$apply(function() {
          this.data.width = img.width;
          this.data.height = img.height;
        }.bind(this));
      }.bind(this);
      img.src = this.data.image;
      this.setStatus('crop');
    };

    this.data = createBinding.data;

    this.info = {};
    this.crop = {};
    this.isCanvas = false;

    // Used to delete all the work. Goes back to the upload state and delete all the infos
    this.resetInterface = function() {
      //console.log(this);
      this.data.status = 'upload';
      this.info = {};
      this.crop = {};
      this.isCanvas = false;
      this.data.isUploaded = false;
      createBinding.data.resetImage();
    };

    // The status defines where we are in the create section (upload, crop, filter, info or publish)
    this.setStatus = function(status) {
      if(this.data.isUploaded === true) { // We can change the status only if a picture has been uploaded
        this.data.status = status;
      }

      if(status === 'crop') {
        this.isCanvas = true;
        Caman('#createCanvasUploadCanvas', this.data.image, function() {
          this.brightness(0).render();
        });
      }
    };

    createBinding.setStatus = this.setStatus.bind(this);

    this.isSetsStatus = function(statusName) {
      return this.data.status === statusName;
    };

    this.crop = function() {
      var controller = this;
      Caman('#createCanvasUploadCanvas', this.data.image, function() {
        this.crop(controller.crop.width, controller.crop.height, controller.crop.x, controller.crop.y).render();
      });
    };

    this.applyFilter = function(filterName) {
      Caman('#createCanvasUploadCanvas', this.data.image, function() {
        this.revert();
        switch(filterName) {
          case 'Vintage':
            this.greyscale();
            this.contrast(5);
            this.noise(3);
            this.sepia(100);
            this.channels({
              red: 8,
              green: 2,
              blue: 4
            });
            this.gamma(0.87);
            break;

          case 'Sin City':
            this.contrast(100);
            this.brightness(15);
            this.exposure(10);
            this.posterize(80);
            this.clip(30);
            this.greyscale();
            break;
        }
        this.render(function() {
          $scope.$apply(function() {
            createBinding.data.image = this.toBase64();
          }.bind(this));
        });
      });
      this.isCanvas = false;
    };

    this.publish = function() {
      if(true) {  // Validation of the content
        parseTripService.uploadATrip(
          parseUserServices.getCurrentUser().id,
          createBinding.data.image,
          'None',
          [createBinding.data.hashtags],
          createBinding.data.country,
          createBinding.data.month,
          createBinding.data.year
          );
      }
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
