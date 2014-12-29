(function () {
    'use strict';
    angular.module('GMA').controller('NewsController', function ($scope, api, $stateParams, pageSize, $state, defaultContentImage) {
        $scope.criteria = {
            pageSize: pageSize,
            pageNumber: 0
        };
        var newsId = $stateParams.id;
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
            var apiNews = api.news;
            var newsDetailsState = "main.news-details";

            if ($state.current.name == "main.facebookNews") {
                apiNews = api.facebookNews;
                newsDetailsState = "main.facebookNews-details";
            }
            else if ($state.current.name == "main.newsletter") {
                apiNews = api.newsletters;
                newsDetailsState = "main.newsletter-details";
            }

            return apiNews.all(newsId, $scope.criteria).then(function (data) {
                if (clearItems)
                    $scope.Items = [];
                data.Items.forEach(function (item) {
                    item.sref = newsDetailsState + ' ({id: ' + newsId + ', itemId: "' + item.Id + '"})';
                    var hasImage = item.ImagePath.length > 0;
                    if (!hasImage)
                        item.ImagePath = defaultContentImage.url;
                    $scope.Items.push(item);
                });
                return data;
            });
        };

        $scope.refreshItems = function () {
            $scope.criteria.pageNumber = 1;
            $scope.fetchResult(true).then(function (data) {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };
    });
})();