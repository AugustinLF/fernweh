/* global angular */

angular.module('bindingServices', [])
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