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