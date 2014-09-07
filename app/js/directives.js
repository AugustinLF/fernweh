/* global angular, Headroom */

angular.module('photoAppDirectives', ['iso.directives'])
  // Headroom header
  .directive('headroom', function() {
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
  })

  // Fixes browser bug: https://groups.google.com/forum/#!topic/angular/6NlucSskQjY
  .directive('formAutofillFix', function() {
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
  })

/*Angular Image drag and drop/upload directive */
  .directive('createtrip', function ($parse) {
    return {
        restrict: 'EA',
        link: function (scope, element, attrs) {
            //The on-image-drop event attribute
            var onImageDrop = $parse(attrs.onImageDrop);

            //When an item is dragged over the document, add .dragOver to the dropelement
            var onDragOver = function (e) {
                e.preventDefault();
                element.addClass('dragOver');
            };

            //When the user leaves the dropelement, cancels the drag or drops the item
            var onDragEnd = function (e) {
                e.preventDefault();
                element.removeClass('dragOver');
            };

            //When a file is dropped on the overlay
            var loadFile = function (file) {
                //scope.uploadedFile = file; //if needed in another scope!
                
                /* DO SMTH WITH THE FILE */
                function readFile(file, onLoadCallback) {
                  var reader = new FileReader();
                  reader.onload = onLoadCallback;
                  return reader.readAsDataURL(file);
                }
                  /* Might be useful for some checks */
                  var fileSrc;
                  var fileSize = file.size;
                  var fileName = file.name;

                readFile(file, function(e, file){
                  fileSrc = e.target.result;
                  $('#createCanvasUploadImg').attr('src', fileSrc);
                  $('#createCanvasUpload span, #createCanvasUpload #createCanvasUploadBrowse').hide();
                  $('#createCanvasUploadClose, #createControls-crop').removeClass('hidden-all');
                  $('#createStatus #createStatusArrow').removeClass().addClass('crop');
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
  });