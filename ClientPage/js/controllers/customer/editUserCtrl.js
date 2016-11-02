/// <reference path="../../libs/angular.js" />

angular.module("app").controller('editUserCtrl', ['$scope', '$http', '$cookies', '$state', 'toastr', function ($scope, $http, $cookies, $state, toastr) {


    var urlBase = "http://localhost:64025/api/";

    var d = new Date().toLocaleString('en-US', { timeZone: 'Asia/Saigon' });    

    var currentUser = $cookies.get('user');

    $http.get(urlBase + 'Customers?username=' + currentUser).success(function (data) {
        $scope.LastName = data.LastName;
        $scope.FirstName = data.FirstName;
        $scope.Address = data.Address;
        $scope.BirthDate = data.BirthDate;
        $scope.Phone = data.Phone;
        $scope.PhotoPath = data.PhotoPath;
        $scope.PhotoTitle = data.PhotoTitle;
    }).error(function (err) {
        console.log(err);
    });

    $scope.saveNewPassword = function () {
        $http.get(urlBase + 'Customers?username=' + currentUser).success(function (data) {
            if ($scope.password_old == "" || $scope.password_old == undefined) {
                toastr.warning('Bạn phải nhập mật khẩu cũ để đổi mật khẩu', 'Cảnh báo');
                angular.element('#password_old').focus();
            } else if ($scope.password_1 == "" || $scope.password_1 == undefined) {
                toastr.warning('Bạn phải nhập mật khẩu mới để đổi mật khẩu', 'Cảnh báo');
                angular.element('#password_1').focus();
            } else if ($scope.password_2 == "" || $scope.password_2 == undefined) {
                toastr.warning('Bạn phải xác nhận mật khẩu để đổi mật khẩu', 'Cảnh báo');
                angular.element('#password_2').focus();
            } else if ($scope.password_old !== data.Password) {
                toastr.error('Mật khẩu bạn nhập vào không chính xác', 'Vui lòng xác nhận lại');
                angular.element('#password_old').focus();
            } else if ($scope.password_1 !== $scope.password_2) {
                toastr.error('Mật khẩu không trùng khớp', 'Vui lòng xác nhận lại');
                angular.element('#password_2').focus();
            } else {

                var editUser = {
                    'CustomerID': data.CustomerID,
                    'Username': data.Username,
                    'Password': $scope.password_1,
                    'LastName': data.LastName,
                    'FirstName': data.FirstName,
                    'Address': data.Address,
                    'BirthDate': data.BirthDate,
                    'RegDate': data.RegDate,
                    'Phone': data.Phone,
                    'PhotoPath': data.PhotoPath,
                    'PhotoTitle': data.PhotoTitle,
                    'Notes': data.Notes,
                    'IsLogIn': data.IsLogIn,
                    'LastLogIn': data.LastLogIn,
                    'LastLogOut': data.LastLogOut
                };

                $http({
                    method: 'PUT',
                    url: urlBase + 'Customers/' + data.CustomerID,
                    data: editUser
                }).success(function (res) {
                    toastr.success('Đã lưu mật khẩu mới', 'Thông báo');
                    $scope.password_1 = undefined;
                    $scope.password_2 = undefined;
                    $state.reload();
                }).error(function (err) {
                    toastr.error('Không thể lưu mật khẩu', 'Lỗi');
                });
            }
        }).error(function (err) {
            toastr.error('không thể truy xuất khách hàng này', 'Lỗi');
        });
    };

    //Upload Files     var filePath = $scope.PhotoTitle;      console.log(filePath);      $scope.uploadFile = function (e) {
        filePath = e.files[0].name;
        e.upload();
        toastr.success("Cập nhật ảnh thành công");
    };

    $scope.saveEditUser = function () {
        $http.get(urlBase + 'Customers?username=' + currentUser).success(function (data) {
            if ($scope.LastName == "" || $scope.LastName == undefined) {
                toastr.warning('Họ không được để trống', 'Cảnh báo');
                angular.element('#LastName').focus();
            } else if ($scope.FirstName == "" || $scope.FirstName == undefined) {
                toastr.warning('Tên không được để trống', 'Cảnh báo');
                angular.element('#FirstName').focus();
            } else if ($scope.Address == "" || $scope.Address == undefined) {
                toastr.warning('Địa chỉ không được để trống', 'Cảnh báo');
                angular.element('#Address').focus();
            } else if ($scope.BirthDate == "" || $scope.BirthDate == undefined) {
                toastr.warning('Ngày sinh không được để trống', 'Cảnh báo');
                angular.element('#BirthDate').focus();
            } else if ($scope.Phone == "" || $scope.Phone == undefined) {
                toastr.warning('Điện thoại không được để trống', 'Cảnh báo');
                angular.element('#Phone').focus();
            } else {               

                var editUserInfo = {
                    'CustomerID': data.CustomerID,
                    'Username': data.Username,
                    'Password': data.Password,
                    'LastName': $scope.LastName,
                    'FirstName': $scope.FirstName,
                    'Address': $scope.Address,
                    'BirthDate': $scope.BirthDate,
                    'RegDate': data.RegDate,
                    'Phone': $scope.Phone,
                    'PhotoPath': "http://localhost:64025/FileUploads/" + filePath,
                    'PhotoTitle': filePath,
                    'Notes': data.Notes,
                    'IsLogIn': data.IsLogIn,
                    'LastLogIn': data.LastLogIn,
                    'LastLogOut': data.LastLogOut
                };
                $http({
                    method: 'PUT',
                    url: urlBase + 'Customers/' + data.CustomerID,
                    data: editUserInfo
                }).success(function (res) {
                    toastr.success('Đã lưu mật khẩu mới', 'Thông báo');
                    $state.reload();
                }).error(function (err) {
                    toastr.error('Không thể lưu mật khẩu', 'Lỗi');
                });
            }
        }).error(function (err) {
            toastr.error('không thể truy xuất khách hàng này', 'Lỗi');
        });
    };

}]);