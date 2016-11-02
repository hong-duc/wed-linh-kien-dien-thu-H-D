/// <reference path="../../libs/angular.js" />

angular.module("app").controller('headerCtrl', ['$scope', '$http', '$cookies', '$state', 'toastr', function ($scope, $http, $cookies, $state, toastr) {

    var urlBase = "http://localhost:64025/api/";

    var d = new Date().toLocaleString('en-US', { timeZone: 'Asia/Saigon' });

    $scope.user = $cookies.get('user');

    $scope.userInfo = $cookies.get('customerInfo');

    //$scope.userInfo = cus.LastName + " " + cus.FirstName;

    if ($scope.user === null || $scope.user === undefined) {
        $scope.isUser = false;
    } else {
        $scope.isUser = true;
    }

    $scope.logout = function () {
        $cookies.remove('user');
        $cookies.remove('customerInfo');
        $cookies.remove('theuser');
        $http.get(urlBase + 'Customers?username=' + $scope.user).success(function (customer) {
            var cusInfoToLogOut = {
                'CustomerID': customer.CustomerID,
                'Username': customer.Username,
                'Password': customer.Password,
                'LastName': customer.LastName,
                'FirstName': customer.FirstName,
                'Address': customer.Address,
                'BirthDate': customer.BirthDate,
                'RegDate': customer.RegDate,
                'Phone': customer.Phone,
                'PhotoPath': customer.PhotoPath,
                'PhotoTitle': customer.PhotoTitle,
                'Notes': customer.Notes,
                'IsLogIn': false,
                'LastLogIn': customer.LastLogIn,
                'LastLogOut': d
            };
            $http({
                method: 'PUT',
                url: urlBase + 'Customers/' + customer.CustomerID,
                data: cusInfoToLogOut
            }).success(function (res) {
                console.log('You have log out');
            }).error(function (err) {
                console.log(err);
            });
        }).error(function (err) {
            console.log(err);
        });       
        $state.go('home');
        toastr.success('Đăng xuất thành công', 'Thông báo');
        setTimeout(function () {
            location.reload();
        }, 1000);
    };

    $scope.profileUser = function () {
        $state.go('editUser');
    };

}]);