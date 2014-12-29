(function () {
    'use strict';
    var gma = angular.module('GMA');
    gma.factory('api', function (request, clientDetails, storage) {
        return {
            users: {
                eventSubscription: function(email) {
                    return request.post('clients/' + storage.data.ClientId + '/users/eventsubscription', { Email: email }).then(function (result) {
                        return result.data;
                    });
                }
            },
            
            client: {
                details: function() {
                    return request.get('clients/' + storage.data.ClientId).then(function (result) {
                        return result.data;
                    });
                }
            },
           
            photoGalleries: {
                all: function (id, criteria) {
                    return request.get('clients/' + storage.data.ClientId + '/photogalleries/' + id, criteria).then(function (result) {
                        return result.data;
                    });
                }
            },

            videoGalleries: {
                all: function (id, criteria) {
                    return request.get('clients/' + storage.data.ClientId + '/videogalleries/' + id, criteria).then(function (result) {
                        return result.data;
                    });
                }
            },

            news: {
                all: function (id, criteria) {
                    return request.get('clients/' + storage.data.ClientId + '/news/' + id, criteria).then(function (result) {
                        return result.data;
                    });
                },
                find: function (id, itemId) {
                    return request.get('clients/' + storage.data.ClientId + '/news/' + id + '/items/' + itemId).then(function (result) {
                        return result.data;
                    });
                }
            },

            facebookNews: {
                all: function (id, criteria) {
                    return request.get('clients/' + storage.data.ClientId + '/facebookNews/' + id, criteria).then(function (result) {
                        return result.data;
                    });
                },
                find: function (id, itemId) {
                    return request.get('clients/' + storage.data.ClientId + '/facebookNews/' + id + '/items/' + itemId).then(function (result) {
                        return result.data;
                    });
                }
            },
            
            newsletters: {
                all: function (id, criteria) {
                    return request.get('clients/' + storage.data.ClientId + '/newsletters/' + id, criteria).then(function (result) {
                        return result.data;
                    });
                },
                find: function (id, itemId) {
                    return request.get('clients/' + storage.data.ClientId + '/newsletters/' + id + '/items/' + itemId).then(function (result) {
                        return result.data;
                    });
                }
            },
            
            events: {
                all: function (id, criteria) {
                    return request.get('clients/' + storage.data.ClientId + '/events/' + id, criteria).then(function (result) {
                        return result.data;
                    });
                },
                find: function (id, itemId) {
                    return request.get('clients/' + storage.data.ClientId + '/events/' + id + '/items/' + itemId).then(function (result) {
                        return result.data;
                    });
                }
            },
            
            contactUs: {
                find: function (id) {
                    return request.get('clients/' + storage.data.ClientId + '/contactus/' + id).then(function (result) {
                        return result.data;
                    });
                }
            },
            
            menus: {
                all: function () {
                    return request.get('clients/' + storage.data.ClientId + '/menus').then(function (result) {
                        return result.data;
                    });
                },
                submenus: function (id) {
                    return request.get('clients/' + storage.data.ClientId + '/menus/' + id).then(function (result) {
                        return result.data;
                    });
                }
            },
            
            stats: {
                send: function (statsDetails) {
                    return request.post('clients/' + storage.data.ClientId + '/downloads', statsDetails).then(function (result) {
                        return result.data;
                    });
                }
            },
            
            pushNotifications: {
                getSettings: function () {
                    return request.get('clients/' + storage.data.ClientId + '/pushnotifications/settings').then(function (result) {
                        return result.data;
                    });
                },
                registerDevice: function(info) {
                    return request.post('clients/' + storage.data.ClientId + '/pushnotifications/registerdevice', info).then(function (result) {
                        return result.data;
                    });
                }
            },
        };
    });

})();