var app = angular.module('RDash', ['ui.bootstrap', 'ui.router', 'ngCookies', 'CategoriesService', 'SuppliersService', 'datatables', 'ngAnimate', 'toastr', 'textAngular', 'ProductsService', 'flow', 'ngDialog', 'loginService', 'FeedbacksService', 'OrderService']);

app.directive('stringToNumber', function () {
    return {
        require: 'ngModel',
        link: function (scope, element, attrs, ngModel) {
            ngModel.$parsers.push(function (value) {
                return '' + value;
            });
            ngModel.$formatters.push(function (value) {
                return parseFloat(value);
            });
        }
    };
});

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if (event.which === 13) {
                scope.$apply(function () {
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
        testChunks: false,
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




