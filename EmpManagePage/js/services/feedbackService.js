/// <reference path="D:\LapTrinhWeb\CoreProject\Project4\EmpManagePage\components/angular/angular.js" />

var FeedbacksService = angular.module('FeedbacksService', []);

FeedbacksService.factory('FeeApi', ['$http', function ($http) {

    var urlBase = "http://localhost:64025/api/";
    var FeeApi = {};

    // Contructor
    return {
        // Get
        getFeeApi: function () {
            return FeeApi;
        },

        // Set
        setFeeApi: function (value) {
            FeeApi = value;
        }
    }

    return FeeApi;

}]);