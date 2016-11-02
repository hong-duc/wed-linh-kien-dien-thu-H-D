/// <reference path="D:\LapTrinhWeb\CoreProject\Project4\EmpManagePage\components/angular/angular.js" />

angular.module('RDash') .controller('addSupModalCtrl', ['$scope', '$uibModalInstance', 'SupApi', '$state', 'toastr', '$http', function ($scope, $uibModalInstance, SupApi, $state, toastr, $http) {      var urlBase = "http://localhost:64025/api/";      // Cancel modal     $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');         $state.reload();
    };      // Add an supplier     $scope.addSup = function () {
        var supToAdd = {
            'CompanyName': $scope.CompanyName,             'Address': $scope.Address,
            'Phone': $scope.Phone,
            'HomePage': $scope.HomePage
        };          $http.get(urlBase + "Suppliers").success(function (sups) {
            $scope.sups = sups;
            angular.forEach($scope.sups, function (value) {
                if ($scope.CompanyName == value.CompanyName) {
                    toastr.warning('Đã tồn tại tên công ty này, hãy nhập tên nhà cung cấp khác', 'Cảnh báo');
                    angular.element('#CompanyName').focus();
                }
            });
        }).error(function (error) {
                $scope.status = "Unable to load sups data" + error.message;
        });                if ($scope.CompanyName == "" || $scope.CompanyName == undefined) {
            toastr.warning('Tên nhà cung cấp không được để trống', 'Cảnh báo');
            angular.element('#CompanyName').focus();
        } else if ($scope.Address == "" || $scope.Address == undefined) {
            toastr.warning('Địa chỉ không được để trống', 'Cảnh báo');
            angular.element('#Address').focus();
        } else {

            $http.post(urlBase + "Suppliers/", supToAdd).success(function (res) {
                toastr.success('Thêm mới thành công!', 'Thông báo');                 $scope.CompanyName = undefined;                 $scope.Address = undefined;                 $scope.Phone = undefined;                 $scope.HomePage = undefined;                 $uibModalInstance.dismiss('cancel');                 $state.reload();
            })             .error(function (res) {
                toastr.error('Lưu dữ liệu thất bại', 'Lỗi');
            });
        }
    };
 }]);