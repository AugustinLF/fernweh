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