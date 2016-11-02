/// <reference path="D:\LapTrinhWeb\CoreProject\Project4\EmpManagePage\components/angular/angular.js" />

var CategoriesService = angular.module('CategoriesService', []);

CategoriesService.factory('CateApi', ['$http', function ($http) {

    var urlBase = "http://localhost:64025/api/";
    var CateApi = {};

    // Contructor
    return {
        // Get
        getCateApi : function () {
            return CateApi;
        },

        // Set
        setCateApi : function (value) {
            CateApi = value;
        }
    }

    // Get list categories
    CateApi.getCategories = function () {
        return $http.get(urlBase + 'Categories');
    };

    // Add a category
    CateApi.addCategory = function (cate) {
        return $http.post(urlBase + 'Categories/', cate);
    };

    // Edit a category
    CateApi.editCategory = function (cateToUpdate) {
        var req = $http({
            method: 'put',
            url: urlBase + 'Categories/' + cateToUpdate.CategoryID,
            data: cateToUpdate
        });
        return req;
    };

    // Delete a category
    CateApi.deteleEmployee = function (cateIdToDelete) {
        var req = $http({
            method: 'delete',
            url: urlBase + 'Categories/' + cateIdToDelete.CategoryID
        });
        return req;
    };

    return CateApi;

}]);