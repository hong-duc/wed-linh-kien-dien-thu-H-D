/// <reference path="../../libs/angular.js" />

angular.module("app").controller('productDetailCtrl', ['$scope', '$http', '$state', '$stateParams', 'toastr', 'cartService', function ($scope, $http, $state, $stateParams, toastr, cartService) {

    var urlBase = "http://localhost:64025/api/";

    var d = new Date().toLocaleString('en-US', { timeZone: 'Asia/Saigon' });

    var id = $stateParams.ProductID;

    $http.get(urlBase + 'Products?id=' + id).success(function (data) {
        $scope.product = data;
        $scope.ProductID = data.ProductID;
        $scope.ProductName = data.ProductName;
        $scope.UnitPrice = data.UnitPrice;
        $scope.Description = data.Description;
        $scope.PhotoPath = data.PhotoPath;
        $scope.PhotoTitle = data.PhotoTitle;
        $scope.Warranty = data.Warranty;
        $scope.Capacity = data.Capacity;
        $scope.ConnectPort = data.ConnectPort;
        $scope.WriteSpeed = data.WriteSpeed;
        $scope.ReadSpeed = data.ReadSpeed;
        $scope.SupportOS = data.SupportOS;
    }).error(function (err) {
        console.log(err);
    });

    $scope.addToCart = function () {
        cartService.addToCart({ product: $scope.product, quantity: 1 });
    };

}]);