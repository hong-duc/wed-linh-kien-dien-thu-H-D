/// <reference path="D:\LapTrinhWeb\CoreProject\Project4\EmpManagePage\components/angular/angular.js" />

var ProductsService = angular.module('ProductsService', []);

ProductsService.factory('ProdApi', ['$http', function ($http) {

    var urlBase = "http://localhost:64025/api/";
    var ProdApi = {};

    // Contructor
    return {
        // Get
        getProdApi: function () {
            return ProdApi;
        },

        // Set
        setProdApi: function (value) {
            ProdApi = value;
        }
    }

    // Get list products
    ProdApi.getProducts = function () {
        return $http.get(urlBase + 'Products');
    };

    // Add a product
    ProdApi.addProduct = function (prod) {
        return $http.post(urlBase + 'Products/', prod);
    };

    // Edit a product
    ProdApi.editProduct = function (prodToUpdate) {
        var req = $http({
            method: 'put',
            url: urlBase + 'Products/' + prodToUpdate.ProductID,
            data: prodToUpdate
        });
        return req;
    };

    // Delete a product
    ProdApi.deteleProduct = function (prodIdToDelete) {
        var req = $http({
            method: 'delete',
            url: urlBase + 'Products/' + prodIdToDelete.ProductID
        });
        return req;
    };

    return ProdApi;

}]);