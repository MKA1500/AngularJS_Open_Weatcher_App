var myApp = angular.module('myApp', []);

myApp.controller('myController', ['$scope', '$http', function ($scope, $http) {
    $scope.labels = {
        title: "Open Weather Map API"
    };

    $scope.myApiKey = "b43cf762e537bdce9ce724f6f27bb497";

    $http.get("http://ip-api.com/json").success(function(data){
        $scope.position = data;

       var openWeatherURL = "http://api.openweathermap.org/data/2.5/weather?lat=" +
            $scope.position.lat + "&lon=" + $scope.position.lon + "&units=metric&appid=" + $scope.myApiKey;

        console.log(openWeatherURL);

        // https://openweathermap.org/current#current_JSON

        // http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=9a899e98ac276d14ee3ba6cd2a21598d

        $http.get(openWeatherURL).success(function(data){
            $scope.main = data.weather[0].description;
            $scope.description = data.weather[0].description;
            $scope.speed = data.wind.speed;
            // m per s
            $scope.temp = data.main.temp;
            $scope.pressure = data.main.pressure;
            $scope.humidity = data.main.humidity;
        });
    });
}]);