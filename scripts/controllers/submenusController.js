(function () {
    'use strict';
    angular.module('GMA').controller('SubmenusController', function ($scope, api, menuHandler, $stateParams) {
        $scope.noMoreItemsAvailable = false;
        $scope.loadMore = function () {
            $scope.fetchResult().then(function () {
                $scope.noMoreItemsAvailable = true;
                $scope.$broadcast('scroll.infiniteScrollComplete');
            });
        };


        $scope.fetchResult = function () {
            return api.menus.submenus($stateParams.id).then(function (data) {
                $scope.menu = data;
                _.map($scope.menu.Children, function (menuItem) {
                    var templateId = "0";
                    if (menuItem.TemplateId != null)
                        templateId = menuItem.TemplateId;
                    menuItem.menuIcon = "images/" + $scope.ThemeCssClass + "/" + templateId + ".png";
                    return menuHandler.mapMenuTemplateRoute(menuItem);
                });
            });
        };

        $scope.refreshItems = function () {
            $scope.fetchResult().then(function (data) {
                $scope.$broadcast('scroll.refreshComplete');
            });
        };

    });
})();
