/// <reference path="../../libs/angular.js" />

angular.module("app").controller('homeCtrl', ['$scope', '$http', '$state', '$stateParams', 'toastr', 'cartService', function ($scope, $http, $state, $stateParams, toastr, cartService) {

    var urlBase = "http://localhost:64025/api/";

    var slideProduct = [];

    $http.get(urlBase + 'Products').success(function (data) {
        $scope.products = data;

        angular.forEach(data, function (value) {
            if (value.IsDiscount == true) {
                slideProduct.push(value);
            }
        });
    }).error(function (err) {
        console.log(err);
    });

    $scope.products2 = slideProduct;

    $scope.goToDetail = function (ProductID) {
        $state.go('productDetail', { ProductID: ProductID });
    };

    $scope.addToCart = function (data) {
        cartService.addToCart(data);
    };

}]);

