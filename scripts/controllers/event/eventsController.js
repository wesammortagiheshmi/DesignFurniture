(function () {
    'use strict';
    angular.module('GMA')
        .controller('EventsController', function ($scope, api, $stateParams, pageSize, $ionicPopup, $ionicModal) {
            $scope.criteria = {
                pageSize: pageSize,
                pageNumber: 0,
                isUpcoming: true
            };

            var eventId = $stateParams.id;
            $scope.Groups = [];
            $scope.noMoreItemsAvailable = false;
            
            $scope.loadMore = function (isUpcoming) {
                $scope.criteria.pageNumber++;
                $scope.criteria.isUpcoming = isUpcoming;
                $scope.fetchResult(false).then(function (data) {
                    $scope.Name = data.Name;
                    $scope.TotalResult = data.TotalResult;

                    if ($scope.Groups.length == $scope.TotalResult) {
                        $scope.noMoreItemsAvailable = true;
                    }
                    $scope.$broadcast('scroll.infiniteScrollComplete');
                });
            };

            $scope.fetchResult = function (clearGroups) {
                return api.events.all(eventId, $scope.criteria).then(function (data) {
                    $scope.Name = data.Name;
                    $scope.TotalResult = data.TotalResult;
                
                    if (clearGroups)
                        $scope.Groups = [];
                    data.Groups.forEach(function (group) {
                        group.Items.forEach(function(item) {
                            item.sref = 'main.event-details ({id: ' + eventId + ', itemId: ' + item.Id + '})';
                        });
                        $scope.Groups.push(group);
                    });

                    if (!localStorage.getItem('showEmailModal')) {
                        $scope.openModal();
                    }

                    return data;
                });
            };

            $scope.refresh = function (isUpcoming) {
                $scope.criteria.pageNumber = 1;
                $scope.criteria.isUpcoming = isUpcoming;
                $scope.fetchResult(true).then(function (data) {
                    $scope.$broadcast('scroll.refreshComplete');
                });
            };

            $scope.onTabSelected = function (isUpcoming) {
                $scope.criteria.isUpcoming = isUpcoming;
                $scope.refresh(isUpcoming);
            };
        
            // Load the modal from the given template URL
            $ionicModal.fromTemplateUrl('modal.html', function (modal) { $scope.modal = modal; },
            {
                scope: $scope,              // Use our scope for the scope of the modal to keep it simple
                animation: 'slide-in-up'    // The animation we want to use for the modal entrance
            });

            $scope.openModal = function () {
                $scope.modal.show();
            };
            $scope.closeModal = function () {
                $scope.modal.hide();
            };
            $scope.skipModal = function () {
                localStorage.setItem('showEmailModal', false);
                $scope.closeModal();
            };
            $scope.submitForm = function (email) {
                api.users.eventSubscription(email).then(function (data) {
                    localStorage.setItem('showEmailModal', false);
                    $scope.closeModal();
                });
            };
        });
})();