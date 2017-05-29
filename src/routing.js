//Get basic information about routes, type of transport, alternative routes etc.
function calculateRouteFromAtoB (platform, waypoint1) {
    var router = platform.getRoutingService(),
        routeRequestParams = {
            mode: 'fastest;pedestrian',
            alternatives: '1',
            representation: 'display',
            waypoint0: '37.5739,-122.3593',
            waypoint1: waypoint1,
            routeattributes: 'waypoints,summary,shape,legs',
            maneuverattributes: 'direction,action'

        };

        router.calculateRoute(
        routeRequestParams,
        onSuccess,
        onError
    );
}
//Geocod in to address
function reverseGeocode(platform, waypoints, callback) {
    var geocoder = platform.getGeocodingService(),
        parameters = {
            prox: waypoints,
            mode: 'retrieveAddresses',
            maxresults: '1'
            };
//ВКЛЮЧИТЬ МОЗГИ И ПОФИКСИТЬ ЭТУ ЖОПУ. ВЫНЕСТИ ПРОВЕРКИ В ФУНКЦИЮ КОТОРАЯ ВЫЗЫВАЕТ КОЛБЭК
    geocoder.reverseGeocode(parameters,
        function (result) {
            var addressStreet = result.Response.View["0"].Result["0"].Location.Address.Street;
            var HouseNumber = result.Response.View["0"].Result["0"].Location.Address.HouseNumber;
            //If address have no house number or streets address
            if(typeof (addressStreet && HouseNumber) !== 'undefined')  {
                callback.call(HouseNumber + ", " + addressStreet);
            } else if((typeof (addressStreet && HouseNumber) === 'undefined') && result.Response.View["0"].Result["0"].Location.Address.District) {
                callback.call(result.Response.View["0"].Result["0"].Location.Address.District)
            } else {
                callback.call(result.Response.View["0"].Result["0"].Location.Address.Label)
            }
        }, function (error) {
            alert(error);
        });
}
/**
 * This function will be called once the Routing REST API provides a response
 * @param  {Object} result          A JSONP object representing the calculated route
 *
 * see: http://developer.here.com/rest-apis/documentation/routing/topics/resource-type-calculate-route.html
 */
function onSuccess(result) {
    var route = result.response.route;

    addRouteShapeToMap(route);

}

function onError(error) {
    alert('Ooops!');
}

// var mapContainer = document.getElementById('map'),
//     routeInstructionsContainer = document.getElementById('panel');

/**
 * Creates a H.map.Polyline from the shape of the route and adds it to the map.
 * @param {Object} route A route as received from the H.service.RoutingService
 */


//Calculating routes
var poly,
    poly1;
function addRouteShapeToMap(route){
    var strip = new H.geo.Strip();
    var stripAlt = new H.geo.Strip();
    //Adding routes to panel
        addSummaryToPanel(route);
        addManueversToPanel(route[0]);
        addWaypointsToPanel(route);

    //Adding main polyline to maps and alternatives rotes
    //Main routes
        var routeShape = route[0].shape;
        routeShape.forEach(function(point) {
        var parts = point.split(',');
        strip.pushLatLngAlt(parts[0], parts[1]);
    });
    //Alternative routes
        var routeShapeAlt = route[1].shape;
        routeShapeAlt.forEach(function(point) {
            var partsAlt = point.split(',');
            stripAlt.pushLatLngAlt(partsAlt[0], partsAlt[1]);

        });


    //Visualisation polyline
    var polylineAlt = new H.map.Polyline(stripAlt, {
        style: {
            lineWidth: 4,
            strokeColor: 'rgba(0, 128, 255, 0.5)'
        }
    });
    var polyline = new H.map.Polyline(strip, {

        style: {
            lineWidth: 4,
            strokeColor: 'rgba(0, 128, 255, 0.7)'
        }
    });
    map.addObject(polyline);
    map.addObject(polylineAlt);

    map.setViewBounds(polyline.getBounds(), true);





    // And zoom to its bounding rectangle
    map.setViewBounds(polyline.getBounds(), true);
   poly = polyline,
       poly1 = polylineAlt;

}
//Removing polyline by second tap on map, this function called in get_coords.js module
function removePolyLine() {
    map.removeObject(poly, poly1);
    map.removeObject(poly1);
}


/**
 * Creates a series of H.map.Marker points from the route and adds them to the map.
 * @param {Object} route  A route as received from the H.service.RoutingService
 */
function addWaypointsToPanel(route){

    var fromElem = document.getElementById("from");
    var toElem = document.getElementById('to');

   reverseGeocode(platform, route[0].shape[0], function(){
        fromElem.textContent = this;
    });

    reverseGeocode(platform, route[0].shape[route[0].shape.length-1], function() {
        toElem.textContent = this;
    });

}




/**
 * Creates a series of H.map.Marker points from the route and adds them to the map.
 * @param {Object} route  A route as received from the H.service.RoutingService
 */
function addSummaryToPanel(route){
    console.log(route);
    var getVia = document.getElementById('viaRoud'),
        contentVia = '',
        locals = route[0].leg["0"].maneuver[1].position.latitude + '' + route[0].leg["0"].maneuver[1].position.longitude;
    // reverseGeocode(platform, locals, function(){
    //         contentVia = this;
    //     });
    var summaryDiv = document.getElementById('distance'),
        distance = route[0].summary.distance / 1000;
        content = '';

    content += '<b>' + distance.toFixed(1)  + 'km. <hr id="hrDist">';
    content += 'arrive: ' + route[0].summary.travelTime.toMMSS() + '</b>';
    summaryDiv.innerHTML = content;



}

/**
 * Creates a series of H.map.Marker points from the route and adds them to the map.
 * @param {Object} route  A route as received from the H.service.RoutingService
 */
function addManueversToPanel(route){


console.log(route.leg)
    var nodeOL = document.createElement('ol'),
        i,
        j;

    nodeOL.style.fontSize = 'small';
    nodeOL.style.marginLeft ='5%';
    nodeOL.style.marginRight ='5%';
    nodeOL.className = 'directions';

    // Add a marker for each maneuver
    for (i = 0;  i < route.leg.length; i += 1) {
        for (j = 0;  j < route.leg[i].maneuver.length; j += 1) {
            // Get the next maneuver.
            maneuver = route.leg[i].maneuver[j];

            var li = document.createElement('li'),
                spanArrow = document.createElement('span'),
                spanInstruction = document.createElement('span');

            spanArrow.className = 'arrow '  + maneuver.action;
            spanInstruction.innerHTML = maneuver.instruction;
            li.appendChild(spanArrow);
            li.appendChild(spanInstruction);

            nodeOL.appendChild(li);
        }
    }

    document.getElementById('panel').appendChild(nodeOL);
}


Number.prototype.toMMSS = function () {
    return  Math.floor(this / 60)  +' minutes '+ (this % 60)  + ' seconds.';
};



