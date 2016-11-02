/// <reference path="D:\LapTrinhWeb\CoreProject\Project4\EmpManagePage\components/angular/angular.js" />

angular.module('RDash') .controller('productCrudModalCtrl', ['$scope', '$http', '$state', '$filter', '$uibModalInstance', 'toastr', 'ProdApi', function ($scope, $http, $state, $filter, $uibModalInstance, toastr, ProdApi) {

    var urlBase = "http://localhost:64025/api/";

    // Get product item
    var prod = ProdApi.getProdApi();

    $scope.ProductID = prod.ProductID;
    $scope.ProductName = prod.ProductName;
    $scope.Storage = prod.Storage;
    $scope.UnitPrice = prod.UnitPrice;
    $scope.Description = prod.Description;
    $scope.PhotoPath = prod.PhotoPath;
    $scope.PhotoTitle = prod.PhotoTitle;
    $scope.UpdateDate = prod.UpdateDate;
    $scope.IsDiscount = prod.IsDiscount;
    $scope.Warranty = prod.Warranty;
    $scope.Capacity = prod.Capacity;
    $scope.ConnectPort = prod.ConnectPort;
    $scope.WriteSpeed = prod.WriteSpeed;
    $scope.ReadSpeed = prod.ReadSpeed;
    $scope.SupportOS = prod.SupportOS;
    $scope.SupplierID = prod.SupplierID;
    $scope.CategoryID = prod.CategoryID;

    $scope.CategoryName = prod.Category.CategoryName;

    // Cancel modal     $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');         $state.reload();
    };      // Get date Asia Standard Time     var d = new Date();      //Upload Files     var filePath = $scope.PhotoTitle;      $scope.uploadFile = function (e) {
        filePath = e.files[0].name;
        e.upload();
        toastr.success("Upload ảnh thành công");
    };

    // Get list category dropdown     $http.get(urlBase + "Categories").success(function (cates) {
        $scope.cates = cates;
    }).error(function (error) {
        $scope.status = "Unable to load prods data" + error.message;
    });
     // Get list suppliers dropdown     $http.get(urlBase + "Suppliers").success(function (supps) {
        $scope.supps = supps;
    }).error(function (error) {
        $scope.status = "Unable to load prods data" + error.message;
    });

    $scope.editProd = function () {
        var prodToEdit = {
            'ProductID': $scope.ProductID,
            'ProductName': $scope.ProductName,             'Storage': $scope.Storage,
            'UnitPrice': $scope.UnitPrice,
            'Description': $scope.Description,
            'PhotoPath': "http://localhost:64025/FileUploads/" + filePath,
            'PhotoTitle': filePath,
            'UpdateDate': d,
            'IsDiscount': $scope.IsDiscount,
            'Warranty': $scope.Warranty,
            'Capacity': $scope.Capacity,
            'ConnectPort': $scope.ConnectPort,
            'WriteSpeed': $scope.WriteSpeed,
            'ReadSpeed': $scope.ReadSpeed,
            'SupportOS': $scope.SupportOS,
            'SupplierID': $scope.SupplierID,
            'CategoryID': $scope.CategoryID
        };

        $http.get(urlBase + "Products").success(function (prods) {
            $scope.prods = prods;
            //angular.forEach($scope.prods, function (value) {
            //    if ($scope.ProductName == value.ProductName) {
            //        toastr.warning('Đã tồn tại tên này, mời nhập tên khác', 'Cảnh báo');
            //        angular.element('#ProductName').focus();
            //    }
            //});

        }).error(function (error) {
            $scope.status = "Unable to load prods data" + error.message;
        });

        if ($scope.ProductName == "" || $scope.ProductName == undefined) {
            toastr.warning('Tên sản phẩm không được để trống', 'Cảnh báo');
            angular.element('#ProductName').focus();
        } else if ($scope.SupplierID == "" || $scope.SupplierID == undefined) {
            toastr.warning('Hãy lựa chọn nhà cung cấp', 'Cảnh báo');
            angular.element('#SupplierID').focus();
        } else if ($scope.CategoryID == "" || $scope.CategoryID == undefined) {
            toastr.warning('Hãy lựa chọn loại sản phẩm', 'Cảnh báo');
            angular.element('#CategoryID').focus();
        } else if ($scope.Storage == "" || $scope.Storage == undefined) {
            toastr.warning('Chưa nhập số lượng', 'Cảnh báo');
            angular.element('#Storage').focus();
        } else if ($scope.UnitPrice == "" || $scope.UnitPrice == undefined) {
            toastr.warning('Nhập giả thành sản phẩm', 'Cảnh báo');
            angular.element('#UnitPrice').focus();
        } else if ($scope.Description == "" || $scope.Description == undefined) {
            toastr.warning('Nhập mô tả loại sản phẩm', 'Cảnh báo');
            angular.element('#Description').focus();
        } else if ($scope.Description == "" || $scope.Description == undefined) {
            toastr.warning('Nhập mô tả loại sản phẩm', 'Cảnh báo');
            angular.element('#Description').focus();
        } else if ($scope.Warranty == "" || $scope.Warranty == undefined) {
            toastr.warning('Bảo hành sản phẩm chưa nhập', 'Cảnh báo');
            angular.element('#Warranty').focus();
        } else if ($scope.Capacity == "" || $scope.Capacity == undefined) {
            toastr.warning('Chưa nhập dung lượng sản phẩm', 'Cảnh báo');
            angular.element('#Capacity').focus();
        } else if ($scope.ConnectPort == "" || $scope.ConnectPort == undefined) {
            toastr.warning('Chưa nhập cổng kết nối cho sản phẩm', 'Cảnh báo');
            angular.element('#ConnectPort').focus();
        } else if ($scope.SupportOS == "" || $scope.SupportOS == undefined) {
            toastr.warning('Chưa nhập hệ điều hành hỗ trợ', 'Cảnh báo');
            angular.element('#SupportOS').focus();
        } else {
            $http({
                method: 'PUT',
                url: urlBase + 'Products/' + $scope.ProductID,
                data: prodToEdit
            }).success(function (res) {
                toastr.success('Đã cập nhật sản phẩm này', 'Thông báo');
                $scope.cancel();
            }).error(function (res) {
                toastr.error('Đã có lỗi xảy ra khi cập nhật sản phẩm này', 'Lỗi');
            });
        }
    };

    // Delete a product
    $scope.deleteProd = function () {
        var prodToDelete = {
            "ProductID": prod.ProductID
        };

        // confirm dialog
        alertify.confirm("BẠN CÓ CHẮC MUỐN XÓA SẢN PHẨM NÀY?", function (e) {
            if (e) {
                $http({
                    method: 'DELETE',
                    url: urlBase + 'Products/' + prodToDelete.ProductID
                }).success(function (res) {
                    toastr.success("Xóa thành công sản phẩm này", "Thông báo");
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