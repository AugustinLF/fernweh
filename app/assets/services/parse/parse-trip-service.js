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