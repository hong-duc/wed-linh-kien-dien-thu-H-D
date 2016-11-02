'use strict';

/**
 * Route configuration for the RDash module.
 */
angular.module('RDash').config(['$stateProvider', '$urlRouterProvider',
    function($stateProvider, $urlRouterProvider) {

        // For unmatched routes
        $urlRouterProvider.otherwise('/');

        // Application routes
        $stateProvider
            .state('login', {
                url: '/',
                //templateUrl: 'templates/login/loginPage.html',
                controller: 'loginCtrl'
            })
            .state('orders', {
                url: '/orders',
                templateUrl: 'templates/order.html',
                controller: 'orderCtrl'
            })
            .state('feedbacks', {
                url: '/feedbacks',
                templateUrl: 'templates/feedback.html',
                controller: 'feedbackCtrl'
            })
            .state('categories', {
                url: '/categories',
                templateUrl: 'templates/categories.html',
                controller: 'categoryCtrl'
            })
            .state('suppliers', {
                url: '/suppliers',
                templateUrl: 'templates/suppliers.html',
                controller: 'supplierCtrl'
            })
            .state('products', {
                url: '/products',
                templateUrl: 'templates/products.html',
                controller: 'productCtrl'
            })
            .state('tables', {
                url: '/tables',
                templateUrl: 'templates/tables.html'
            });
    }
]);