function orderMarkers(lat, lng) {
    var zIndex = 1,
        // create a set of markers
        marker = new mapsjs.map.Marker(
            {lat: lat, lng: lng}
        );

    // add markers to the map
    map.addObjects([marker]);

}
