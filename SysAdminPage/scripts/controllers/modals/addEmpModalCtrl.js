/// <reference path="../../libs/angular.js" />  angular.module('app') .controller('addEmpModalCtrl', ['$scope', '$uibModalInstance', 'EmpApi', '$state', 'toastr', function ($scope, $uibModalInstance, EmpApi, $state, toastr) {      // Cancel modal     $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');         $state.reload();
    };      var d = new Date().toLocaleString('en-US', { timeZone: 'Asia/Saigon' });      //Upload Files     var filePath = null;      $scope.uploadFile = function (e) {
        filePath = e.files[0].name;
        e.upload();
        toastr.success("Upload ảnh thành công");
    };      // Add an employee     $scope.addEmp = function () {
        var empToAdd = {
            'Username': $scope.Username,             'Password': $scope.Password,             'LastName': $scope.LastName,             'FirstName': $scope.FirstName,             'BirthDate': $scope.BirthDate,             'Address': $scope.Address,             'Email': $scope.Email,             'Phone': $scope.Phone,             'PhotoPath': "http://localhost:64025/FileUploads/" + filePath,             'PhotoTitle': ($scope.LastName + " " + $scope.FirstName),              'Notes': $scope.Notes,             'HireDate': d,             'IsLogIn': false
        };          var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;          // Call function to get list Employees         getEmployees();         function getEmployees() {
            EmpApi.getEmployees().success(function (emps) {
                $scope.emps = emps;

                angular.forEach($scope.emps, function (value) {
                    if ($scope.Username == value.Username) {
                        toastr.warning('Tên đăng nhập đã tồn tại', 'Cảnh báo');
                        angular.element('#Username').focus();
                    }
                });

            })             .error(function (error) {
                $scope.status = "Unable to load emps data" + error.message;
            });
        };          if ($scope.Username == "" || $scope.Username == undefined) {
            toastr.warning('Tên đăng nhập không được để trống', 'Cảnh báo');
            angular.element('#Username').focus();
        } else if ($scope.Password == "" || $scope.Password == undefined) {
            toastr.warning('Mật khẩu không được để trống', 'Cảnh báo');
            angular.element('#Password').focus();
        } else if ($scope.LastName == "" || $scope.LastName == undefined) {
            toastr.warning('Họ không được để trống', 'Cảnh báo');
            angular.element('#LastName').focus();
        } else if ($scope.FirstName == "" || $scope.FirstName == undefined) {
            toastr.warning('Tên không được để trống', 'Cảnh báo');
            angular.element('#FirstName').focus();
        } else if ($scope.BirthDate == "" || $scope.BirthDate == undefined) {
            toastr.warning('Ngày sinh không được để trống', 'Cảnh báo');
            angular.element('#BirthDate').focus();
        } else if ($scope.Address == "" || $scope.Address == undefined) {
            toastr.warning('Địa chỉ không được để trống', 'Cảnh báo');
            angular.element('#Address').focus();
        } else if (!mailformat.test($scope.Email)) {
            toastr.warning('Email không hợp lệ', 'Cảnh báo');
            angular.element('#Email').focus();
        } else if ($scope.Phone == "" || $scope.Phone == undefined) {
            toastr.warning('Số điện thoại không được để trống', 'Cảnh báo');
            angular.element('#Phone').focus();
        } else {
            EmpApi.addEmployee(empToAdd).success(function (res) {
                toastr.success('Đã thêm nhân viên mới!', 'Thông báo thành công');                 $scope.Username = undefined;                 $scope.Password = undefined;                 $scope.LastName = undefined;                 $scope.FirstName = undefined;                 $scope.BirthDate = undefined;                 $scope.Address = undefined;                 $scope.Email = undefined;                 $scope.Phone = undefined;                 $scope.PhotoPath = undefined;                 $scope.Notes = undefined;                 $scope.file.name = undefined;                 $uibModalInstance.dismiss('cancel');                 $state.reload();
            })             .error(function (res) {
                toastr.error('Lưu dữ liệu thất bại', 'Lỗi');
            });
        }
    };
 }]);