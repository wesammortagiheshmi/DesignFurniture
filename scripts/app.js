(function () {
    'use strict';

    var app = angular.module('GMA', ['ionic', 'ngCordova']);

    app.run(function ($ionicPlatform, statsHandler, pushNotificationHandler, serverUrlHandler) {
        document.addEventListener("registerDeviceCompleted", function () {
            pushNotificationHandler.postDeviceToken();
        }, false);

        document.addEventListener("messageRecieved", function () {
            var pushBar = document.getElementById("pushNotificationMessage");
            pushBar.innerHTML = "<div class='push-bar'>" + window.pushMessage + "</div>";
        }, false);

        document.addEventListener("deviceready", function () {
            ImgCache.options.debug = true;
            ImgCache.init(function () {}, function () {});

            if (window.plugin && window.plugin.statusbarOverlay) window.plugin.statusbarOverlay.hide();

            serverUrlHandler.resolve();
            // send details about the device
            var isSent = statsHandler.isSentBefore();
            if (isSent == false)
                statsHandler.send();

            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (window.cordova && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

        }, false);

    });

    app.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider) {
        $httpProvider.defaults.useXDomain = true;

        $stateProvider
            .state('clientInfo', {
                url: '/clientInfo',
                templateUrl: 'views/splash/clientInfo.html',
                controller: 'ClientInfoController'
            })
            .state('sponsors', {
                url: '/sponsors',
                templateUrl: 'views/splash/sponsors.html',
                controller: 'SponsorsController'
            })
            .state('main', {
                url: '/main',
                templateUrl: 'views/mainContainer.html',
                abstract: true,
                controller: 'MainController'
            })
            .state('main.home', {
                url: '/home',
                views: {
                    'main': {
                        templateUrl: 'views/home.html',
                        controller: 'HomePageController'
                    }
                }
            })
            .state('main.submenus', {
                url: '/submenus/:id',
                views: {
                    'main': {
                        templateUrl: 'views/submenus.html',
                        controller: 'SubmenusController'
                    }
                }
            })
            .state('main.photoGallery', {
                url: '/photoGallery/:id',
                views: {
                    'main': {
                        templateUrl: 'views/photoGallery/photoGallery.html',
                        controller: 'GalleriesController'
                    }
                }
            })
            .state('main.news', {
                url: '/news/:id',
                views: {
                    'main': {
                        templateUrl: 'views/news/news.html',
                        controller: 'NewsController'
                    }
                }
            })
            .state('main.news-details', {
                url: '/news/:id/items/:itemId',
                views: {
                    'main': {
                        templateUrl: 'views/news/news-details.html',
                        controller: 'NewsDetailsController'
                    }
                }
            })
            .state('main.videoGallery', {
                url: '/videoGallery/:id',
                views: {
                    'main': {
                        templateUrl: 'views/videoGallery/videoGallery.html',
                        controller: 'GalleriesController'
                    }
                }
            })
            .state('main.newsletter', {
                url: '/newsletter/:id',
                views: {
                    'main': {
                        templateUrl: 'views/newsletter/newsletters.html',
                        controller: 'NewsController'
                    }
                }
            })
            .state('main.newsletter-details', {
                url: '/newsletter/:id/items/:itemId',
                views: {
                    'main': {
                        templateUrl: 'views/newsletter/newsletter-details.html',
                        controller: 'NewsDetailsController'
                    }
                }
            })
            .state('main.events', {
                url: '/events/:id',
                views: {
                    'main': {
                        templateUrl: 'views/event/events.html',
                        controller: 'EventsController'
                    }
                }
            })
            .state('main.event-details', {
                url: '/events/:id/items/:itemId',
                views: {
                    'main': {
                        templateUrl: 'views/event/event-details.html',
                        controller: 'EventDetailsController'
                    }
                }
            })
            .state('main.contactUs', {
                url: '/contactUs/:id',
                views: {
                    'main': {
                        templateUrl: 'views/contactUs/contactUs.html',
                        controller: 'ContactUsController'
                    }
                }
            })
            .state('main.facebookNews', {
                url: '/facebookNews/:id',
                views: {
                    'main': {
                        templateUrl: 'views/facebookNews/news.html',
                        controller: 'NewsController'
                    }
                }
            })
            .state('main.facebookNews-details', {
                url: '/facebookNews/:id/items/:itemId',
                views: {
                    'main': {
                        templateUrl: 'views/facebookNews/news-details.html',
                        controller: 'NewsDetailsController'
                    }
                }
            }).state('emulator', {
                url: '/emulator',
                templateUrl: 'views/emulator.html',
                controller: 'EmulatorController'
            });

        $urlRouterProvider.otherwise('/clientInfo');
    }]);

})();
