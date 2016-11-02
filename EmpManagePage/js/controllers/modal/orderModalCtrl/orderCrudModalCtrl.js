/// <reference path="D:\LapTrinhWeb\CoreProject\Project4\EmpManagePage\components/angular/angular.js" />

angular.module('RDash') .controller('orderCrudModalCtrl', ['$scope', '$rootScope', '$http', '$uibModalInstance', 'OrderApi', '$state', 'toastr', function ($scope, $rootScope, $http, $uibModalInstance, OrderApi, $state, toastr) {

    var urlBase = "http://localhost:64025/api/";

    // Get supplier item
    var order = OrderApi.getOrderApi();

    $scope.OrderID = order.OrderID;
    $scope.OrderDate = order.OrderDate;
    $scope.ShippedDate = order.ShippedDate;
    $scope.Freight = order.Freight;
    $scope.Address = order.Address;
    $scope.Tax = order.Tax;
    $scope.IsDeliveried = order.IsDeliveried;
    $scope.ShipperID = order.ShipperID;
    $scope.CustomerID = order.CustomerID;
    $scope.EmployeeID = order.EmployeeID;

    var fullName = order.Customer.LastName + ' ' + order.Customer.FirstName;

    $scope.fullName = fullName;

    $http.get(urlBase + 'OderDetails?orderid=' + $scope.OrderID).success(function (data) {
        $scope.orderDetails = data;
    }).error(function (err) {
        console.error(err);
    });

    $scope.deliveried = function () {
        $http({
            method: 'PUT',
            url: urlBase + 'Orders/' + $scope.OrderID,
            data: {
                'OrderID': $scope.OrderID,
                'OrderDate': $scope.OrderDate,
                'ShippedDate': $scope.ShippedDate,
                'Freight': $scope.Freight,
                'Address': $scope.Address,
                'Tax': $scope.Tax,
                'IsDeliveried': true,
                'ShipperID': $scope.ShipperID,
                'CustomerID': $scope.CustomerID,
                'EmployeeID': $scope.EmployeeID
            }
        }).success(function () {
            toastr.success('Đã giao hàng', 'Thông báo');
            $scope.cancel();
            $state.reload();
        }).error(function (err) {
            console.error(err);
        });
    };

    // Cancel modal     $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');         $state.reload();
    };
 }]);