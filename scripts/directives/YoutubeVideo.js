(function () {
    'use strict';

    angular.module('GMA').directive('embedSrc', function () {
        return {
            restrict: 'A',
            replace: true,
            link: function (scope, element, attrs) {
                var current = element;
                scope.$watch(function () { return attrs.embedSrc; }, function () {
                    var clone = element
                                  .clone()
                                  .attr('src', attrs.embedSrc);
                    current.replaceWith(clone);
                    current = clone;
                });
            }
        };
    });
})();