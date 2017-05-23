var tic = 0;

function setUpClickListener(map) {
    // Attach an event listener to map display
    // obtain the coordinates and display in an alert box.
    map.addEventListener('tap', function (evt) {

        var coord = map.screenToGeo(evt.currentPointer.viewportX,
            evt.currentPointer.viewportY);
        var waypoint0 = coord.lat.toFixed(4) + ',' + coord.lng.toFixed(4);
        if(tic > 0) {
            removeMarkers();
            removePolyLine();
            tic = 0
        } else {

            calculateRouteFromAtoB(platform, waypoint0);
            orderMarkers(coord.lat.toFixed(4), coord.lng.toFixed(4));

            tic++;
        }
    });
}

function removeFromMap(route){
    var strip = new H.geo.Strip(),
        routeShape = route.shape,
        polyline;

    routeShape.forEach(function(point) {
        var parts = point.split(',');
        strip.pushLatLngAlt(parts[0], parts[1]);
    });

    polyline = new H.map.Polyline(strip, {
        style: {
            lineWidth: 4,
            strokeColor: 'rgba(0, 128, 255, 0.7)'
        }
    });
    // Add the polyline to the map
    map.removeObject(polyline);

    // And zoom to its bounding rectangle
    map.setViewBounds(polyline.getBounds(), true);
}
setUpClickListener(map);


