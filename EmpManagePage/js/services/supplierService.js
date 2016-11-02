/// <reference path="D:\LapTrinhWeb\CoreProject\Project4\EmpManagePage\components/angular/angular.js" />

var SuppliersService = angular.module('SuppliersService', []);

SuppliersService.factory('SupApi', ['$http', function ($http) {

    var urlBase = "http://localhost:64025/api/";
    var SupApi = {};

    // Contructor
    return {
        // Get
        getSupApi: function () {
            return SupApi;
        },

        // Set
        setSupApi: function (value) {
            SupApi = value;
        }
    }

    // Get list suppliers
    SupApi.getSuppliers = function () {
        return $http.get(urlBase + 'Suppliers');
    };

    // Add a suppliers
    SupApi.addSupplier = function (sup) {
        return $http.post(urlBase + 'Suppliers/', sup);
    };

    // Edit a suppliers
    SupApi.editSupplier = function (supToUpdate) {
        var req = $http({
            method: 'put',
            url: urlBase + 'Suppliers/' + supToUpdate.SupplierID,
            data: supToUpdate
        });
        return req;
    };

    // Delete a suppliers
    SupApi.deteleSupplier = function (supIdToDelete) {
        var req = $http({
            method: 'delete',
            url: urlBase + 'Suppliers/' + supIdToDelete.SupplierID
        });
        return req;
    };

    return SupApi;

}]);