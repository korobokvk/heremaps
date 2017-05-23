$(document).ready(function () {
    var toe = 0;
    $('.btn_search').click(function(e) {
        e.preventDefault();
        var searcjInput = $(".inp_search").val();
    if(toe > 0) {
        removeMarkers();
        removePolyLine();
        toe = 0
    } else {
        geocode(platform, searcjInput)
    }

    });
});

function geocode(platform, searcjInput) {
    var geocoder = platform.getGeocodingService(),
        geocodingParameters = {
            searchText: searcjInput,
            jsonattributes : 1
        };

    geocoder.geocode(
        geocodingParameters,
        onSuccesss,
        onError
    );
}
/**
 * This function will be called once the Geocoder REST API provides a response
 * @param  {Object} result          A JSONP object representing the  location(s) found.
 *
 * see: http://developer.here.com/rest-apis/documentation/geocoder/topics/resource-type-response-geocode.html
 */
function onSuccesss(result) {
    var locations = result.response.view[0].result;


    /*
     * The styling of the geocoding response on the map is entirely under the developer's control.
     * A representitive styling can be found the full JS + HTML code of this example
     * in the functions below:
     */
    addLocationsToMap(locations);

    // ... etc.
}

/**
 * This function will be called if a communication error occurs during the JSON-P request
 * @param  {Object} error  The error message received.
 */
function onError(error) {
    alert('Ooops!');
}
function addLocationsToMap(locations){
    var group = new  H.map.Group(),
        position,
        i;
    console.log(group);
    // Add a marker for each location found
    for (i = 0;  i < locations.length; i += 1) {
        position = {
            lat: locations[i].location.displayPosition.latitude,
            lng: locations[i].location.displayPosition.longitude
        };
        orderMarkers(position.lat, position.lng);
        marker = new H.map.Marker(position);
        marker.label = locations[i].location.address.label;

        console.log(marker);

        group.addObject(marker);

    }

    group.addEventListener('tap', function (evt) {
        map.setCenter(evt.target.getPosition());
        openBubble(
            evt.target.getPosition(), evt.target.label);
    }, false);

    // Add the locations group to the map
    map.addObject(group);
    map.setCenter(group.getBounds().getCenter());
}