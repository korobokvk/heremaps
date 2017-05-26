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
/**
 * This function will be called once the Routing REST API provides a response
 * @param  {Object} result          A JSONP object representing the calculated route
 *
 * see: http://developer.here.com/rest-apis/documentation/routing/topics/resource-type-calculate-route.html
 */
function onSuccess(result) {
    var route = result.response.route;
    console.log(result);


    /*
     * The styling of the route response on the map is entirely under the developer's control.
     * A representitive styling can be found the full JS + HTML code of this example
     * in the functions below:
     */
    addRouteShapeToMap(route);






    // ... etc.

}

/**
 * This function will be called if a communication error occurs during the JSON-P request
 * @param  {Object} error  The error message received.
 */
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


/**
 * Creates a H.map.Polyline from the shape of the route and adds it to the map.
 * @param {Object} route A route as received from the H.service.RoutingService
 */
var poly;
function addRouteShapeToMap(routing){
    var route = routing;
    console.log(route.length);
    var strip = new H.geo.Strip();
    var routeShape;
    for(var i = 0; i < route.length; i++) {

        addSummaryToPanel(route[i].summary);
        addManueversToPanel(route[i]);
        addWaypointsToPanel(route[i].waypoint);
        routeShape = route[i].shape;
        routeShape.forEach(function(point) {
            var parts = point.split(',');
            strip.pushLatLngAlt(parts[0], parts[1]);
        });

    }


    var polyline = new H.map.Polyline(strip, {
        style: {
            lineWidth: 4,
            strokeColor: 'rgba(0, 128, 255, 0.7)'
        }
    });
    // Add the polyline to the map
    map.addObject(polyline);

    // And zoom to its bounding rectangle
    map.setViewBounds(polyline.getBounds(), true);
   poly = polyline;
}
function removePolyLine() {
    map.removeObject(poly);
}


/**
 * Creates a series of H.map.Marker points from the route and adds them to the map.
 * @param {Object} route  A route as received from the H.service.RoutingService
 */
function addWaypointsToPanel(waypoints){

    var fromElem = document.getElementById("from");
    var toElem = document.getElementById('to');

    var nodeH3 = document.createElement('h3'),
        waypointLabels = [],
        i;


    for (i = 0;  i < waypoints.length; i += 1) {
        waypointLabels.push(waypoints[i].label)
    }

    nodeH3.textContent = waypointLabels.join(' - ');
    fromElem.textContent = waypointLabels[0];
    toElem.textContent = waypointLabels[1];
    routeInstructionsContainer.innerHTML = '';
    routeInstructionsContainer.appendChild(nodeH3);
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



