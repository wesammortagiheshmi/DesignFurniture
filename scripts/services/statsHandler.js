(function () {
    'use strict';
    var gma = angular.module('GMA');
    gma.factory('statsHandler', function (api, $cordovaDevice) {
        var localStorageKeyName = 'statsSent';
        return {
            isSentBefore: function () {
                if (localStorage.getItem(localStorageKeyName))
                    return true;
                return false;
            },
            send: function () {
                if (window.device) {
                    var model = $cordovaDevice.getModel();
                    var uuid = $cordovaDevice.getUUID();
                    var platform = $cordovaDevice.getPlatform();

                    var statsDetails = { Manufacture: model, GSM: '', UUID: uuid, Platform: platform };
                    return api.stats.send(statsDetails).then(function () {
                        localStorage.setItem(localStorageKeyName, true);
                    });
                }
            }
        };
    });
})();