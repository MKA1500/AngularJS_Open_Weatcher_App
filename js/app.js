var myApp = angular.module('myApp', []);

myApp.factory('getWeather', ['$http', '$log', function ($http, $log) {
    $log.log("instantiating factory getWeather");
    var getWeatherUrl = {
        getData: function (siteUrl, callback) {
            $http({
                url: siteUrl,
                method: 'GET'
            }).then(function (resp) {
                callback(resp.data);
            }, function (resp) {
                alert('Wrong city or country code. Please try again');
            });
        },
        myApiKey: "b43cf762e537bdce9ce724f6f27bb497",
        ipApi: "http://ip-api.com/json",
        getLocalWeatherUrl: function (a, b, apiKey) {
            var localUrl = "http://api.openweathermap.org/data/2.5/weather?lat=" + a +
                "&lon=" + b +
                "&units=metric&appid=" + apiKey;
            return localUrl;
        },
        getWeatherByCityUrl: function (city, country, apiKey) {
            var customUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city +
                "," + country +
                "&units=metric&appid=" + apiKey;
            return customUrl;
        }
    };

    return getWeatherUrl;
}]);

myApp.controller('myController', ['$scope', 'getWeather', function ($scope, getWeather) {
    $scope.labels = {
        title: "Open Weather API"
    };

    $scope.getLocalWeather = function () {
        getWeather.getData(getWeather.ipApi, function (data) {
            $scope.position = data;
            $scope.theLocalWeatherURL = getWeather.getLocalWeatherUrl($scope.position.lat, $scope.position.lon, getWeather.myApiKey);
            getWeather.getData($scope.theLocalWeatherURL, function (data) {
                $scope.yourWeather = data;
            });
        });
    }

    $scope.getWeatherByCity = function (form) {
        if($scope.form.$valid) {
            $scope.position.city = $scope.new.city;
            $scope.position.country = $scope.new.country;
            $scope.theCityWeatherURL = getWeather.getWeatherByCityUrl($scope.position.city, $scope.position.country, getWeather.myApiKey);
            getWeather.getData($scope.theCityWeatherURL, function (data) {
                $scope.yourWeather = data;
            });
        }
    }

    $scope.getLocalWeather();

     // https://openweathermap.org/current#current_JSON
     // https://openweathermap.org/weather-conditions
}]);

// http://api.openweathermap.org/data/2.5/weather?q=London,uk&appid=9a899e98ac276d14ee3ba6cd2a21598d
