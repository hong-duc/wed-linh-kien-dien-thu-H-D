/// <reference path="../../libs/angular.js" />

angular.module("app").controller('showCateListCtrl', ['$scope', '$http', '$state', '$stateParams', 'toastr', function ($scope, $http, $state, $stateParams, toastr) {

    var urlBase = "http://localhost:64025/api/";

    var id = $stateParams.CategoryID;

    $http.get(urlBase + 'Products?categoryid=' + id).success(function (data) {
        $scope.products = data;
        $scope.categoryName = data[0].Category.CategoryName;
    }).error(function (err) {
        console.log(err);
    });

    $scope.goToDetail = function (ProductID) {
        $state.go('productDetail', { ProductID: ProductID });
    };

}]);