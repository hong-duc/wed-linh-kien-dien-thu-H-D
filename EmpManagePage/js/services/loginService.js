/// <reference path="D:\LapTrinhWeb\CoreProject\Project4\EmpManagePage\components/angular/angular.js" />

var loginService = angular.module('loginService', []);

loginService.factory('LoginApi', ['$http', function ($http) {

    var LoginApi = {};

    // Contructor
    return {
        // Get
        getLoginApi: function () {
            return LoginApi;
        },

        // Set
        setLoginApi: function (value) {
            LoginApi = value;
        }
    }
}]);