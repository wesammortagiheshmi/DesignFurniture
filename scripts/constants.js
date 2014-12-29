(function () {
    'use strict';
    var gmaModule = angular.module('GMA');

    gmaModule.constant('clientDetails', {
        id: window.config.ClientId
    });

    gmaModule.constant('pageSize', 10);

    gmaModule.constant('server', {
        url: window.config.ServerUrl
    });

    gmaModule.constant('splashSettings', { duration: 5000 });

    gmaModule.constant('menuTemplates', [
          { Id: 1, Name: 'photoGallery', },
          { Id: 2, Name: 'news' },
          { Id: 3, Name: 'videoGallery' },
          { Id: 4, Name: 'newsletter' },
          { Id: 5, Name: 'events' },
          { Id: 6, Name: 'contactUs' },
          { Id: 7, Name: 'facebookNews' }
    ]);

    gmaModule.constant('eventTypes', [
      { Id: 1, Name: 'timedEvent', },
      { Id: 2, Name: 'unTimedEvent' },
      { Id: 3, Name: 'allDayEvent' }
    ]);

    gmaModule.constant('recursionTypes', [
        { Id: 1, Name: 'none', },
        { Id: 2, Name: 'daily' },
        { Id: 3, Name: 'weekly' },
        { Id: 4, Name: 'monthlyByDate' },
        { Id: 5, Name: 'monthlyByDay' }
    ]);

    gmaModule.constant('defaultContentImage', {
        url: 'images/default-image.jpg'
    });

    gmaModule.constant('platform', {
        Android: 1,
        IOS:2,
        WindowsPhone:3
    });

})();