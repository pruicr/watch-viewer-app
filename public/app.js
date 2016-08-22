var watches = angular.module('watches', ['ngRoute']);

watches.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/views/home.html',
        })
        .when('/watches', {
            templateUrl: '/views/watches.html'
        });
    $locationProvider.html5Mode(true);
}]);

watches.controller('mainController', ['$scope', '$http', function($scope, $http) {
    $http.get('/api/watches')
        .success(function(data) {
            $scope.watch = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
}]);
