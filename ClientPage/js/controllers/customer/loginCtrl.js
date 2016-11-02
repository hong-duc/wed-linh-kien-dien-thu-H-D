/// <reference path="../../libs/angular.js" />

angular.module("app").controller('loginCtrl', ['$scope', '$http', '$cookies', '$state', 'toastr', function ($scope, $http, $cookies, $state, toasrt) {

    var urlBase = "http://localhost:64025/api/";

    var d = new Date().toLocaleString('en-US', { timeZone: 'Asia/Saigon' });

    $scope.cusLogin = {
        Username: "",
        Password: ""
    };

    // login
    $scope.login = function () {

        if ($scope.cusLogin.Username == "" || $scope.cusLogin.Username == undefined) {
            toasrt.warning("Tên đăng nhập không được để trống", "Cảnh báo");
            angular.element("#UsernameLogin").focus();
        } else if ($scope.cusLogin.Password == "" || $scope.cusLogin.Password == undefined) {
            toasrt.warning("Mật khẩu không được để trống", "Cảnh báo");
            angular.element("#PasswordLogin").focus();
        } else {
            $http.get(urlBase + "Customers?username=" + $scope.cusLogin.Username).success(function (customer) {
                if (customer.IsLogIn == false) {
                    if (customer.Password == $scope.cusLogin.Password) {
                        var today = new Date();
                        toasrt.success("Đăng nhập thành công", "Thông báo");
                        toasrt.info("Xin chào " + customer.LastName + " " + customer.FirstName);
                        $cookies.put('customerInfo', (customer.LastName + " " + customer.FirstName));
                        $cookies.put("user", customer.Username);
                        // thêm để lấy nhìu thông tin thêm, sửa lại cái cookie user khi ghép vào
                        sessionStorage.setItem('theuser', JSON.stringify(customer));
                        var cusInfoToLogin = {
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
                            'IsLogIn': true,
                            'LastLogIn': d,
                            'LastLogOut': customer.LastLogOut
                        };
                        $http({
                            method: 'PUT',
                            url: urlBase + 'Customers/' + customer.CustomerID,
                            data: cusInfoToLogin
                        }).success(function (res) {
                            console.log('You have logged');
                        }).error(function (err) {
                            console.log(err);
                        });
                        $state.go('home');
                        setTimeout(function () {
                            location.reload();
                        }, 1000);
                    } else {
                        toasrt.error("Mật khẩu điền vào không chính xác");
                        $cookies.remove("user");
                        $state.go('login');
                    }
                } else {
                    toasrt.error("Tài khoản này hiện đang được sử dụng");
                    toasrt.info("Bạn có thể đăng kí miền phí để có tài khoản sử dụng", "Gợi ý");
                    $cookies.remove("user");
                    $state.go('login');
                }
            }).error(function (err) {
                toasrt.error("Không thể truy vấn được tài khoản này", "Lỗi");
                toasrt.warning("Tài khoản hoặc mật khẩu nhập vào không hợp lệ", "Cảnh báo");
                console.log(err);
            });
        }

    };

}]);
