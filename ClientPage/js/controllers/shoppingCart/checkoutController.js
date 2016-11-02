/// <reference path="../../libs/angular.js" />


angular.module('app')
    .controller('checkOutCtrl', ['$scope', '$http', 'cartService', '$rootScope', '$state', '$cookies', 'toastr', function ($scope, $http, cartService, $rootScope, $state, $cookies, toastr) {

        var urlBase = "http://localhost:64025/api/";

        $scope.user = JSON.parse(sessionStorage.getItem('theuser'));

        $scope.currentState = $state.current.name;

        $scope.cart = cartService.getCart();

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams, options) {
            $scope.currentState = toState.name;
        })

        $scope.checkAndProceedToPayment = function () {
            $state.go('checkout.payment');
        };

        $scope.checkAndProceedToReview = function () {
            $state.go('checkout.review');
        };

        //$scope.placeOrder = function () {
        //    console.log('You have place an order :D')
        //}


        $scope.placeOrder = function () {
            var today = new Date();
            var dd = today.getDate();
            var mm = today.getMonth() + 1; //January is 0!
            var yyyy = today.getFullYear();

            var numberOfDaysToAdd = 3;
            var shipDay = today.setDate(today.getDate() + numberOfDaysToAdd);

            if (dd < 10) {
                dd = '0' + dd
            }

            if (mm < 10) {
                mm = '0' + mm
            }

            today = mm + '/' + dd + '/' + yyyy;

            var data = {

                order: {
                    OrderDate: today,
                    ShippedDate: today,
                    Freight: 10000,
                    Address: $scope.user.Address,
                    Tax: 10000,
                    IsDeliveried: false,
                    ShipperID: 1,
                    CustomerID: $scope.user.CustomerID,
                    EmployeeID: 1
                },
                Products: $scope.cart,
                Discount: 0
            };

            $http.post(urlBase + 'Orders/', data)
                    .success(function (res) {
                        if (res.message === 'success') {
                            cartService.clearCart();
                            $state.go('home');
                            toastr.success('Gửi đơn hàng thành công', 'Thông báo');
                            toastr.info('Đơn hàng của bạn đã được ghi nhận');
                        } else {
                            console.error(res.message);
                        }
                    })
                    .error(function (err) {
                        console.error(err);
                    });
        };

    }])
