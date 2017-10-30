var myApp = angular.module('myApp', []);

myApp.controller('myController', ['$scope', '$http', function ($scope, $http) {
    $scope.labels = {
        title: "Open Weather API"
    };

    $scope.myApiKey = "b43cf762e537bdce9ce724f6f27bb497";

    $http.get("http://ip-api.com/json").success(function(data){
        $scope.position = data;

        $scope.openWeatherURL = "http://api.openweathermap.org/data/2.5/weather?lat=" +
            $scope.position.lat + "&lon=" + $scope.position.lon + "&units=metric&appid=" + $scope.myApiKey;

        // https://openweathermap.org/current#current_JSON

        // https://openweathermap.org/weather-conditions

        $http.get($scope.openWeatherURL).success(function(data){
            $scope.description = data.weather[0].description;
            $scope.speed = data.wind.speed;
            // m per s
            $scope.temp = data.main.temp;
            $scope.pressure = data.main.pressure;
            $scope.humidity = data.main.humidity;
            $scope.icon = data.weather[0].icon;
            $scope.icon = "http://openweathermap.org/img/w/" + $scope.icon + ".png";
        }).error('error');
    });

    

    $scope.findWeather = function (form) {
        if($scope.form.$valid) {
            $scope.position.city = $scope.new.city;
            $scope.position.country = $scope.new.country;

            $scope.openWeatherURL = "http://api.openweathermap.org/data/2.5/weather?q=" +
                $scope.position.city + "," + $scope.position.country + "&units=metric&appid=" + $scope.myApiKey;

            console.log($scope.openWeatherURL);

            $http.get($scope.openWeatherURL).success(function(data){
                $scope.description = data.weather[0].description;
                $scope.speed = data.wind.speed;
                // m per s
                $scope.temp = data.main.temp;
                $scope.pressure = data.main.pressure;
                $scope.humidity = data.main.humidity;
                $scope.icon = data.weather[0].icon;
                $scope.icon = "http://openweathermap.org/img/w/" + $scope.icon + ".png";
            });
        }
    }
}]);

// http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=9a899e98ac276d14ee3ba6cd2a21598d
