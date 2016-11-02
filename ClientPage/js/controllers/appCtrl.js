/// <reference path="../../libs/angular.js" />

angular.module("app").controller('appCtrl', ['$scope', '$http', '$state', '$stateParams', '$filter', function ($scope, $http, $state, $stateParams, $filter) {

    var urlBase = "http://localhost:64025/api/";

    $http.get(urlBase + 'Categories').success(function (data) {
        $scope.categories = data;
    }).error(function (err) {
        console.log(err);
    });

    $http.get(urlBase + 'Suppliers').success(function (data) {
        $scope.suppliers = data;
    }).error(function (err) {
        console.log(err);
    });

    $scope.showCateProduct = function (CategoryID) {
        $state.go('showCateList', { CategoryID: CategoryID });
    };

    $scope.showSupProduct = function (SupplierID) {
        $state.go('showSupList', { SupplierID: SupplierID });
    };

    $scope.search = function (txtSearch) {
        $state.go('searchProduct', { txtSearch: txtSearch });
        $scope.txtSearch = undefined;
    };

}]);