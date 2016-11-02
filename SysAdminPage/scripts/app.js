/// <reference path="libs/angular.js" />

var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'ngAnimate',
                                'ngSanitize', 'textAngular', '720kb.datepicker',
                                'EmployeesService', 'CustomerService', 'angular-loading-bar',
                                'toastr', 'flow']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    // Send to login if the URL was not found
    $urlRouterProvider.otherwise('/dang-nhap');

    $stateProvider
        .state('employees', {
            url: '/quan-ly-nhan-vien',
            templateUrl: 'views/employees.html',
            controller: 'employeesCtrl'
        })
        .state('customers', {
            url: '/quan-ly-khach-hang',
            templateUrl: 'views/customers.html',
            controller: 'customersCtrl'
        })
        .state('login', {
            url: '/dang-nhap',
            templateUrl: 'views/login.html',
            controller: 'loginCtrl'
        });
        //.state('home', {
        //    //resolve: {
        //    //    "check": function ($location, $rootScope) {
        //    //        if (!$rootScope.loggedIn) {
        //    //            $location.path('/dang-nhap');
        //    //        }
        //    //    }
        //    //},
        //    url: '/trang-chu',
        //    templateUrl: 'views/home.html',
        //    controller: 'homeCtrl'
    //});

}]);

app.run(function ($rootScope) {
    $rootScope.typeOf = function (value) {
        return typeof value;
    };
});

app.directive('stringToNumber', function() {
    return {
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function(value) {
                return '' + value;
            });
            ngModel.$formatters.push(function(value) {
                return parseFloat(value);
            });
        }
    };
});

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });
 
                event.preventDefault();
            }
        });
    };
});

app.config(['flowFactoryProvider', appConfig]);


function appConfig(flowFactoryProvider) {

    var myCustomData = {
        requestVerificationToken: 'xsrf',
        blueElephant: '42'
    };

    flowFactoryProvider.defaults = {
        target: 'http://localhost:64025/api/upload',
        testChunks:false,
        permanentErrors: [404, 500, 501],
        successStatuses: [200, 201, 202],
        maxChunkRetries: 1,
        chunkRetryInterval: 5000,
        simultaneousUploads: 4,
        query: myCustomData
    };
    flowFactoryProvider.on('catchAll', function (event) {
        console.log('catchAll', arguments);
    });
    // Can be used with different implementations of Flow.js
    // flowFactoryProvider.factory = fustyFlowFactory;
};

