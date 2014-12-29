(function () {
    'use strict';
    angular.module('GMA').controller('GalleriesController', function ($scope, api, $stateParams, $ionicModal, pageSize, $state, $ionicSlideBoxDelegate)
    {
        $scope.criteria =
        {
            pageSize: pageSize,
            pageNumber: 0
        };

        //Cleanup the modal when we're done with it!
        $scope.$on('$destroy', function () {
            if (!_.isUndefined($scope.modal))
                $scope.modal.remove();
        });

        $scope.openItem = function (item) {
            $scope.activeSlide = _.indexOf($scope.Items, item);
            $scope.slideIndex = _.indexOf($scope.Items, item);
            
            // select photo
            $ionicModal.fromTemplateUrl('gallery-modal.html', {
                scope: $scope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $scope.modal = modal;
                $scope.modal.show();
            });
        };

        $scope.nextSlide = function() {
            $ionicSlideBoxDelegate.next();
        };

        $scope.previousSlide = function () {
            $ionicSlideBoxDelegate.previous();
        };
        
        // Called each time the slide changes
        $scope.slideChanged = function (index) {
            $scope.slideIndex = index;
        };
        
        $scope.openVideo = function(video) {
            window.open(video.EmbedUrl, '_blank', 'location=no,toolbar=no');
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
            var apiGallery = api.photoGalleries;
            if ($state.current.name == "main.videoGallery")
                apiGallery = api.videoGalleries;

            return apiGallery.all($stateParams.id, $scope.criteria).then(function (data) {
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