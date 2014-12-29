(function () {
    'use strict';
    angular.module('GMA')
        .controller('EventDetailsController', function ($scope, api, $stateParams, recursionTypes) {
            api.events.find($stateParams.id, $stateParams.itemId).then(function (data) {
                $scope.item = data;
                $scope.recursionType = $scope.getRecursionType($scope.item.RecursionTypeId);
            });
            
            $scope.getRecursionType = function (recursionTypeId) {
                return _.find(recursionTypes, function (recursionType) {
                    return recursionType.Id == recursionTypeId;
                });
            };
    });
})();