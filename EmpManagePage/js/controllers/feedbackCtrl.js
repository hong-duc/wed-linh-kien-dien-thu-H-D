/// <reference path="../libs/angular.js" />  angular.module('RDash') .controller('feedbackCtrl', ['$scope', '$http', 'FeeApi', 'DTOptionsBuilder', 'DTColumnBuilder', '$uibModal', '$log', '$document', 'toastr', function ($scope, $http, FeeApi, DTOptionsBuilder, DTColumnBuilder, $uibModal, $log, $document, toastr) {
     // Test controller link to index     $scope.message = "Trang nhận thông tin phản hồi từ khách hàng";

    $scope.animationsEnabled = true;

    $scope.dtColumns = [
        DTColumnBuilder.newColumn("LastName", "Họ"),
        DTColumnBuilder.newColumn("FistName", "Tên"),
        DTColumnBuilder.newColumn("Phone", "Điện thoại"),
        DTColumnBuilder.newColumn("Email", "Email"),
        DTColumnBuilder.newColumn("Title", "Chủ đề")
    ];

    $scope.dtOptions = DTOptionsBuilder.newOptions()
        .withOption('ajax', {
            url: 'http://localhost:64025/api/Feedbacks',
            type: "GET"
        })
        .withOption('rowCallback', rowCallback)
        .withPaginationType('full_numbers')
        .withDisplayLength(10);
     function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        $('td', nRow).unbind('click');
        $('td', nRow).bind('click', function () {
            $scope.$apply(function (size, parentSelector) {

                FeeApi.setFeeApi(aData);

                var parentElem = parentSelector ? angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'templates/modal/feedbackModal/feedbackCrudModal.html',
                    controller: 'feedbackCrudModalCtrl',
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