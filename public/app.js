var watches = angular.module('watches', ['ngRoute']);

watches.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider
        .when('/', {
            templateUrl: '/views/home.html',
        })
        .when('/watches', {
            templateUrl: '/views/watches.html'
        })
        .when('/add-watch', {
            templateUrl: '/views/addWatch.html'
        })
        .when('/delete-watch', {
            templateUrl: '/views/deleteWatch.html'
        })
        .when('/404', {
            templateUrl: '/views/404.html'
        })
        .otherwise({
            redirectTo: '/404'
        });
    $locationProvider.html5Mode(true);
}]);

watches.controller('mainController', ['$scope', '$http', '$window', function($scope, $http, $window) {
    $scope.formData = {};
    $http.get('/api/watches')
        .success(function(data) {
            $scope.watch = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
    $scope.createWatch = function() {
        var watchData = {
            name: $scope.formData.name,
            brand: $scope.formData.brand,
            description: $scope.formData.description,
            caseSize: $scope.formData.caseSize,
            lugSize: $scope.formData.lugSize,
            bezelColor: $scope.formData.bezelColor,
            url: $scope.formData.url
        };
        $http.post('/api/watches', watchData)
            .success(function(data) {
                $scope.formData.name = '';
                $scope.formData.brand = '';
                $scope.formData.description = '';
                $scope.formData.caseSize = '';
                $scope.formData.lugSize = '';
                $scope.formData.bezelColor = '';
                $scope.formData.url = '';
                
                $window.location.href = '/watches';
                $window.location.href;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
    $scope.deleteWatch = function(id) {
        $http.delete('/api/watches/' + id)
            .success(function(data) {
                $scope.watches = data;
            
                $window.location.href = '/watches';
                $window.location.href;
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
}]);
