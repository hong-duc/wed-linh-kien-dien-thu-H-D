/// <reference path="../libs/angular.js" />

var EmployeesService = angular.module('EmployeesService', []);

EmployeesService.factory('EmpApi', ['$http', function ($http) {

    var urlBase = "http://localhost:64025/api/";
    var EmApi = {};

    // Get list employees
    EmApi.getEmployees = function () {
        return $http.get(urlBase + 'Employees');
    };

    // Add an employee
    EmApi.addEmployee = function (emp) {
        return $http.post(urlBase + 'Employees/', emp);
    };

    // Edit an employee
    EmApi.editEmployee = function (empToUpdate) {
        var req = $http({
            method: 'put',
            url: urlBase + 'Employees/' + empToUpdate.EmployeeID,
            data: empToUpdate
        });
        return req;
    };

    // Delete an employee
    EmApi.deteleEmployee = function (empIdToDelete) {
        var req = $http({
            method: 'delete',
            url: urlBase + 'Employees/' + empIdToDelete.EmployeeID
        });
        return req;
    };

    return EmApi;

}]);