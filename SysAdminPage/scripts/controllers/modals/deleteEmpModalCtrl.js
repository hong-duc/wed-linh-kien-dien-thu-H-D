/// <reference path="../../libs/angular.js" />  angular.module('app') .controller('deleteEmpModalCtrl', ['$scope', '$uibModalInstance', 'EmpApi', '$state', 'toastr', function ($scope, $uibModalInstance, EmpApi, $state, toastr) {      $scope.selectedItem = "Chọn nhân viên...";
    $scope.isDeleteItemVisible = false;      // Cancel dialog     $scope.cancel = function () {
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
        $scope.selectedItem = item.FirstName;
        $scope.FirstName = item.FirstName;
        $scope.LastName = item.LastName;
        $scope.BirthDate = item.BirthDate;
        $scope.Address = item.Address;
        $scope.EmployeeID = item.EmployeeID;
    };

    // Delete an employee     $scope.DeleteEmp = function () {
        var empToDelete = {
            'EmployeeID': $scope.EmployeeID
        };

        EmpApi.deteleEmployee(empToDelete)
        .success(function (res) {
            toastr.success("Xóa nhân viên thành công");
            $scope.LastName = undefined;             $scope.FirstName = undefined;             $scope.BirthDate = undefined;             $scope.Address = undefined;
            $scope.selectedItem = "Chọn nhân viên...";
            $scope.isDeleteItemVisible = false;
            getEmployees();
        })
        .error(function (error) {
            toastr.warning('Không thể xóa nhân viên này!', 'Lỗi');
        });
    };
 }]);