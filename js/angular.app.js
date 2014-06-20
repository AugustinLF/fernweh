(function() {
	var app = angular.module('app', []);

	//headroom
	app.directive('headroom', function() {
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
	});

	app.controller('gridController', function() {
		this.photos = photos;
	});

	app.directive('mainGrid', function() {
		return {
			restrict: 'E',
			templateUrl: 'main_grid.html',
			controller: function($scope) {
				//changes the content, ex if we want to reload a bigger image
				
						var wCont = $('main#grid #itemContainer').innerWidth();
						var witem = $('main#grid #itemContainer .item:first').outerWidth(true);
						var nItems = Math.floor( wCont/witem);
						var mCont = (wCont - witem * nItems)/2;
						$('main#grid #itemContainer').css('marginLeft', mCont+'px');

						$('main#grid #itemContainer').isotope({
							itemSelector: '.item',
							layoutMode: 'masonry',
							getSortData: {
								country: '.country',
								year: '.year'
							},
							masonry: {
								columnWidth: 5
							}

						}).isotope('on', 'layoutComplete', function(isoInstance, laidOutItems) {
							$('main#grid #itemContainer').show('slow');

						});


			},
			controllerAs: 'photo'
		};
	});


	// will be send via AJAX
	var photos = [
	{
		id: 1,
		country: 'Denmark',
		month: 'May',
		year: 2014,
		user: 'Thomas',
		height: 400,
		width: 300,
		srcs: [
			"images/gem-02.gif",
			"images/gem-05.gif",
			"images/gem-09.gif"
		],
		history: [{
			liked: 1,
			followed: 1,
			shared: "yes"
		}]
	},
	{
		id: 2,
		country: 'Italy',
		month: 'April',
		year: 2000,
		user: 'John',
		height: 400,
		width: 300,
		srcs: [
			"images/gem-02.gif",
			"images/gem-05.gif",
			"images/gem-09.gif"
		],
		history: [{
			liked: 1,
			followed: 1,
			shared: "yes"
		}]
	},
	{
		id: 3,
		country: 'Spain',
		month: 'July',
		year: 2025,
		user: 'james',
		height: 400,
		width: 225,
		srcs: [
			"images/gem-02.gif",
			"images/gem-05.gif",
			"images/gem-09.gif"
		],
		history: [{
			liked: 1,
			followed: 1,
			shared: "yes"
		}]
	},
	{
		id: 1,
		country: 'Denmark',
		month: 'May',
		year: 2014,
		user: 'Thomas',
		height: 400,
		width: 300,
		srcs: [
			"images/gem-02.gif",
			"images/gem-05.gif",
			"images/gem-09.gif"
		],
		history: [{
			liked: 1,
			followed: 1,
			shared: "yes"
		}]
	},
	{
		id: 2,
		country: 'Italy',
		month: 'April',
		year: 2000,
		user: 'John',
		height: 400,
		width: 300,
		srcs: [
			"images/gem-02.gif",
			"images/gem-05.gif",
			"images/gem-09.gif"
		],
		history: [{
			liked: 1,
			followed: 1,
			shared: "yes"
		}]
	},
	{
		id: 3,
		country: 'Spain',
		month: 'July',
		year: 2025,
		user: 'james',
		height: 400,
		width: 225,
		srcs: [
			"images/gem-02.gif",
			"images/gem-05.gif",
			"images/gem-09.gif"
		],
		history: [{
			liked: 1,
			followed: 1,
			shared: "yes"
		}]
	},
	{
		id: 1,
		country: 'Denmark',
		month: 'May',
		year: 2014,
		user: 'Thomas',
		height: 400,
		width: 300,
		srcs: [
			"images/gem-02.gif",
			"images/gem-05.gif",
			"images/gem-09.gif"
		],
		history: [{
			liked: 1,
			followed: 1,
			shared: "yes"
		}]
	},
	{
		id: 2,
		country: 'Italy',
		month: 'April',
		year: 2000,
		user: 'John',
		height: 400,
		width: 300,
		srcs: [
			"images/gem-02.gif",
			"images/gem-05.gif",
			"images/gem-09.gif"
		],
		history: [{
			liked: 1,
			followed: 1,
			shared: "yes"
		}]
	},
	{
		id: 3,
		country: 'Spain',
		month: 'July',
		year: 2025,
		user: 'james',
		height: 400,
		width: 225,
		srcs: [
			"images/gem-02.gif",
			"images/gem-05.gif",
			"images/gem-09.gif"
		],
		history: [{
			liked: 1,
			followed: 1,
			shared: "yes"
		}]
	}
	];


})();