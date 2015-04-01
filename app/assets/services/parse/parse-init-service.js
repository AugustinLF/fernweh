/* global Parse */

(function() {
    'use strict';

    // The app runs this services when booting to initialiase the Parse services
   angular.module('photoApp')
    .factory('ParseSDK', parseInit);

    function parseInit() {
        // pro-tip: swap these keys out for PROD keys automatically on deploy using grunt-replace
        Parse.initialize('ePIyiLv520OUiP4YYPdUFwue7JeVsWsxsSUvvUpc', 'xAqLZYUadKWeZrLf2x5aF4RtJyH086R6I1cbbMjk');

        return {};
    }
}());
