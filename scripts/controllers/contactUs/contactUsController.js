(function () {
    'use strict';
    angular.module('GMA').controller('ContactUsController', function ($scope, api, $stateParams, $ionicLoading) {
        api.contactUs.find($stateParams.id, $stateParams.itemId).then(function (data) {
            $scope.contactUs = data;
            initialize(data.MapLocations);
        });
        
        function initialize(markers) {
            var mapOptions = {
                center: new google.maps.LatLng(30.064742, 31.249509),
                zoom: 10,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);

            if (markers.length > 0) {
                _.each(markers, function (marker) {
                    new google.maps.Marker({
                        position: new google.maps.LatLng(marker.Latitude, marker.Longitude),
                        map: map
                    });
                });
            }
            
            // Stop the side bar from dragging when mousedown/tapdown on the map
            google.maps.event.addDomListener(document.getElementById('map_canvas'), 'mousedown', function (e) {
                e.preventDefault();
                return false;
            });

            $scope.map = map;
            
        }
    });
})();