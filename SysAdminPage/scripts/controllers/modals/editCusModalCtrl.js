/// <reference path="../../libs/angular.js" />  angular.module('app') .controller('editCusModalCtrl', ['$scope', '$uibModalInstance', 'CusApi', '$state', 'toastr', function ($scope, $uibModalInstance, CusApi, $state, toastr) {
     $scope.selectedItem = "Chọn khách hàng...";
    $scope.isDeleteItemVisible = false;      //Cancel dialog     $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
        $state.reload();
    };      // Call function to get list Employees     getCustomers();     function getCustomers() {
        CusApi.getCustomers().success(function (ctms) {
            $scope.ctms = ctms;
        })         .error(function (error) {
            $scope.status = "Unable to load ctms data" + error.message;
        });
    };      // Show dropdown box     $scope.dropboxitemselected = function (item) {
        $scope.isDeleteItemVisible = true;
        $scope.selectedItem = item.CustomerID;
        $scope.FirstName = item.FirstName;
        $scope.LastName = item.LastName;
        $scope.BirthDate = item.BirthDate;
        $scope.RegDate = item.RegDate;
        $scope.Address = item.Address;
        $scope.Phone = item.Phone;
        $scope.Notes = item.Notes;
        $scope.Username = item.Username;
        $scope.Password = item.Password;
        $scope.CustomerID = item.CustomerID;

    };      // Edit an employee     $scope.EditCus = function () {
        var cusToUpdate = {
            'CustomerID': $scope.CustomerID,
            'FirstName': $scope.FirstName,
            'LastName': $scope.LastName,
            'BirthDate': $scope.BirthDate,
            'Address': $scope.Address,
            'Phone': $scope.Phone,
            'Notes': $scope.Notes,
            'Username': $scope.Username,
            'Password': $scope.Password,
        };

        if ($scope.FirstName == "" || $scope.FirstName == undefined) {
            toastr.warning('Tên không được để trống', 'Cảnh báo');
            angular.element('#FirstName').focus();
        } else if($scope.LastName == "" || $scope.LastName == undefined){
            toastr.warning('Họ đăng nhập không được để trống', 'Cảnh báo');
            angular.element('#LastName').focus();
        } else if($scope.BirthDate == "" || $scope.BirthDate == undefined){
            toastr.warning('Ngày sinh đăng nhập không được để trống', 'Cảnh báo');
            angular.element('#BirthDate').focus();
        } else if($scope.Address == "" || $scope.Address == undefined){
            toastr.warning('Địa chỉ đăng nhập không được để trống', 'Cảnh báo');
            angular.element('#Address').focus();
        } else if ($scope.Phone == "" || $scope.Phone == undefined) {
            toastr.warning('Điện thoại đăng nhập không được để trống', 'Cảnh báo');
            angular.element('#Phone').focus();
        } else {
            CusApi.editCustomer(cusToUpdate)
            .success(function (res) {
                toastr.success('thành công', 'Lưu thông tin');
                $scope.isDeleteItemVisible = false;
                $scope.selectedItem = "Chọn khách hàng...";
                $scope.FirstName = undefined;
                $scope.LastName = undefined;
                $scope.BirthDate = undefined;
                $scope.Address = undefined;
                $scope.EmployeeID = undefined;
                $scope.Phone = undefined;
                $scope.Notes = undefined;
                $scope.Username = undefined;
                $scope.Password = undefined;
                getCustomers();
                $state.reload();
            })
            .error(function (error) {
                toastr.error('Lưu dữ liệu thất bại', 'Lỗi');
            });
        }
        
    };
 }]);