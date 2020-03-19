// Code goes here

(function () {

    var app = angular.module('homepageApp',['ngRoute']);

    app.config(function ($routeProvider){
        $routeProvider
            .when('/',{
                templateUrl:'home.html'
            })
            .when('/about',{
                templateUrl:'about.html'
            })
            .otherwise({ redirectTo:'/'});
    });
})();
