/// <reference path="../../libs/angular.js" />

angular.module("app").controller('showSupListCtrl', ['$scope', '$http', '$state', '$stateParams', 'toastr', function ($scope, $http, $state, $stateParams, toastr) {

    var urlBase = "http://localhost:64025/api/";

    var id = $stateParams.SupplierID;

    $http.get(urlBase + 'Products?supplierid=' + id).success(function (data) {
        $scope.products = data;
        $scope.supplierName = data[0].Supplier.CompanyName;
    }).error(function (err) {
        console.log(err);
    });

    $scope.goToDetail = function (ProductID) {
        $state.go('productDetail', { ProductID: ProductID });
    };

}]);