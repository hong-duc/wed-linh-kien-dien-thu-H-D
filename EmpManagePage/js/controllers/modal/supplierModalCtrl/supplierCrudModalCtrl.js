/// <reference path="D:\LapTrinhWeb\CoreProject\Project4\EmpManagePage\components/angular/angular.js" />

angular.module('RDash') .controller('supplierCrudModalCtrl', ['$scope', '$rootScope', '$http', '$uibModalInstance', 'SupApi', '$state', 'toastr', function ($scope, $rootScope, $http, $uibModalInstance, SupApi, $state, toastr) {

    var urlBase = "http://localhost:64025/api/";

    // Get supplier item
    var sup = SupApi.getSupApi();

    $scope.SupplierID = sup.SupplierID;
    $scope.CompanyName = sup.CompanyName;
    $scope.Address = sup.Address;
    $scope.Phone = sup.Phone;
    $scope.HomePage = sup.HomePage;

    // Cancel modal     $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');         $state.reload();
    };

    $scope.editSup = function () {

        var supToEdit = {
            "SupplierID": $scope.SupplierID,
            "CompanyName": $scope.CompanyName,
            "Address": $scope.Address,
            "Phone": $scope.Phone,
            "HomePage": $scope.HomePage
        };

        if ($scope.CompanyName == "" || $scope.CompanyName == undefined) {
            toastr.warning('Chưa nhập tên công ty', 'Cảnh báo');
            angular.element('#CompanyName').focus();
        } else if ($scope.Address == "" || $scope.Address == undefined) {
            toastr.warning('Chưa nhập địa chỉ', 'Cảnh báo');
            angular.element('#Address').focus();
        } else {
            $http({
                method: 'put',
                url: urlBase + 'Suppliers/' + $scope.SupplierID,
                data: supToEdit
            }).success(function (res) {
                toastr.success('Cập nhật nhà cung cấp này', 'Thông báo');
                $scope.cancel();
            }).error(function (res) {
                toastr.error('Đã có lỗi xảy ra khi cập nhật nhà cung cấp nhà này', 'Lỗi');
            });
        }
    };

    $scope.deleteSup = function () {
        var supToDelete = {
            "SupplierID": sup.SupplierID
        };

        // confirm dialog
        alertify.confirm("Bạn có chắc muốn xóa loại sản phẩm này?", function (e) {
            if (e) {
                $http({
                    method: 'delete',
                    url: urlBase + 'Suppliers/' + supToDelete.SupplierID
                }).success(function (res) {
                    toastr.success("Xóa thành công nhà cung cấp này", "Thông báo");
                    $scope.cancel();
                }).error(function (res) {
                    toastr.error('Đã có lỗi xảy ra khi xóa nhà cung cấp này', 'Lỗi');
                });
            } else {
                toastr.info('Đã hủy thao tác xóa', 'Thông báo');
            }
        });

    };
 }]);