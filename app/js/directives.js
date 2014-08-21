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

  // Displays the grid template
  .directive('mainGrid', function() {
    return {
      restrict: 'E',
      templateUrl: 'partials/main_grid.html'
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
  });