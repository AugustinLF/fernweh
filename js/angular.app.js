(function() {
	var app = angular.module('app', ['iso.directives']);

	//bodytag
	app.controller('siteController', function($scope) {
	});

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

		this.loadMore = function() {
			morephotos.forEach(function(morephoto) {
				photos.push(morephoto);
			}); 		/* <=> photos.push.apply(photos,morephotos);*/
		}
		/* needs to ajax request new morephotos array! */
	});

	app.directive('mainGrid', function() {
		return {
			restrict: 'E',
			templateUrl: 'main_grid.html'
		};
	});

	app.controller('itemController', function() {

		this.isSrc = 'load';


		/* If imgSRC is changed use this (ng-click="item.setSrc('big')" )

		this.setSrc = function(setSrc) {
			this.isSrc = setSrc;
		}*/


		this.followUser = function(status, username) {
			this.isSrc = setSrc;
		}
	});

	app.controller('navController', function() {
	});




	var photos = [
		{"id":"1","country":'Denmark',"month":"May","year":"2003","user":"Thomas","img":{"load": {"src":"img/photos/300/1.jpg","height":"400","width":"300"} } },
		{"id":"2","country":'Italy',"month":"April","year":"2008","user":"Thomas","img":{"load": {"src":"img/photos/300/2.jpg","height":"400","width":"300"} } },
		{"id":"3","country":'Germany',"month":"May","year":"2014","user":"Thomas","img":{"load": {"src":"img/photos/300/3.jpg","height":"225","width":"300"} } },
		{"id":"4","country":'USA',"month":"September","year":"2014","user":"Thomas","img":{"load": {"src":"img/photos/300/2.jpg","height":"400","width":"300"} } },
		{"id":"5","country":'Denmark',"month":"November","year":"2009","user":"Thomas","img":{"load": {"src":"img/photos/300/3.jpg","height":"225","width":"300"} } }
	];

	var morephotos = [
		{"id":"6","country":'Denmark',"month":"May","year":"2003","user":"Thomas","img":{"load": {"src":"img/photos/300/1.jpg","height":"400","width":"300"} } },
		{"id":"7","country":'Italy',"month":"April","year":"2008","user":"Thomas","img":{"load": {"src":"img/photos/300/2.jpg","height":"400","width":"300"} } },
		{"id":"8","country":'Germany',"month":"May","year":"2014","user":"Thomas","img":{"load": {"src":"img/photos/300/3.jpg","height":"225","width":"300"} } },
		{"id":"9","country":'USA',"month":"September","year":"2014","user":"Thomas","img":{"load": {"src":"img/photos/300/2.jpg","height":"400","width":"300"} } },
		{"id":"10","country":'Denmark',"month":"November","year":"2009","user":"Thomas","img":{"load": {"src":"img/photos/300/3.jpg","height":"225","width":"300"} } },
		{"id":"11","country":'Italy',"month":"April","year":"2008","user":"Thomas","img":{"load": {"src":"img/photos/300/2.jpg","height":"400","width":"300"} } },
		{"id":"12","country":'Germany',"month":"May","year":"2014","user":"Thomas","img":{"load": {"src":"img/photos/300/3.jpg","height":"225","width":"300"} } },
		{"id":"13","country":'USA',"month":"September","year":"2014","user":"Thomas","img":{"load": {"src":"img/photos/300/2.jpg","height":"400","width":"300"} } },
		{"id":"14","country":'Denmark',"month":"November","year":"2009","user":"Thomas","img":{"load": {"src":"img/photos/300/3.jpg","height":"225","width":"300"} } },
		{"id":"15","country":'Italy',"month":"April","year":"2008","user":"Thomas","img":{"load": {"src":"img/photos/300/2.jpg","height":"400","width":"300"} } },
		{"id":"16","country":'Germany',"month":"May","year":"2014","user":"Thomas","img":{"load": {"src":"img/photos/300/3.jpg","height":"225","width":"300"} } },
		{"id":"17","country":'USA',"month":"September","year":"2014","user":"Thomas","img":{"load": {"src":"img/photos/300/2.jpg","height":"400","width":"300"} } },
		{"id":"18","country":'Denmark',"month":"November","year":"2009","user":"Thomas","img":{"load": {"src":"img/photos/300/3.jpg","height":"225","width":"300"} } }
	];



})();