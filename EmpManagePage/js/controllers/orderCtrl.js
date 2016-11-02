/// <reference path="../libs/angular.js" />  angular.module('RDash') .controller('orderCtrl', ['$scope', '$http', 'OrderApi', 'DTOptionsBuilder', 'DTColumnBuilder', '$uibModal', '$log', '$document', 'toastr', '$filter', function ($scope, $http, OrderApi, DTOptionsBuilder, DTColumnBuilder, $uibModal, $log, $document, toastr, $filter) {
     // Test controller link to index     $scope.message = "Trang quản lý đơn đặt hàng";

    $scope.animationsEnabled = true;

    $scope.dtColumns = [
        DTColumnBuilder.newColumn("OrderID", "Mã"),
        DTColumnBuilder.newColumn("OrderDate", "Ngày đặt").renderWith(dateFormat),
        DTColumnBuilder.newColumn("Freight", "Phí vận").renderWith(currencyFormat),
        DTColumnBuilder.newColumn("Address", "Địa chỉ"),
        DTColumnBuilder.newColumn("Tax", "Thuế").renderWith(currencyFormat),
        DTColumnBuilder.newColumn("IsDeliveried", "Tình trạng").renderWith(checkOrder)
    ];

    function currencyFormat(data, type, full, meta) {
        return $filter('currency')(data, 'VND ', 0);
    };

    function dateFormat(data, type, full, meta) {
        return $filter('date')(data, 'dd/MM/yyyy @ h:mma');
    };

    function checkOrder(data, type, full, meta) {
        if (data == true) {
            return 'Đã giao';
        } else {
            return 'Chưa giao';
        }
    };

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('ajax', {
            url: 'http://localhost:64025/api/Orders',
            type: "GET"
        })
        .withOption('rowCallback', rowCallback)
        .withPaginationType('full_numbers')
        .withDisplayLength(10);
     function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        $('td', nRow).unbind('click');
        $('td', nRow).bind('click', function () {
            $scope.$apply(function (size, parentSelector) {

                OrderApi.setOrderApi(aData);

                var parentElem = parentSelector ? angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'templates/modal/orderModal/orderCrudModal.html',
                    controller: 'orderCrudModalCtrl',
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
 }]);