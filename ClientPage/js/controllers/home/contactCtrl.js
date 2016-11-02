/// <reference path="../../libs/angular.js" />

angular.module("app").controller('contactCtrl', ['$scope', '$http', '$state', 'toastr', 'NgMap', function ($scope, $http, $state, toastr, NgMap) {
    var urlBase = "http://localhost:64025/api/";
    $scope.sendFeedback = function () {
        var feedBack = {
            'LastName': $scope.LastName,
            'FirstName': $scope.FistName,
            'Phone': $scope.Phone,
            'Email': $scope.Email,
            'Title': $scope.Title,
            'Message': $scope.Message
        };
        if ($scope.LastName == "" || $scope.LastName == undefined) {
            toastr.warning('Bạn cần nhập họ của bạn', 'Cảnh báo');
            angular.element('#LastName').focus();
        } else if ($scope.FistName == "" || $scope.FistName == undefined) {
            toastr.warning('Bạn cần nhập tên của bạn', 'Cảnh báo');
            angular.element('#FistName').focus();
        } else if ($scope.Phone == "" || $scope.Phone == undefined) {
            toastr.warning('Bạn cần nhập số điện thoại của bạn', 'Cảnh báo');
            angular.element('#Phone').focus();
        } else if ($scope.Email == "" || $scope.Email == undefined) {
            toastr.warning('Bạn cần nhập email của bạn', 'Cảnh báo');
            angular.element('#Email').focus();
        } else if ($scope.Title == "" || $scope.Title == undefined) {
            toastr.warning('Bạn cần nhập chủ đề để gửi', 'Cảnh báo');
            angular.element('#Title').focus();
        } else if ($scope.Message == "" || $scope.Message == undefined) {
            toastr.warning('Hãy nhập nội dung bạn cần gửi', 'Cảnh báo');
            angular.element('#Message').focus();
        } else {
            $http.post(urlBase + "Feedbacks/", feedBack).success(function (res) {
                toastr.success('Phản hồi của bạn đã được ghi nhận', 'Thông báo');
                toastr.info('Sự phản hồi của bạn sẽ ghóp phần giúp đỡ website của chung tôi tiếp tục phát triển', 'Cảm ơn sự ghi nhận của bạn');
                $scope.FistName = undefined;
                $scope.LastName = undefined;
                $scope.Phone = undefined;
                $scope.Email = undefined;
                $scope.Title = undefined;
                $scope.Message = undefined;
            }).error(function (err) {
                toastr.error('không thể ghi nhận phản hồi', 'Lỗi');
            });
        }
    };

}]);

