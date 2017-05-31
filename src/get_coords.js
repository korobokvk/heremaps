var tic = 0;

function setUpClickListener(map) {
    // Attach an event listener to map display
    // obtain the coordinates and display in an alert box.
    map.addEventListener('tap', function (evt) {

        var coord = map.screenToGeo(evt.currentPointer.viewportX,
            evt.currentPointer.viewportY);
        var waypoint0 = coord.lat.toFixed(4) + ',' + coord.lng.toFixed(4);
        if(tic > 0) {
            evt.preventDefault()
            removeMarkers();
            location.reload()

            // removePolyLine();
            tic = 0
        } else {
            $("#popup_on_marker").addClass("active");
            calculateRouteFromAtoB(platform, waypoint0);
            orderMarkers(coord.lat.toFixed(4), coord.lng.toFixed(4));
            tic++;
        }
    });
}

setUpClickListener(map);


