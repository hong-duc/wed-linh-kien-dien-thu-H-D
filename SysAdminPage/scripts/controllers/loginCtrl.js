/// <reference path="../libs/angular.js" />

angular.module("app").controller('loginCtrl', ['$scope', '$location', '$rootScope', 'toastr', function ($scope, $location, $rootScope, toastr) {

    $("#myModal").modal('show');

    $scope.submit = function () {
        if ($scope.username == "admin" && $scope.password == "admin") {
            $scope.cancel();
            //$rootScope.loggedIn = true;
            toastr.success('Đăng nhập thành công');
            $location.path("/quan-ly-nhan-vien");
            location.reload();
        } else {
            $scope.reset();
        }
    };

    $scope.reset = function () {
        toastr.error('Tên đăng nhập hoặc mật khẩu không chính xác.', 'Lỗi đăng nhập');
        $location.path("/dang-nhap");
        location.reload();
    };

    $scope.cancel = function () {
        $("#myModal").modal('hide');
    };

}]);

