(function () {
    'use strict';
    angular.module('GMA')
      .controller('SponsorsController', function ($scope, $state, $timeout, $ionicViewService, splashSettings, storage, homepageHandler, $rootScope) {
          

          $scope.sponsors = storage.data.Sponsors;
          $scope.ThemeCssClass = storage.data.ThemeCssClass;
          
          $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from) {
              var backToClientInfo = from.name == "sponsors" && to.name == "clientInfo";
              if (backToClientInfo) {
                  navigator.app.exitApp();
              }
          });

          if (storage.data.hasConnectionProblem == true) {
              $scope.hasError = true;
              $scope.error = "Connection Error!";
          } else {
              if (storage.data.Sponsors.length > 0 && storage.data.ShowSponsorsScreen) {
                  $timeout(function () {
                      storage.data.IsAppStarting = true;
                      homepageHandler.redirectToHomePage();
                  }, 3000);
              } else {
                  storage.data.IsAppStarting = true;
                  homepageHandler.redirectToHomePage();
              }

          }

          
      });
})();
