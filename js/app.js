var myApp = angular.module('myApp', []);

myApp.controller('myController', ['$scope', '$http', function ($scope, $http) {
    $scope.labels = {
        title: "Open Weather Map API"
    };

    $scope.myApiKey = "b43cf762e537bdce9ce724f6f27bb497";

    $http.get("krakow_example.json").success(function(data){
        $scope.position = data;

        $scope.openWeatherURL = "http://api.openweathermap.org/data/2.5/weather?lat=" +
            $scope.position.lat + "&lon=" + $scope.position.lon + "&appid=" + $scope.myApiKey;

        console.log($scope.openWeatherURL);

    });
}]);