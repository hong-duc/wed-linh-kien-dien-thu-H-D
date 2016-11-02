/// <reference path="D:\LapTrinhWeb\CoreProject\Project4\EmpManagePage\components/angular/angular.js" />

var OrderService = angular.module('OrderService', []);

OrderService.factory('OrderApi', ['$http', function ($http) {

    var urlBase = "http://localhost:64025/api/";
    var OrderApi = {};

    // Contructor
    return {
        // Get
        getOrderApi: function () {
            return OrderApi;
        },

        // Set
        setOrderApi: function (value) {
            OrderApi = value;
        }
    }

    return OrderApi;

}]);