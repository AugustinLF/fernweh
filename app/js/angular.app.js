angular.module('photoApp', [
    'ui.router',
    'photoAppControllers',
    'photoAppDirectives',
    'photoAppServices'
  ])
  .config(['$stateProvider', function($stateProvider) {
    // Set up the states
    $stateProvider
      .state('connected', {
        templateUrl: "partials/gallery.html"
      })
      .state('notConnected', {
        templateUrl: "partials/signup.html"
      });
    }])
  .run(['ParseSDK', function(photoAppServices) {

  }]);

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
