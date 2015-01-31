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