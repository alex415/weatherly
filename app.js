angular.module('weatherApp', ['ngRoute', 'ngAutocomplete'])

.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'main.html',
      controller: 'MainCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}])

.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {

  $scope.searchResults = '';

  $scope.submit = function () {
    var url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + $scope.searchResult + ',us&units=imperial&APPID=5805096c65c2190f6c9fd7c4f90dd96c';
    $http.get(url)
      .then(function(response) {
        $scope.cityResults = response.data;
        var status = response.data.cod;
          if (status === "404") {
            alert("No city found");
          }
      }, function(response) {
            var error = response.status;
              if (error === 404 || 408) {
                alert("Mayday! Mayday! The server is down");
              }
      });
  };

  // $scope.images = [
  //   { src : 'thunderstorm.png' },
  //   { src : 'drizzle.png' },
  //   { src : 'rain.png' },
  //   { src : 'snow.png' },
  //   { src : 'atmosphere.png' },
  //   { src : 'clouds.png' },
  //   { src : 'extreme.png' },
  //   { src : 'additional.png' }
  // ];


  // if ($scope.result BETWEEN 1 TO 100)
  //     $scope.img = "icon1.png"

  // if ($scope.result BETWEEN 101 TO 200)
  //     $scope.img= ="icon2.png"


}]); // end