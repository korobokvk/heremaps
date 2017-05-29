var bubble;
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

function reverseGeocode(platform, waypoints, callback) {
    var geocoder = platform.getGeocodingService(),
        parameters = {
            prox: waypoints,
            mode: 'retrieveAddresses',
            maxresults: '1'
            };

    geocoder.reverseGeocode(parameters,
        function (result) {
            callback.call(result.Response.View["0"].Result["0"].Location.Address.Label);
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

var mapContainer = document.getElementById('map'),
    routeInstructionsContainer = document.getElementById('panel');

function openBubble(position, text){
    if(!bubble){
        bubble =  new H.ui.InfoBubble(
            position,
            // The FO property holds the province name.
            {content: text});
        ui.addBubble(bubble);
    } else {
        bubble.setPosition(position);
        bubble.setContent(text);
        bubble.open();
    }
    console.log(bubble)
}


//Calculating routes
var poly,
    poly1;
function addRouteShapeToMap(route){
    var strip = new H.geo.Strip();
    var stripAlt = new H.geo.Strip();
    //Ading routes to panel
        addSummaryToPanel(route[0].summary);
        addManueversToPanel(route[0]);
        addWaypointsToPanel(route);

    //Adding main polyline to maps and alternatives rotes
    //Main routes
        var routeShape = route[0].shape;
        console.log(route[0].shape);
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
    // Add the polyline to the map
    map.addObject(polyline);
    map.addObject(polylineAlt);

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

    console.log(route[0].shape[0]);
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
function addSummaryToPanel(summary){
    var summaryDiv = document.createElement('div'),
        content = '';
    content += '<b>Total distance</b>: ' + summary.distance  + 'm. <br/>';
    content += '<b>Travel Time</b>: ' + summary.travelTime.toMMSS() + ' (in current traffic)';


    summaryDiv.style.fontSize = 'small';
    summaryDiv.style.marginLeft ='5%';
    summaryDiv.style.marginRight ='5%';
    summaryDiv.innerHTML = content;
    routeInstructionsContainer.appendChild(summaryDiv);
}

/**
 * Creates a series of H.map.Marker points from the route and adds them to the map.
 * @param {Object} route  A route as received from the H.service.RoutingService
 */
function addManueversToPanel(route){



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

    routeInstructionsContainer.appendChild(nodeOL);
}


Number.prototype.toMMSS = function () {
    return  Math.floor(this / 60)  +' minutes '+ (this % 60)  + ' seconds.';
};



