(function () {
    'use strict';
    var gma = angular.module('GMA');
    gma.factory('serverUrlHandler', function (storage, clientDetails, server) {
        return {
            resolve: function () {
                storage.data.ClientId = storage.data.ClientId ? storage.data.ClientId : clientDetails.id;
                storage.data.ServerUrl = storage.data.ServerUrl ? storage.data.ServerUrl : server.url;
            }
        };
    });
})();