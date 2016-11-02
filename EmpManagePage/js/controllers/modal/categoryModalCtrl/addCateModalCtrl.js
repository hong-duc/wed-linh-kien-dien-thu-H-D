/// <reference path="D:\LapTrinhWeb\CoreProject\Project4\EmpManagePage\components/angular/angular.js" />

angular.module('RDash') .controller('addCateModalCtrl', ['$scope', '$uibModalInstance', 'CateApi', '$state', 'toastr', function ($scope, $uibModalInstance, CateApi, $state, toastr) {      // Cancel modal     $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');         $state.reload();
    };      // Add an category     $scope.addCate = function () {
        var cateToAdd = {
            //'CategoryID': $scope.CategoryID,             'CategoryName': $scope.CategoryName,             'Description': $scope.Description
        };           // Call function to get list Categories         getCategories();         function getCategories() {
            CateApi.getCategories().success(function (cates) {
                $scope.cates = cates;

                angular.forEach($scope.cates, function (value) {
                    if ($scope.CategoryName == value.CategoryName) {
                        toastr.warning('Đã tồn tại loại này, mời nhập tên khác', 'Cảnh báo');
                        angular.element('#CategoryName').focus();
                    }
                });

            })             .error(function (error) {
                $scope.status = "Unable to load cates data" + error.message;
            });
        };          if ($scope.CategoryName == "" || $scope.CategoryName == undefined) {
            toastr.warning('Tên loại không được để trống', 'Cảnh báo');
            angular.element('#CategoryName').focus();
        } else if ($scope.Description == "" || $scope.Description == undefined) {
            toastr.warning('Nhập mô tả loại sản phẩm', 'Cảnh báo');
            angular.element('#Description').focus();
        } else {
            CateApi.addCategory(cateToAdd).success(function (res) {
                toastr.success('Thêm mới thành công!', 'Thông báo');                 $scope.CategoryName = undefined;                 $scope.Description = undefined;                 $uibModalInstance.dismiss('cancel');                 $state.reload();
            })             .error(function (res) {
                toastr.error('Lưu dữ liệu thất bại', 'Lỗi');
            });
        }
    };
 }]);