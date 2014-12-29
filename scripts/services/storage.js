(function () {
    'use strict';
    var gma = angular.module('GMA');
    gma.factory('storage', function () {
        return {
            data: {}
        };
    });
})();