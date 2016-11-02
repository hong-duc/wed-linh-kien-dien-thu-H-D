/// <reference path="../../libs/angular.js" />

angular.module("app").controller('searchProductCtrl', ['$scope', '$http', '$state', '$stateParams', 'toastr', function ($scope, $http, $state, $stateParams, toastr) {

    var urlBase = "http://localhost:64025/api/";

    $scope.txtSearch = $stateParams.txtSearch;

    $http.get(urlBase + 'Products?txtSearch=' + $scope.txtSearch).success(function (data) {
        $scope.products = data;
        console.log(data);
    }).error(function (err) {
        console.log(err);
    });

    $scope.goToDetail = function (ProductID) {
        $state.go('productDetail', { ProductID: ProductID });
    };

}]);