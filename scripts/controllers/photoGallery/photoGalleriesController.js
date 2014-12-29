(function () {
    'use strict';
    angular.module('GMA').controller('PhotoGalleriesController', function ($scope, api, $stateParams, $ionicModal, pageSize) {
        $scope.criteria = {
            pageSize: pageSize,
            pageNumber: 0
        };

        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function () {
            if (!_.isUndefined($scope.modal))
                $scope.modal.remove();
        });

        $scope.openPhoto = function (item) {
            $scope.selectedItem = item;
            // select photo
            $ionicModal.fromTemplateUrl('image-modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();
            });
        };

        $scope.Items = [];

        $scope.noMoreItemsAvailable = false;
        $scope.loadMore = function () {
            $scope.criteria.pageNumber++;
            $scope.fetchResult(false).then(function (data) {
                $scope.Name = data.Name;
                $scope.TotalResult = data.TotalResult;

                if ($scope.Items.length == $scope.TotalResult) {
                    $scope.noMoreItemsAvailable = true;
                }
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };

        $scope.fetchResult = function (clearItems) {
            return api.photoGalleries.all($stateParams.id, $scope.criteria).then(function (data) {
                if (clearItems)
                    $scope.Items = [];
                data.Items.forEach(function (item) {
                    $scope.Items.push(item);
                });
                return data;
            });
        };

        $scope.refreshItems = function () {
            $scope.criteria.pageNumber = 1;
            $scope.fetchResult(true).then(function (data) {
                $scope.noMoreItemsAvailable = false;
                $scope.$broadcast('scroll.refreshComplete');
            });
        };


    });
})();