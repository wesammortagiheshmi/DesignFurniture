(function () {
    'use strict';

    angular.module('GMA').directive('imageonload', function () {
        return {
            restrict: 'A',
            scope: { imageonload: '&imageonload' },
            link: function (scope, element) {
                element.bind('load', function () {
                    var expressionHandler = scope.imageonload();
                    scope.$apply(function() {
                        expressionHandler();
                    });
                });
            }
        };
    });
})();