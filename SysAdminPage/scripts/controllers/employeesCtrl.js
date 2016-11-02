/// <reference path="../libs/angular.js" />  angular.module('app') .controller('employeesCtrl', ['$scope', 'EmpApi', '$uibModal', '$log', '$state', function ($scope, EmpApi, $uibModal, $log, $state) {      // Test controller link to index     $scope.message = "This is employees page";      // Call function to get list Employees     getEmployees();     function getEmployees() {
        EmpApi.getEmployees().success(function (emps) {
            $scope.emps = emps;
        })         .error(function (error) {
            $scope.status = "Unable to load emps data" + error.message;
        });
    };      // Enable animation     $scope.animationsEnabled = true;      // Open a dialog to add employee     $scope.openEmpToAdd = function (size) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,             ariaLabelledBy: 'modal-title',             ariaDescribedBy: 'modal-body',             templateUrl: 'views/modals/addEmpModal.html',             controller: 'addEmpModalCtrl',             size: size
        });          modalInstance.result.then(function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };      // Open a dialog to delete employee     $scope.openEmpToDelete = function (size) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,             ariaLabelledBy: 'modal-title',             ariaDescribedBy: 'modal-body',             templateUrl: 'views/modals/deleteEmpModal.html',             controller: 'deleteEmpModalCtrl',             size: size
        });          modalInstance.result.then(function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };      // Open a dialog to edit employee     // Open a dialog to delete employee     $scope.openEmpToEdit = function (size) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,             ariaLabelledBy: 'modal-title',             ariaDescribedBy: 'modal-body',             templateUrl: 'views/modals/editEmpModal.html',             controller: 'editEmpModalCtrl',             size: size
        });          modalInstance.result.then(function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };      $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
        $state.reload();
    };
 }]);