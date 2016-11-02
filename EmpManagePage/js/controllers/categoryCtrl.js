angular.module('RDash') .controller('categoryCtrl', ['$scope', '$http', '$rootScope', 'DTOptionsBuilder', 'DTColumnBuilder', '$uibModal', '$log', '$document', 'toastr', 'CateApi', function ($scope, $rootScope, $http, DTOptionsBuilder, DTColumnBuilder, $uibModal, $log, $document, toastr, CateApi) {
     // Turn on animate modal bootstrap     $scope.animationsEnabled = true;      // Test controller link to index     $scope.message = "Trang quản lý loại sản phẩm";

    $scope.dtColumns = [
        DTColumnBuilder.newColumn("CategoryID", "ID"),
        DTColumnBuilder.newColumn("CategoryName", "Tên"),
        DTColumnBuilder.newColumn("Description", "Mô tả")
    ];

    $scope.dtOptions = DTOptionsBuilder.newOptions().withOption('ajax', {
        url: 'http://localhost:64025/api/Categories',
        type: "GET"
    }).withOption('rowCallback',rowCallback).withPaginationType('full_numbers').withDisplayLength(10);

    function rowCallback(nRow, aData, iDisplayIndex, iDisplayIndexFull) {
        $('td', nRow).unbind('click');
        $('td', nRow).bind('click', function () {
            $scope.$apply(function (size, parentSelector) {

                CateApi.setCateApi(aData);

                var parentElem = parentSelector ? angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
                var modalInstance = $uibModal.open({
                    animation: $scope.animationsEnabled,
                    ariaLabelledBy: 'modal-title',
                    ariaDescribedBy: 'modal-body',
                    templateUrl: 'templates/modal/categoryModal/categoryCrudModal.html',
                    controller: 'categoryCrudModalCtrl',
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

    // Open to add new category
    $scope.openToAddCate = function (size, parentSelector) {
        var parentElem = parentSelector ?
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'templates/modal/categoryModal/addCateModal.html',
            controller: 'addCateModalCtrl',
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