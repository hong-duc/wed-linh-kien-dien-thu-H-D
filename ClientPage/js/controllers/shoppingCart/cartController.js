/// <reference path="../../libs/angular.js" />


angular.module('app')
    .controller('cartCtrl', ['$scope', '$http', 'cartService', '$rootScope', '$state', function ($scope, $http, cartService, $rootScope, $state) {

        getCart();

        function getCart() {
            $scope.cart = cartService.getCart();
        };

        $scope.capNhat = function () {
            cartService.capNhat();
        };

        $scope.remove = function (index) {
            cartService.remove(index);
        };

        $scope.clear = function () {
            cartService.clearCart();
        };

        $scope.goToDetail = function (ProductID) {
            $state.go('productDetail', { ProductID: ProductID });
        };

        $scope.checkOut = function () {
            $state.go('checkout.address');
        }
    }])
