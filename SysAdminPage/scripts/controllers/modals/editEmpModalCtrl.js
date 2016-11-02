/// <reference path="../../libs/angular.js" />  angular.module('app') .controller('editEmpModalCtrl', ['$scope', '$uibModalInstance', 'EmpApi', '$state', 'toastr',
    function ($scope, $uibModalInstance, EmpApi, $state, toastr) {
     $scope.selectedItem = "Chọn nhân viên...";
    $scope.isDeleteItemVisible = false;      //Cancel dialog     $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
        $state.reload();
    };      // Call function to get list Employees     getEmployees();     function getEmployees() {
        EmpApi.getEmployees().success(function (emps) {
            $scope.emps = emps;
        })         .error(function (error) {
            $scope.status = "Unable to load emps data" + error.message;
        });
    };      // Show dropdown box     $scope.dropboxitemselected = function (item) {
        $scope.isDeleteItemVisible = true;
        $scope.selectedItem = item.EmployeeID;
        $scope.Username = item.Username;
        $scope.Password = item.Password;
        $scope.FirstName = item.FirstName;
        $scope.LastName = item.LastName;
        $scope.BirthDate = item.BirthDate;
        $scope.HireDate = item.HireDate;
        $scope.Address = item.Address;
        $scope.Email = item.Email;
        $scope.Phone = item.Phone;
        $scope.PhotoPath = item.PhotoPath;
        $scope.PhotoTitle = item.PhotoTitle;
        $scope.Notes = item.Notes;
        $scope.EmployeeID = item.EmployeeID;

    };      // Edit an employee     $scope.EditEmp = function () {
        var empToUpdate = {
            'Username': $scope.Username,
            'Password': $scope.Password,
            'FirstName': $scope.FirstName,
            'LastName': $scope.LastName,
            'BirthDate': $scope.BirthDate,
            'HireDate': $scope.HireDate,
            'Address': $scope.Address,
            'Email': $scope.Email,
            'Phone': $scope.Phone,
            'PhotoPath': $scope.PhotoPath,
            'Notes': $scope.Notes,
            'EmployeeID': $scope.EmployeeID
        };

        var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if ($scope.Username == "" || $scope.Username == undefined) {
            toastr.warning('Tên đăng nhập không được để trống', 'Cảnh báo');
            angular.element('#Username').focus();
        } else if ($scope.Password == "" || $scope.Password == undefined) {
            toastr.warning(' không được để trống', 'Cảnh báo');
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
            toastr.warning(' không được để trống', 'Cảnh báo');
            angular.element('#Address').focus();
        } else if (!mailformat.test($scope.Email)) {
            toastr.warning('Email không hợp lệ', 'Cảnh báo');
            angular.element('#Email').focus();
        } else if ($scope.Phone == "" || $scope.Phone == undefined) {
            toastr.warning('Điện thoại không được để trống', 'Cảnh báo');
            angular.element('#Phone').focus();
        } else {
            EmpApi.editEmployee(empToUpdate)
            .success(function (res) {
                toastr.success('thành công', 'Lưu thông tin');
                $scope.isDeleteItemVisible = false;
                $scope.selectedItem = "Chọn nhân viên...";
                $scope.Username = undefined;
                $scope.Password = undefined;
                $scope.FirstName = undefined;
                $scope.LastName = undefined;
                $scope.BirthDate = undefined;
                $scope.Address = undefined;
                $scope.Email = undefined;
                $scope.Phone = undefined;
                $scope.PhotoPath = undefined;
                $scope.Notes = undefined;
                $scope.EmployeeID = undefined;
                getEmployees();
                $state.reload();
            })
            .error(function (error) {
                toastr.error('Lưu dữ liệu thất bại', 'Lỗi');
            });
        }
    };
 }]);