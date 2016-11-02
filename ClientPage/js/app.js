/// <reference path="libs/angular.js" />
var app = angular.module('app', ['ui.router', 'ui.bootstrap', 'ngCookies', 'ngAnimate', 'toastr', 'flow', '720kb.datepicker', 'textAngular', 'ngMap', 'angularUtils.directives.dirPagination', 'angular-carousel']);

app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('cart', {
            url: '/cart',
            templateUrl: 'templates/shoppingCart/shop-basket.html',
            controller: 'cartCtrl'
        })
        .state('checkout', {
            abstract: true,
            url: '/checkout',
            templateUrl: 'templates/shoppingCart/shop-checkout1.html',
            controller: 'checkOutCtrl'
        })
        .state('checkout.address', {
            url: '/address',
            templateUrl: 'templates/shoppingCart/checkout-address.html'
        })
        .state('checkout.delivery', {
            url: '/delivery-method',
            templateUrl: 'templates/shoppingCart/checkout-deliverymethod.html'
        })
        .state('checkout.payment', {
            url: '/payment',
            templateUrl: 'templates/shoppingCart/checkout-payment.html'
        })
        .state('checkout.review', {
            url: '/review',
            templateUrl: 'templates/shoppingCart/checkout-review.html'
        })
        .state('pay', {
            url: '/pay',
            templateUrl: 'templates/home/pay.html',
        })
        .state('warrantypolicy', {
            url: '/warrantypolicy',
            templateUrl: 'templates/home/warrantypolicy.html',
        })
        .state('contact', {
            url: '/contact',
            templateUrl: 'templates/home/contact.html',
            controller: 'contactCtrl'
        })
        .state('searchProduct', {
            url: '/searchProduct/:txtSearch',
            templateUrl: 'templates/product/searchProduct.html',
            controller: 'searchProductCtrl'
        })
        .state('showCateList', {
            url: '/showcatelist/:CategoryID',
            templateUrl: 'templates/product/showcatelist.html',
            controller: 'showCateListCtrl'
        })
        .state('showSupList', {
            url: '/showsuplist/:SupplierID',
            templateUrl: 'templates/product/showsuplist.html',
            controller: 'showSupListCtrl'
        })
        .state('productDetail', {
            url: '/productDetail/:ProductID',
            templateUrl: 'templates/product/productDetail.html',
            controller: 'productDetailCtrl'
        })
        .state('editUser', {
            url: '/edit-user',
            templateUrl: 'templates/customer/editUser.html',
            controller: 'editUserCtrl'
        })
        .state('login', {
            url: '/login',
            templateUrl: 'templates/customer/login.html',
            controller: 'loginCtrl'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'templates/customer/register.html',
            controller: 'registerCtrl'
        })
        .state('home', {
            url: '/',
            templateUrl: 'templates/home/home.html',
            controller: 'homeCtrl'
        });
}]);

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

app.filter('num', function () {
    return function (input) {
        return parseInt(input, 10);
    }
});

app.run(function ($rootScope) {

    $rootScope.summary = sessionStorage.getItem('summary') || 0;
    $rootScope.total = sessionStorage.getItem('total') || 0;

    
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