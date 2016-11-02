/// <reference path="../libs/angular.js" />  angular.module('RDash') .controller('productCtrl', ['$scope', '$http', '$rootScope', '$filter', 'DTOptionsBuilder', 'DTColumnBuilder', '$uibModal', '$log', '$document', 'toastr', 'ProdApi', function ($scope, $rootScope, $http, $filter, DTOptionsBuilder, DTColumnBuilder, $uibModal, $log, $document, toastr, ProdApi) {
     // Turn on animate modal bootstrap     $scope.animationsEnabled = true;      // Test controller link to index     $scope.message = "Trang quản lý sản phẩm";

    $scope.dtColumns = [
        DTColumnBuilder.newColumn("ProductID", "ID"),
        DTColumnBuilder.newColumn(null, "Ảnh").renderWith(imageHtml),
        DTColumnBuilder.newColumn("ProductName", "Tên sản phẩm"),
        DTColumnBuilder.newColumn("Storage", "Số lượng"),
        DTColumnBuilder.newColumn("UnitPrice", "Giá").renderWith(currencyFormat)
    ];

    function imageHtml(data, type, full, meta) {
        return '<img width="70px" height="48px" src="' + data.PhotoPath + '"' + 'alt="' + data.PhotoTitle + '"' + '/>';
    };

    function currencyFormat(data, type, full, meta) {
        return $filter('currency')(data, 'VND ', 0);
    };

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('ajax', {
            url: 'http://localhost:64025/api/Products',
            type: "GET"
        }).withOption('rowCallback', rowCallback).withPaginationType('full_numbers').withDisplayLength(10);
     function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        $('td', nRow).unbind('click');
        $('td', nRow).bind('click', function () {
            $scope.$apply(function (size, parentSelector) {

                ProdApi.setProdApi(aData);

                var parentElem = parentSelector ? angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'templates/modal/productModal/productCrudModal.html',
                    controller: 'productCrudModalCtrl',
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

    // Open to add new product
    $scope.openToAddProd = function (size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'templates/modal/productModal/addProdModal.html',
            controller: 'addProdModalCtrl',
            size: size,
            appendTo: parentElem
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };
 }]);