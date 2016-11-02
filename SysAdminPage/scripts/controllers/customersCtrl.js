/// <reference path="../libs/angular.js" />  angular.module('app') .controller('customersCtrl', ['$scope', 'CusApi', '$uibModal', '$log', '$state', function ($scope, CusApi, $uibModal, $log, $state) {      // Test controller link to index     $scope.message = "This is customers page";      // Call function to get list Customers     getCustomers();     function getCustomers() {
        CusApi.getCustomers().success(function (ctms) {
            $scope.ctms = ctms;
        })         .error(function (error) {
            $scope.status = "Unable to load ctms data" + error.message;
        });
    };      // Enable animation     $scope.animationsEnabled = true;      // Open a dialog to delete customer     $scope.openCusToDelete = function (size) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,             ariaLabelledBy: 'modal-title',             ariaDescribedBy: 'modal-body',             templateUrl: 'views/modals/deleteCusModal.html',             controller: 'deleteCusModalCtrl',             size: size
        });          modalInstance.result.then(function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };      // Open a dialog to edit customer     $scope.openCusToEdit = function (size) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,             ariaLabelledBy: 'modal-title',             ariaDescribedBy: 'modal-body',             templateUrl: 'views/modals/editCusModal.html',             controller: 'editCusModalCtrl',             size: size
        });          modalInstance.result.then(function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
        $state.reload();
    };
 }]);