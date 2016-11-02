/// <reference path="../libs/angular.js" />

var CustomerService = angular.module('CustomerService', []);

CustomerService.factory('CusApi', ['$http', function ($http) {

    var urlBase = "http://localhost:64025/api/";
    var CusApi = {};

    // Get list Customers
    CusApi.getCustomers = function () {
        return $http.get(urlBase + 'Customers');
    };

    // Edit an customer
    CusApi.editCustomer = function (cusToUpdate) {
        var req = $http({
            method: 'put',
            url: urlBase + 'Customers/' + cusToUpdate.CustomerID,
            data: cusToUpdate
        });
        return req;
    };

    // Delete an customer
    CusApi.deteleCustomer = function (cusIdToDelete) {
        var req = $http({
            method: 'delete',
            url: urlBase + 'Customers/' + cusIdToDelete.CustomerID
        });
        return req;
    };

    return CusApi;

}]);