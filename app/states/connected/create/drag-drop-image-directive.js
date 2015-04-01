(function() {
  'use strict';

  angular.module('photoApp')
    .directive('dragDropImageDirective', dragDropImageDirective);

  function dragDropImageDirective() {
    return {
        restrict: 'EA',
        templateUrl: 'states/connected/create/drag-drop-image-directive-tpl.html',
        scope: {
          imgsrc: '=',
          status: '=',
          isImageLoaded: '=isimageloaded'
        },
        controller: function() {
          /* jshint validthis: true */
          var vm = this;

          vm.removeImage = removeImage;

          function removeImage() {
            vm.isImageLoaded = false;
            vm.status = 'upload';
          }

        },
        controllerAs: 'dragDropCtrl',
        bindToController: true,
        link: function(scope, element, attrs) {
          // When a file is dragged over the document, add .dragOver to the dropelement
          var onDragOver = function(e) {
              e.preventDefault();
              element.addClass('dragOver');
          };

          //When the user leaves the dropelement, cancels the drag or drops the file
          var onDragEnd = function(e) {
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

            readFile(file, function(e, file) {
              // var fileSrc = e.target.result;  // We can make test on the file object (file.size, etc.)

              // var img = new Image();
              // img.onload = function () {
              //   scope.$apply(function() {
              //     scope.data.width = img.width;
              //     scope.data.height = img.height;
              //   });
              // };
              //img.src = fileSrc;

              // scope.imgSrc = fileSrc;
              scope.$apply(function() {
                scope.dragDropCtrl.isImageLoaded = true;
                scope.dragDropCtrl.status = 'crop';
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
