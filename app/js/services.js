angular.module('bindingServices', [])
  .factory('CreateBindingService', function() {
    var defaultPlaceholder = 'img/icons/create_placeholder.png';

    var data = {
      'isUploaded': false,
      'status': 'upload',
      'image': defaultPlaceholder
    };

    return {
      data: data,
      resetImage: function() {
        this.data.image = defaultPlaceholder;
      }
    };
});