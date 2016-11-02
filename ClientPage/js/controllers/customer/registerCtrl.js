/// <reference path="../../libs/angular.js" />

angular.module("app").controller('registerCtrl', ['$scope', '$http', '$state', 'toastr', function ($scope, $http, $state, toastr) {

    var urlBase = "http://localhost:64025/api/";

    var d = new Date().toLocaleString('en-US', { timeZone: 'Asia/Saigon' });

    //Upload Files     var filePath = "noimagefound.jpg";      $scope.uploadFile = function (e) {
        filePath = e.files[0].name;
        e.upload();
        toastr.success("Upload ảnh thành công");
    };

    $scope.register = function () {
        var reg = {
            "Username": $scope.Username,
            "Password": $scope.Password,
            "LastName": $scope.LastName,
            "FirstName": $scope.FirstName,
            "BirthDate": $scope.BirthDate,
            "RegDate": d,
            "Address": $scope.Address,
            "Phone": $scope.Phone,
            "PhotoPath": "http://localhost:64025/FileUploads/" + filePath,
            "PhotoTitle": filePath,
            "Notes": "Khách hàng đã đăng ký tài khoản vào " + d,
            "IsLogIn": false
        };

        $http.get(urlBase + "Customers").success(function (customers) {
            $scope.customers = customers;
            for (var i = 0; i < customers.length; i++) {
                if (customers[i].Username == $scope.Username) {
                    toastr.error("Bạn cần nhập tên đăng nhập khác", "Cảnh báo");
                    $scope.Username = "";
                    break;
                }
            }
        }).error(function (err) {
            $scope.status = "Unable to load customers data" + err.message;
        });

        if ($scope.Username == "" || $scope.Username == undefined) {
            toastr.warning("Bạn cần nhập tên đăng nhập", "Cảnh báo");
            angular.element('#Username').focus();
        } else if ($scope.Password == "" || $scope.Password == undefined) {
            toastr.warning("Bạn cần nhập mật khẩu cho tài khoản", "Cảnh báo");
            angular.element('#Password').focus();
        } else if ($scope.LastName == "" || $scope.LastName == undefined) {
            toastr.warning("Nhập họ của bạn", "Cảnh báo");
            angular.element('#LastName').focus();
        } else if ($scope.FirstName == "" || $scope.FirstName == undefined) {
            toastr.warning("Nhập tên của bạn", "Cảnh báo");
            angular.element('#FirstName').focus();
        } else if ($scope.BirthDate == "" || $scope.BirthDate == undefined) {
            toastr.warning("Hãy nhập ngày sinh của bạn", "Cảnh báo");
            angular.element('#BirthDate').focus();
        } else if ($scope.Address == "" || $scope.Address == undefined) {
            toastr.warning("Hãy điền dịa chỉ liên hệ", "Cảnh báo");
            angular.element('#Address').focus();
        } else if ($scope.Phone == "" || $scope.Phone == undefined) {
            toastr.warning("Nhập số điện thoại của bạn", "Cảnh báo");
            angular.element('#Phone').focus();
        } else {
            $http.post(urlBase + "Customers/", reg).success(function (res) {
                toastr.success("Đăng ký thành công, bạn có thể đăng nhập để mua hàng", "Thông báo");
                $scope.Username = undefined;
                $scope.Password = undefined;
                $scope.LastName = undefined;
                $scope.FirstName = undefined;
                $scope.BirthDate = undefined;
                $scope.Address = undefined;
                $scope.Phone = undefined;
                $scope.PhotoPath = undefined;
                $state.reload();
            }).error(function (res) {
                toastr.error("Lỗi ghi nhận tài khoản", "Lỗi");
            });
        }       
    };
}]);
