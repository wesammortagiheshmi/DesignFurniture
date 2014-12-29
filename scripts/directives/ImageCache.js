(function () {
    'use strict';

    angular.module('GMA').directive('ngCache', function () {
        return {
            restrict: 'A',
            link: function (scope, el, attrs) {
                attrs.$observe('ngSrc', function (src) {
                    ImgCache.isCached(src, function (path, success) {
                        if (success) {
                            ImgCache.useCachedFile(el);
                        } else {
                            ImgCache.cacheFile(src, function () {
                                ImgCache.useCachedFile(el);
                            }, function () {
                            });
                        }
                    });
                });
            }
        };
    });
})();