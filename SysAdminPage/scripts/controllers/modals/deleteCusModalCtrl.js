/// <reference path="../../libs/angular.js" />  angular.module('app') .controller('deleteCusModalCtrl', ['$scope', '$uibModalInstance', 'CusApi', '$state', 'toastr', function ($scope, $uibModalInstance, CusApi, $state, toastr) {
     $scope.selectedItem = "Chọn khách hàng...";
    $scope.isDeleteItemVisible = false;      // Cancel dialog     $scope.cancel = function () {
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
        $scope.Username = item.Username;
        $scope.BirthDate = item.BirthDate;
        $scope.Address = item.Address;
        $scope.CustomerID = item.CustomerID;
    };

    // Delete an customer     $scope.DeleteCus = function () {
        var cusToDelete = {
            'CustomerID': $scope.CustomerID
        };

        CusApi.deteleCustomer(cusToDelete)
        .success(function (res) {
            toastr.success("Xóa khách hàng thành công");
            $scope.LastName = undefined;             $scope.FirstName = undefined;             $scope.BirthDate = undefined;             $scope.Username = undefined;             $scope.Address = undefined;
            $scope.selectedItem = "Chọn khách hàng...";
            $scope.isDeleteItemVisible = false;
            getCustomers();
        })
        .error(function (error) {
            toastr.warning('Không thể xóa khách hàng này!', 'Lỗi');
        });
    };
 }]);