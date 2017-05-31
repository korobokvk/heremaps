$('.inp_search').on('input keyup', function(e){
    autoCompleteListener(this, e)
});
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
        if (textBox.value.length >= 1){

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
                '&app_code=' +'cJXpDGMrI0ssliwAJ-drRA';
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

for(var element of this.response.suggestions) {
    var value = element["label"];

    $("#display").removeClass('clear');
    $('.addressesAuroCom').removeClass('clear').append(`<option id='spanArr' > ${value} </option>`);

}

$("option").click(function(e) {
    var textAddress = $(this).text();
    console.log(textAddress);
    geocode(platform, textAddress);
    $(".inp_search").val(textAddress);
    $('.addressesAuroCom').addClass('clear');
    $("#display").addClass('clear');

});

    function geocode(platform, textAddress) {
        console.log(textAddress);
        var geocoder = platform.getGeocodingService(),
            geocodingParameters = {
                searchText: textAddress,
                jsonattributes : 1

            };

        geocoder.geocode(
            geocodingParameters,
            onSuccess,
            onError
        );
    }
    function onSuccess(result) {
        $("#popup_on_marker").addClass("active");
        var lat = result.response.view["0"].result["0"].location.displayPosition.latitude;
        var lng = result.response.view["0"].result["0"].location.displayPosition.longitude;
        var locations = lat.toFixed(4) + ',' + lng.toFixed(4);

        console.log(locations);

        calculateRouteFromAtoB(platform, locations);
        orderMarkers(locations);

    }
     // In this context, 'this' means the XMLHttpRequest itself.

}


/**
 * This function will be called if a communication error occurs during the XMLHttpRequest
 */
function onAutoCompleteFailed() {
    alert('Ooops!');
}

// Attach the event listeners to the XMLHttpRequest object
ajaxRequest.addEventListener("load", onAutoCompleteSuccess);
ajaxRequest.addEventListener("error", onAutoCompleteFailed);
ajaxRequest.responseType = "json";
