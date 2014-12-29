(function () {
    'use strict';
    angular.module('GMA').controller('ClientInfoController', function ($scope, $state, $timeout, splashSettings, api, storage, serverUrlHandler, pushNotificationHandler, $q, homepageHandler) {
        $scope.clientLoaded = false;
        $scope.hasError = false;

        serverUrlHandler.resolve();
        $scope.ImageLoaded = false;
        $scope.ImageLoadCompelete = function () {
            $scope.ImageLoaded = true;
        };
        api.client.details().then(function (data) {
            // load client details from server
            storage.data.hasConnectionProblem = false;
            localStorage.setItem('clientInfo', JSON.stringify(data));
            var deferred = $q.defer();
            deferred.resolve(data);
            return deferred.promise;
        }, function () {
            // failed to load from the server, load from localStorage
            storage.data.hasConnectionProblem = true;
            var data = JSON.parse(localStorage.getItem('clientInfo'));
            var deferred = $q.defer();
            deferred.resolve(data);
            return deferred.promise;
        }).then(function (data) {
            // bind loaded data
            if (data != null) {
                $scope.client = { Name: data.Name, Logo: data.Logo };
                if (data.IsActive == false) {
                    $scope.hasError = true;
                    return;
                }
                storage.data.Sponsors = data.Sponsors;
                storage.data.HomePageMenuItem = data.HomePageMenuItem;
                storage.data.ThemeCssClass = data.ThemeCssClass;
                storage.data.ShowSponsorsScreen = data.ShowSponsorsScreen;
                storage.data.IsRightToLeft = data.IsRightToLeft;
                $scope.ThemeCssClass = data.ThemeCssClass;
                $scope.clientLoaded = true;
                $scope.hasLogo = data.Logo != '';

                // register push notifications
                var isRegistered = pushNotificationHandler.isRegistered();
                if (isRegistered == false)
                    pushNotificationHandler.register();

                $timeout(function () {
                    if (storage.data.Sponsors.length > 0 && storage.data.ShowSponsorsScreen) {
                        $state.go("sponsors");
                    } else {
                        homepageHandler.redirectToHomePage();
                    }
                }, splashSettings.duration);
            } else {
                $scope.hasError = true;
            }

        });
    });
})();
