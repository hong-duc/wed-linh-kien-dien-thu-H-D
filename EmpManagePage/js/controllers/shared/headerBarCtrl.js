angular.module('RDash')
.controller('headerBarCtrl', ['$scope', '$cookies', '$state', 'toastr', 'LoginApi', function ($scope, $cookies, $state, toastr, LoginApi) {
    var emp = $cookies.getObject('objEmp');
    if (emp !== null) {
        $scope.showUser = $cookies.get('keyUsername');
    }

    $scope.logout = function () {
        toastr.success("Bạn đã đăng xuất tài khoản", "Thông báo");
        $state.go('login');
        $cookies.remove('objEmp');
        $cookies.remove('keyUsername');
    };
}]);