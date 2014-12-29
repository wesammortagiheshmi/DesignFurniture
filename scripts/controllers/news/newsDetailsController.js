(function () {
    'use strict';
    angular.module('GMA').controller('NewsDetailsController', function ($scope, api, $stateParams, $state, $sce, defaultContentImage) {
        var apiNews = api.news;
        var type = "news";
        if ($state.current.name == "main.facebookNews-details") {
            apiNews = api.facebookNews;
            type = "facebook";
        }

        if ($state.current.name == "main.newsletter-details") {
            apiNews = api.newsletters;
            type = "newsletter";
        }

        apiNews.find($stateParams.id, $stateParams.itemId).then(function (data) {
            var item = data;
            var hasImage = item.ImagePath.length > 0;
            if (!hasImage)
                item.ImagePath = defaultContentImage.url;
            item.hasImage = hasImage;
            if (hasImage && type == "facebook")
                item.ImagePath = item.ImagePath.replace("_n.", "_b.");
            $scope.newsItem = item;

            if (type == "newsletter")
                $scope.newsItem.Description = $sce.trustAsHtml(data.Description);
        });
    });
})();