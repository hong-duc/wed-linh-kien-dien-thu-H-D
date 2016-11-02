/// <reference path="../libs/angular.js" />

angular.module('app').factory('cartService', ['$rootScope', function ($rootScope) {

    var cartService = {};

    cartService.cart = JSON.parse(sessionStorage.getItem('cart') || '[]');

    cartService.addToCart = function (data) {

        

        var thatData = cartService.cart.find(d => d.product.ProductID === data.product.ProductID)

        if (typeof thatData !== 'undefined') {
            thatData.quantity++;
        } else {
            cartService.cart.push(data);
        }

        cartService.capNhat();
    }

    cartService.getCart = function () {
        return cartService.cart;
    }

    cartService.getTotal = function () {
        var total = 0;
        cartService.cart.forEach(function (d) {
            total += (d.product.UnitPrice * d.quantity);
        })
        return total;
    }

    cartService.capNhat = function () {
        $rootScope.summary = cartService.getSummary();
        $rootScope.total = cartService.getTotal();
        sessionStorage.setItem('cart', JSON.stringify(cartService.cart));
        sessionStorage.setItem('summary', cartService.getSummary());
        sessionStorage.setItem('total', cartService.getTotal());
    }

    cartService.getSummary = function () {
        var summary = 0;
        cartService.cart.forEach(function (d) {
            summary += d.quantity;
        })
        return summary;
    }

    cartService.remove = function (index) {
        cartService.cart.splice(index, 1);
        cartService.capNhat();
    }

    cartService.clearCart = function () {
        cartService.cart.length = 0;
        cartService.capNhat();
    }


    return cartService;
}])