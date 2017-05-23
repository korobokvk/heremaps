$(document).ready(function () {
    var toe = 0;
    $('.btn_search').click(function(e) {
        e.preventDefault();
        var searcjInput = $(".inp_search").val();
    // if(toe > 0) {
    //     removeMarkers();
    //     removePolyLine();
    //     toe = 0
    // } else {


    // }

    });
    $(".inp_search").on('input keyup', function(event) {
        console.log($(this).val());
        autoCompleteListener($(this).val(), event)
    });
});
//AUTOKOMPLITE
var AUTOCOMPLETION_URL = 'https://autocomplete.geocoder.cit.api.here.com/6.2/suggest.json',
    ajaxRequest = new XMLHttpRequest(),
    query = '';

/**
 * If the text in the text box  has changed, and is not empty,
 * send a geocoding auto-completion request to the server.
 *
 * @param {Object} textBox the textBox DOM object linked to this event
 * @param {Object} event the DOM event which fired this listener
 */
function autoCompleteListener(textBox, event) {

    if (query != textBox.value){
        if (textBox.length >= 1){

            /**
             * A full list of available request parameters can be found in the Geocoder Autocompletion
             * API documentation.
             *
             */
            var params = '?' +
                'query=' +  encodeURIComponent(textBox.value) +   // The search text which is the basis of the query
                '&beginHighlight=' + encodeURIComponent('<mark>') + //  Mark the beginning of the match in a token.
                '&endHighlight=' + encodeURIComponent('</mark>') + //  Mark the end of the match in a token.
                '&maxresults=5' +  // The upper limit the for number of suggestions to be included
                // in the response.  Default is set to 5.
                '&app_id=' + 'e7ofwHOWmAV2s8KnY4Xi' +
                '&app_code=' + 'cJXpDGMrI0ssliwAJ-drRA';
                '&app_code=' + 'cJXpDGMrI0ssliwAJ-drRA';
            ajaxRequest.open('GET', AUTOCOMPLETION_URL + params );
            ajaxRequest.send();
        }
    }
    query = textBox.value;
}


/**
 *  This is the event listener which processes the XMLHttpRequest response returned from the server.
 */
function onAutoCompleteSuccess() {
    /*
     * The styling of the suggestions response on the map is entirely under the developer's control.
     * A representitive styling can be found the full JS + HTML code of this example
     * in the functions below:
     */
    clearOldSuggestions();
    console.log(this.responce);
    addSuggestionsToPanel(this.response);  // In this context, 'this' means the XMLHttpRequest itself.
    addSuggestionsToMap(this.response);
}
var group = new H.map.Group();
function clearOldSuggestions(){
    group.removeAll ();
    if(bubble){
        bubble.close();
    }
}

/**
 * This function will be called if a communication error occurs during the XMLHttpRequest
 */
function onAutoCompleteFailed() {
    alert('Ooops!');
}
function addSuggestionsToMap(response){
    /**
     * This function will be called once the Geocoder REST API provides a response
     * @param  {Object} result          A JSONP object representing the  location(s) found.
     */
    var onGeocodeSuccess = function (result) {
            var marker,
                locations = result.Response.View[0].Result,
                i;

            // Add a marker for each location found
            for (i = 0; i < locations.length; i++) {
                marker = new H.map.Marker({
                    lat : locations[i].Location.DisplayPosition.Latitude,
                    lng : locations[i].Location.DisplayPosition.Longitude
                });
                marker.setData(locations[i].Location.Address.Label);
                group.addObject(marker);
            }

            map.setViewBounds(group.getBounds());
            if(group.getObjects().length < 2){
                map.setZoom(15);
            }
        },
        /**
         * This function will be called if a communication error occurs during the JSON-P request
         * @param  {Object} error  The error message received.
         */
        onGeocodeError = function (error) {
            alert('Ooops!');
        },
        /**
         * This function uses the geocoder service to calculate and display information
         * about a location based on its unique `locationId`.
         *
         * A full list of available request parameters can be found in the Geocoder API documentation.
         * see: http://developer.here.com/rest-apis/documentation/geocoder/topics/resource-search.html
         *
         * @param {string} locationId    The id assigned to a given location
         */
        geocodeByLocationId = function (locationId) {
            geocodingParameters = {
                locationId : locationId
            };

            geocoder.geocode(
                geocodingParameters,
                onGeocodeSuccess,
                onGeocodeError
            );
        }
    response.suggestions.forEach(function (item, index, array) {
        geocodeByLocationId(item.locationId);
    });
}
function addSuggestionsToPanel(response){
    var suggestions = document.getElementById('suggestions');
    suggestions.innerHTML = JSON.stringify(response, null, ' ');
}
// Attach the event listeners to the XMLHttpRequest object
ajaxRequest.addEventListener("load", onAutoCompleteSuccess);
ajaxRequest.addEventListener("error", onAutoCompleteFailed);
ajaxRequest.responseType = "json";


//GADDRES TO COORDINATION
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