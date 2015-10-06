angular.module('weatherApp', ['ngRoute', 'ngAutocomplete'])

.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'main.html',
      controller: 'MainCtrl'
    });
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
}])

.controller('MainCtrl', ['$scope', '$http', function($scope, $http) {

  // options for autocomplete
  $scope.options = {
    country: '',
    types: '(cities)'
  };

  // default city set to san francisco
  $scope.searchResult = 'San Francisco';

  // call to api on form submit
  $scope.submit = function () {

    var url = 'http://api.openweathermap.org/data/2.5/forecast?q=' + $scope.searchResult + '&units=imperial&type=accurate&APPID=5805096c65c2190f6c9fd7c4f90dd96c';
    $http.get(url)
      .then(function(response) {

        // alert for no city found
        var status = response.data.cod;
          if (status === "404") {
            alert("No city found");
          }

        // today's data
        $scope.cityName = response.data.city.name;
        $scope.todayIcon = response.data.list[2].weather[0].id;
        $scope.todayTemp = Math.round(response.data.list[2].main.temp);

        // future data 1
        $scope.futureIcon1 = response.data.list[10].weather[0].id;
        $scope.futureTemp1 = Math.round(response.data.list[10].main.temp);
        $scope.futureDate1 = moment(response.data.list[10].dt_txt).format('ddd MMM D');
        
        // future data 2
        $scope.futureIcon2 = response.data.list[18].weather[0].id; 
        $scope.futureTemp2 = Math.round(response.data.list[18].main.temp);
        $scope.futureDate2 = moment(response.data.list[18].dt_txt).format('ddd MMM D');

        // future data 3
        $scope.futureIcon3 = response.data.list[27].weather[0].id;
        $scope.futureTemp3 = Math.round(response.data.list[27].main.temp);
        $scope.futureDate3 = moment(response.data.list[27].dt_txt).format('ddd MMM D');

         // error handling
      }, function(response) {
            var error = response.status;
              if (error === 404 || 408) {
                alert("Mayday! Mayday! The server is down");
              }
      });
  };

  // get default data on page load
  $scope.submit();

}]); // end