(function () {
    'use strict';
    angular.module('GMA').controller('EmulatorController', function ($scope, $timeout, $state, $location, storage) {
        var clientId = $location.search().clientid;
        var serverUrl = $location.search().serverurl;
        storage.data.ClientId = clientId;
        storage.data.ServerUrl = serverUrl;

        $timeout(function () {
            $state.go('clientInfo');
        }, 1000);
    });
})();
