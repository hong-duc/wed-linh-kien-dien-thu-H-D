angular.module('RDash')
.controller('loginCtrl', ['$scope', '$http', '$state', '$location', 'ngDialog', 'toastr', function ($scope, $http, $state, $location, ngDialog, toastr) {

    var urlBase = "http://localhost:64025/api/";

    var count = 1;

    ngDialog.open({
        preCloseCallback: function (value) {
            var nestedConfirmDialog = ngDialog.openConfirm({
                template: '\
                <p>Bạn có chắc muốn thoát khỏi trang này không?</p>\
                <div class="ngdialog-buttons">\
                    <button type="button" class="ngdialog-button ngdialog-button-secondary" ng-click="closeThisDialog(0)">Không</button>\
                    <button type="button" class="ngdialog-button ngdialog-button-primary" ng-click="confirm(1)">Có</button>\
                </div>',
                plain: true
            }).then(function (success) {
                // Success logic here
                window.location.href = 'http://localhost:51263/templates/shared/_error.html';
            }, function (error) {
                // Error logic here
                toastr.warning("cảnh báo truy cập lần " + count, "Cảnh báo");
                count++;
                if (count == 5) {
                    window.location.href = 'http://localhost:51263/templates/shared/_error.html';
                    count = 0;
                }
                nestedConfirmDialog();

            });

            // NOTE: return the promise from openConfirm
            return nestedConfirmDialog;
        },
        template: 'templates/login/loginPage.html',
        controller: 'login'
    });

}]);

angular.module('RDash')
.controller('login', ['$scope', '$http', '$state', '$location', '$cookies', 'ngDialog', 'toastr', 'LoginApi', function ($scope, $http, $state, $location, $cookies, ngDialog, toastr, LoginApi) {

    var urlBase = "http://localhost:64025/api/";

    $scope.login = function () {

        if ($scope.Username == "" || $scope.Username == undefined) {
            toastr.warning('Tên đăng nhập không được để trống', 'Cảnh báo');
            angular.element('#Username').focus();
        } else if ($scope.Password == "" || $scope.Password == undefined) {
            toastr.warning('Mật khẩu không được để trống', 'Cảnh báo');
            angular.element('#Password').focus();
        } else {
            $http.get(urlBase + "Employees?username=" + $scope.Username).success(function (emp) {
                if (emp.Password == $scope.Password) {
                    if (emp.IsLogIn == false) {
                        toastr.success("Đăng nhập thành công", "Thông báo");
                        toastr.info("Vui lòng đợi trong giây lát");
                        $state.go('products');
                        setTimeout(function () {
                            location.reload();
                        }, 1000);
                        toastr.info("Chào mừng: " + emp.LastName + " " + emp.FirstName);
                        $cookies.putObject('objEmp', emp);
                        $cookies.put('keyUsername', emp.Username);
                    } else {
                        toastr.error("Tài khoản này hiện đang được sử dụng");
                        $state.go('login');
                        setTimeout(function () {
                            location.reload();
                        }, 1000);
                    }
                }
            }).error(function (err) {
                toastr.error("Không thể truy xuất tài khoản này");
                $state.go('login');
                setTimeout(function () {
                    location.reload();
                }, 1000);
            });
        }
    };

}]);
