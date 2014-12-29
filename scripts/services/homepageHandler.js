(function () {
    'use strict';
    var gma = angular.module('GMA');
    gma.factory('homepageHandler', function (menuHandler, $state, storage) {
        return {
            redirectToHomePage: function () {
                var homepageDefaultMenuItem = storage.data.HomePageMenuItem;
                if (!_.isUndefined(homepageDefaultMenuItem)) {
                    var stateToRedirect = menuHandler.getMenuItemState(homepageDefaultMenuItem);
                    var menuId = homepageDefaultMenuItem.Id;
                    $state.go(stateToRedirect, { id: menuId });
                } else {
                    $state.go('main.home');
                }
            }
        };
    });
})();