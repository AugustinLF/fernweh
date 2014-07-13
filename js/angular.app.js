(function() {
	var app = angular.module('app', ['iso.directives']);

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
			templateUrl: 'main_grid.html'
		};
	});

	app.controller('itemController', function() {

		this.isSrc = 'load';
		this.setSrc = function(setSrc) {
			this.isSrc = setSrc;
			/*$('#itemContainer').isotope('layout');*/
		}
	});

	app.controller('navController', function() {
	});


	// will be send via AJAX
	var photos = [
	{
		id: 1,
		country: 'Denmark',
		month: 'May',
		year: 2014,
		user: 'Thomas',
		img: {
			small: {
				src: "img/photos/300/1.jpg",
				height: 400,
				width: 300
			},
			big: {
				src: "img/photos/600/1.jpg",
				height: 375,
				width: 600
			},
			load: {
				src: "img/anchor3_35.png",
				height: 400,
				width: 300
			}
		},
		history: {
			liked: 1,
			followed: 1,
			shared: "yes"
		}
	},
	{
		id: 2,
		country: 'Italy',
		month: 'April',
		year: 2000,
		user: 'John',
		img: {
			small: {
				src: "img/photos/300/2.jpg",
				height: 400,
				width: 300
			},
			big: {
				src: "img/photos/600/2.jpg",
				height: 375,
				width: 600
			},
			load: {
				src: "img/anchor3_35.png",
				height: 400,
				width: 300
			}
		},
		history: {
			liked: 1,
			followed: 1,
			shared: "yes"
		}
	},
	{
		id: 3,
		country: 'Spain',
		month: 'July',
		year: 2025,
		user: 'james',
		img: {
			small: {
				src: "img/photos/300/3.jpg",
				height: 225,
				width: 300
			},
			big: {
				src: "img/photos/600/3.jpg",
				height: 375,
				width: 600
			},
			load: {
				src: "img/anchor3_35.png",
				height: 225,
				width: 300
			}
		},
		history: {
			liked: 1,
			followed: 1,
			shared: "yes"
		}
	},
	{
		id: 1,
		country: 'Denmark',
		month: 'May',
		year: 2014,
		user: 'Thomas',
		img: {
			small: {
				src: "img/photos/300/1.jpg",
				height: 400,
				width: 300
			},
			big: {
				src: "img/photos/600/1.jpg",
				height: 375,
				width: 600
			},
			load: {
				src: "img/anchor3_35.png",
				height: 400,
				width: 300
			}
		},
		history: {
			liked: 1,
			followed: 1,
			shared: "yes"
		}
	},
	{
		id: 2,
		country: 'Italy',
		month: 'April',
		year: 2000,
		user: 'John',
		img: {
			small: {
				src: "img/photos/300/2.jpg",
				height: 400,
				width: 300
			},
			big: {
				src: "img/photos/600/2.jpg",
				height: 375,
				width: 600
			},
			load: {
				src: "img/anchor3_35.png",
				height: 400,
				width: 300
			}
		},
		history: {
			liked: 1,
			followed: 1,
			shared: "yes"
		}
	},
	{
		id: 3,
		country: 'Spain',
		month: 'July',
		year: 2025,
		user: 'james',
		img: {
			small: {
				src: "img/photos/300/3.jpg",
				height: 225,
				width: 300
			},
			big: {
				src: "img/photos/600/3.jpg",
				height: 375,
				width: 600
			},
			load: {
				src: "img/anchor3_35.png",
				height: 225,
				width: 300
			}
		},
		history: {
			liked: 1,
			followed: 1,
			shared: "yes"
		}
	}
	];


})();