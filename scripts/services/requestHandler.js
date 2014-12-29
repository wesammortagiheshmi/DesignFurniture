(function () {
    'use strict';
    var gma = angular.module('GMA');
    gma.factory('request', function ($http, $rootScope, server, $ionicLoading, storage) {

        $http.defaults.transformRequest.push(function (data) {
            $rootScope.$broadcast('httpCallStarted');
            return data;
        });
        $http.defaults.transformResponse.push(function (data) {
            $rootScope.$broadcast('httpCallStopped');
            return data;
        });

        //$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";

        $rootScope.$on('httpCallStarted', function (e) {
            $ionicLoading.show({ template: '<div id="loading" class="spin-1"></div>' });
        });

        $rootScope.$on('httpCallStopped', function (e) {
            $ionicLoading.hide();
        });

        return {
            get: function (url, parameters) {
                var http = $http({
                    url: storage.data.ServerUrl + /api/ + url,
                    method: "GET",
                    params: parameters
                }).success(function () {
                    $rootScope.hasError = false;
                    $rootScope.eroor = "";
                }).error(function () {
                    $rootScope.hasError = true;
                    $rootScope.error = "Connection Error, please try again!";
                });

                return http;
            },
            post: function (url, data) {
                var http = $http({
                    url: storage.data.ServerUrl + /api/ + url,
                    method: "POST",
                    transformRequest: function () {
                        var str = [];
                        for (var p in data)
                            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(data[p]));
                        return str.join("&");
                    },
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                }
                }).success(function (xhr, status, headers, config) {
                    $rootScope.hasError = false;
                    $rootScope.eroor = "";
                }).error(function (xhr, status, headers, config) {
                    $rootScope.hasError = true;
                    $rootScope.error = "Connection Error, please try again!";
                });

                return http;
            }
        };
    });
})();