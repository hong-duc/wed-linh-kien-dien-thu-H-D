/// <reference path="../libs/angular.js" />  angular.module('RDash') .controller('supplierCtrl', ['$scope', '$http', 'SupApi', 'DTOptionsBuilder', 'DTColumnBuilder', '$uibModal', '$log', '$document', 'toastr', function ($scope, $http, SupApi, DTOptionsBuilder, DTColumnBuilder, $uibModal, $log, $document, toastr) {
     // Test controller link to index     $scope.message = "Trang quản lý nhà cung cấp sản phẩm";

    $scope.animationsEnabled = true;

    $scope.dtColumns = [
        DTColumnBuilder.newColumn("SupplierID", "ID"),
        DTColumnBuilder.newColumn("CompanyName", "Công ty"),
        DTColumnBuilder.newColumn("Address", "Địa chỉ"),
        DTColumnBuilder.newColumn("Phone", "Điện thoại"),
        DTColumnBuilder.newColumn("HomePage", "Trang chủ")
    ];

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('ajax', {
            url: 'http://localhost:64025/api/Suppliers',
            type: "GET"
        })
        .withOption('rowCallback', rowCallback)
        .withPaginationType('full_numbers')
        .withDisplayLength(10);
     function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        $('td', nRow).unbind('click');
        $('td', nRow).bind('click', function () {
            $scope.$apply(function (size, parentSelector) {

                SupApi.setSupApi(aData);

                var parentElem = parentSelector ? angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'templates/modal/supplierModal/supplierCrudModal.html',
                    controller: 'supplierCrudModalCtrl',
                    size: size,
                    appendTo: parentElem
                });

                modalInstance.result.then(function (selectedItem) {
                    $scope.selected = selectedItem;
                }, function () {
                    $log.info('Modal dismissed at: ' + new Date());
                });
            });
        });
        return nRow;
    };

    // Open to add new supplier
    $scope.openToAddSup = function (size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'templates/modal/supplierModal/addSupModal.html',
            controller: 'addSupModalCtrl',
            size: size,
            appendTo: parentElem
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };  }]);