(function() {
  'use strict';
  
  angular.module('photoApp', [
    'ui.router',
    'iso.directives'
  ])
  // Initialisation of Parse SDK
  .run(['ParseSDK', function(parseServices) {
  }]);
})();

(function() {
'use strict';

// Handles the display of the view in the index, if the user should see the login view or the home
angular.module('photoApp')
    .controller('IndexController', IndexController);
  
    var injectParams = ['$state', 'ParseUserServices'];
    IndexController.$inject = injectParams;
  
    function IndexController($state, parseUserServices) {
        activate();

        function activate() {
            if (parseUserServices.getCurrentUser()) {
                $state.go('connected.feed');
            } else {
                $state.go('notConnected');
            }
        }
    }
}());

(function() {
  'use strict';
  
  // Fixes browser bug: https://groups.google.com/forum/#!topic/angular/6NlucSskQjY
  angular.module('photoApp')
    .directive('formAutofillFix', formAutofillFix);
               
   function formAutofillFix() {
    return function(scope, elem, attrs) {
      elem.prop('method', 'POST');
   
      // Fix autofill issues where Angular doesn't know about autofilled inputs
      if(attrs.ngSubmit) {
        setTimeout(function() {
          elem.unbind('submit').submit(function(e) {
            e.preventDefault();
            elem.find('input, textarea, select').trigger('input').trigger('change').trigger('keydown');
            scope.$apply(attrs.ngSubmit);
          });
        }, 0);
      }
    };
  }
}());
(function(){
  'use strict';
  
  angular.module('photoApp')
    .directive('headroom', headroom);
  
  function headroom() {
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
  }
}());
/* global Parse */

(function() {
    'use strict';
    
    // The app runs this services when booting to initialiase the Parse services
   angular.module('photoApp')
    .factory('ParseSDK', parseInit);
    
    function parseInit() {
        // pro-tip: swap these keys out for PROD keys automatically on deploy using grunt-replace
        Parse.initialize('ePIyiLv520OUiP4YYPdUFwue7JeVsWsxsSUvvUpc', 'xAqLZYUadKWeZrLf2x5aF4RtJyH086R6I1cbbMjk');
    }
}());
/* global Parse */

(function() {
    'use strict';
    
    angular.module('photoApp')
        .service('ParseTripService', parseTripService);
    
    function parseTripService() {
        /* jshint validthis: true */
        
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

            var parseFile = new Parse.File('trip.png', { base64: pictureFile });

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
    }
}());
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
angular.module('photoApp')
  .factory('CreateBindingService', function() {
    var defaultPlaceholder = 'img/icons/create_placeholder.png';
    var data = {
      'isUploaded': false,
      'status': 'upload',
      'image': defaultPlaceholder,
      'resetImage': resetImage
    };

    function resetImage() {
      data.image = defaultPlaceholder;
    }

    return {
      data: data
    };
});
/* global Caman */
(function() {
    'use strict';

    // Handle the status of the create process
    angular.module('photoApp')
        .config(createRtr)
        .controller('createController', createController);

    var injectParams = ['CreateBindingService', 'ParseUserServices', 'ParseTripService', '$scope'];
    createController.$inject = injectParams;

    function createController(createBinding, parseUserServices, parseTripService, $scope) {
        /* jshint validthis: true */
        var vm = this;
        // Default values
        vm.info = {};
        vm.crop = {};
        vm.isCanvas = false;
        vm.data = createBinding.data; // Used to bind data between the directive and the controller
        vm.resetInterface = resetInterface;
        vm.setStatus = setStatus;
        vm.isSetsStatus = isSetsStatus;
        vm.crop = crop;
        vm.applyFilter = applyFilter;
        vm.publish = publish;
        vm.goToPreviousStatus = goToPreviousStatus;
        vm.goToNextStatus = goToNextStatus;

        // Called when a picture is uploaded 
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

        // Used to delete all the work. Goes back to the upload state and delete all the infos
        function resetInterface() {
            vm.data.status = 'upload';
            vm.info = {};
            vm.crop = {};
            vm.isCanvas = false;
            vm.data.isUploaded = false;
            createBinding.data.resetImage();
        }

        // The status defines where we are in the create section (upload, crop, filter, info or publish)
        function setStatus(status) {
                if(vm.data.isUploaded === true) { // We can change the status only if a picture has been uploaded
                vm.data.status = status;
            }

            if(status === 'crop') {
                vm.isCanvas = true;
                Caman('#createCanvasUploadCanvas', vm.data.image, function() {
                    this.brightness(0).render();
                });
            }
        }

        createBinding.setStatus = vm.setStatus.bind(this);

        function isSetsStatus(statusName) {
            return vm.data.status === statusName;
        }

        function crop() {
            Caman('#createCanvasUploadCanvas', vm.data.image, function() {
                this.crop(vm.crop.width, vm.crop.height, vm.crop.x, vm.crop.y).render();
            });
        }

        function applyFilter(filterName) {
            Caman('#createCanvasUploadCanvas', vm.data.image, function() {
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
            vm.isCanvas = false;
        }

        function publish() {
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
        }

        // Activated when clicked on the previous control. Cycles back through the status
        function goToPreviousStatus() {
            switch(vm.data.status) {
                case 'upload':
                vm.setStatus('publish');
                break;

                case 'crop':
                vm.setStatus('upload');
                break;

                case 'filter':
                vm.setStatus('crop');
                break;

                case 'info':
                vm.setStatus('filter');
                break;

                case 'publish':
                vm.setStatus('info');
                break;
            }
        }

        // Activated when clicked on the next control. Cycles through the status
        function goToNextStatus() {
            switch(vm.data.status) {
                case 'upload':
                vm.setStatus('crop');
                break;

                case 'crop':
                vm.setStatus('filter');
                break;

                case 'filter':
                vm.setStatus('info');
                break;

                case 'info':
                vm.setStatus('publish');
                break;

                case 'publish':
                vm.setStatus('upload');
                break;
            }
        }
    }
    
    createRtr.$inject = ['$stateProvider'];
    
    function createRtr($stateProvider) {
        $stateProvider.state('connected.create', {
            templateUrl: 'states/connected/create/create.html',
            controller: 'createController as create'
        });
    }
}());
(function() {
  'use strict';
  
  angular.module('photoApp')
    .directive('createtrip', createTrip);
  
  var injectParams = ['$parse', 'CreateBindingService'];
  createTrip.$inject = injectParams;

  function createTrip($parse, createBinding) {
    return {
        restrict: 'EA',
        link: function (scope, element, attrs) {
          //The on-image-drop event attribute
          //var onImageDrop = $parse(attrs.onImageDrop);

          //When an file is dragged over the document, add .dragOver to the dropelement
          var onDragOver = function (e) {
              e.preventDefault();
              element.addClass('dragOver');
          };

          //When the user leaves the dropelement, cancels the drag or drops the file
          var onDragEnd = function (e) {
              e.preventDefault();
              element.removeClass('dragOver');
          };

          //When a file is dropped on the overlay
          var loadFile = function (file) {
              function readFile(file, onLoadCallback) {
                var reader = new FileReader();
                reader.onload = onLoadCallback;
                return reader.readAsDataURL(file);
              }

              readFile(file, function(e, file){
                var fileSrc = e.target.result;  // We can make test on the file object (file.size, etc.)

                scope.$apply(function() {
                  createBinding.uploadImage(fileSrc);
                });
              });
          };

          //Dragging begins on the document (shows the overlay)
          element.bind('dragover', onDragOver);

          //Dragging ends on the overlay, which takes the whole window
          element.bind('dragleave', onDragEnd)
            .bind('drop', function (e) {
               onDragEnd(e);
               loadFile(e.originalEvent.dataTransfer.files[0]); /* This is the file */
            });
        }
    };
  }
}());
(function() {
  'use strict';
  
  // Controller instanciated for each card (trip)
  angular.module('photoApp')
  .controller('cardController', cardController);
  
  function cardController() {
    /* jshint validthis: true */
    var vm = this;
    vm.isSrc = 'load';
    vm.setSrc = setSrc;
    
    function setSrc(src) {
      vm.isSrc = src;
    }
  }
}());
(function() {
    'use strict';

    // Handle the display of the trips
    angular.module('photoApp')
        .config(gridRtr)
        .controller('gridController', gridController);

    var injectParams = ['$http'];
    gridController.$inject = injectParams;

    function gridController($http) {
        /* jshint validthis: true */
        var vm = this;
        vm.photos = [];
        vm.loadMore = loadMore;

        // Load a first round of trips
        $http.get('data/photos.json').success(function(data) {
            vm.photos = data;
        });

        // Used on click to display more trips
        function loadMore() {
            $http.get('data/morePhotos.json').success(function(data) {
                data.forEach(function(morephoto) {
                    vm.photos.push(morephoto);
                });
            });
        }
    }
    
    gridRtr.$inject = ['$stateProvider'];
    
    function gridRtr($stateProvider) {
        $stateProvider.state('connected.feed', {
            templateUrl: 'states/connected/feed/main_grid.html',
            controller: 'gridController as grid'
        });
    }
}());
(function() {
'use strict';

// Handles the display of the view in the index, if the user should see the login view or the home
angular.module('photoApp')
    .config(homeRtr)
    .controller('HomeController', HomeController);
  
    var injectParams = ['$state', 'ParseUserServices'];
    HomeController.$inject = injectParams;
  
    function HomeController($state, parseUserServices) {
        /* jshint validthis: true */
        var vm = this;
        vm.logOut = logOut;
        
        // Logout the user and changes the view
        function logOut() {
            parseUserServices.logOut();
            $state.go('notConnected');
        }
    }
    
    homeRtr.$inject = ['$stateProvider'];
    
    function homeRtr($stateProvider) {
    $stateProvider
    .state('connected', {
        abstract: true,
        templateUrl: 'states/connected/home.html',
        controller: 'HomeController as homeCtrl'
    });
    }
}());

(function() {
    'use strict';

    // Handle the registration process by creating a new user through Parse
    angular.module('photoApp')
        .config(loginScreenControllerRtr)
        .controller('LoginScreenController', LoginScreenController);

    var injectParams = ['$state', 'ParseUserServices'];
    LoginScreenController.$inject = injectParams;
  
    function LoginScreenController($state, parseUserServices) {
        /* jshint validthis: true */
        var vm = this;
        vm.signInUser = {};
        vm.registerUser = {};
        vm.signIn = signIn;
        vm.register = register;

        // Add a user to the database and if success, changes the state to connected
        function register() {
            console.log(vm.registerUser);
            parseUserServices.createUser(vm.registerUser.email, vm.registerUser.password)
                .then(function() {  // No errors
                    $state.go('connected.feed');
                }, function(error) { // Error
                    // Do stuff
                    console.log(error); // temporary
                });

            // We reinitialise the user model in case of later use of the sign-up form
            vm.registerUser = {};
        }
      
        // Activated when the users validates the form
        function signIn() {
            parseUserServices.signIn(vm.signInUser.email, vm.signInUser.password)
                .then(function() {  // No errors
                    $state.go('connected.feed');
                }, function(error) {
                    // The login failed. Check error to see why.
                    alert('Error: ' + error.code + ' ' + error.message);
                });
        }
    }
    
    loginScreenControllerRtr.$inject = ['$stateProvider'];
    
    function loginScreenControllerRtr($stateProvider) {
        $stateProvider.state('notConnected', {
            templateUrl: 'states/notConnected/start.html',
            controller: 'LoginScreenController as loginScreenCtrl'
        });
    }
}());