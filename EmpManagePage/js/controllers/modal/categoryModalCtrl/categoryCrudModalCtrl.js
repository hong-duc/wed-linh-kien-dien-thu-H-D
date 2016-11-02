/// <reference path="D:\LapTrinhWeb\CoreProject\Project4\EmpManagePage\components/angular/angular.js" />

angular.module('RDash') .controller('categoryCrudModalCtrl', ['$scope', '$rootScope', '$http', '$uibModalInstance', 'CateApi', '$state', 'toastr', function ($scope, $rootScope, $http, $uibModalInstance, CateApi, $state, toastr) {

    var urlBase = "http://localhost:64025/api/";

    // Get category item
    var cate = CateApi.getCateApi();

    $scope.CategoryID = cate.CategoryID;
    $scope.CategoryName = cate.CategoryName;
    $scope.Description = cate.Description;

    // Cancel modal     $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');         $state.reload();
    };

    $scope.editCate = function () {

        var cateToEdit = {
            "CategoryID": $scope.CategoryID,
            "CategoryName": $scope.CategoryName,
            "Description": $scope.Description
        };

        if ($scope.CategoryName == "" || $scope.CategoryName == undefined) {
            toastr.warning('Chưa nhập tên loại sản phẩm', 'Cảnh báo');
            angular.element('#CategoryName').focus();
        } else if ($scope.Description == "" || $scope.Description == undefined) {
            toastr.warning('Hãy nhập mô tả cho loại sản phẩm này', 'Cảnh báo');
            angular.element('#Description').focus();
        } else {
            $http({
                method: 'put',
                url: urlBase + 'Categories/' + $scope.CategoryID,
                data: cateToEdit
            }).success(function (res) {
                toastr.success('Cập nhật loại sản phẩm này', 'Thông báo');
                $scope.cancel();
            }).error(function (res) {
                toastr.error('Đã có lỗi xảy ra khi cập nhật sản phẩm này', 'Lỗi');
            });
        }
    };

    $scope.deleteCate = function () {
        var cateToDelete = {
            "CategoryID": cate.CategoryID
        };

        // confirm dialog
        alertify.confirm("Bạn có chắc muốn xóa loại sản phẩm này?", function (e) {
            if (e) {
                $http({
                    method: 'delete',
                    url: urlBase + 'Categories/' + cateToDelete.CategoryID
                }).success(function (res) {
                    toastr.success("Xóa thành công loại sản phẩm này", "Thông báo");
                    $scope.cancel();
                }).error(function (res) {
                    toastr.error('Đã có lỗi xảy ra khi xóa sản phẩm này', 'Lỗi');
                });
            } else {
                toastr.warning('Đã hủy thao tác xóa', 'Thông báo');
            }
        });

    };
 }]);