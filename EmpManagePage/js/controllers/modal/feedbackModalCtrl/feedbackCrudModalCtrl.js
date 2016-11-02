/// <reference path="D:\LapTrinhWeb\CoreProject\Project4\EmpManagePage\components/angular/angular.js" />

angular.module('RDash') .controller('feedbackCrudModalCtrl', ['$scope', '$rootScope', '$http', '$uibModalInstance', 'FeeApi', '$state', 'toastr', function ($scope, $rootScope, $http, $uibModalInstance, FeeApi, $state, toastr) {

    var urlBase = "http://localhost:64025/api/";

    // Get supplier item
    var fee = FeeApi.getFeeApi();

    $scope.FeedbackID = fee.FeedbackID;
    $scope.LastName = fee.LastName;
    $scope.FistName = fee.FistName;
    $scope.Phone = fee.Phone;
    $scope.Email = fee.Email;
    $scope.Title = fee.Title;
    $scope.Message = fee.Message;

    // Cancel modal     $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');         $state.reload();
    };
 }]);