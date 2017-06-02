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
        callback.call(result);
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
    var Polyline = new H.map.Polyline(strip, {
        style: {
            lineWidth: 4,
            strokeColor: 'rgba(0, 128, 255, 0.7)'
        },
        visibility: true
    });
    poly = Polyline,
        poly1 = polylineAlt;
    map.addObject(poly);
    map.addObject(poly1);

    //Click bouonds polyline
    $('.mainwalk').click(function(e){

        $("#popup_on_marker").removeClass("active");

        if($("#routesDetails").length > 0) {
            $("#routesDetails").empty();
            $("#fromRouteDetail").empty();
        }

        $(".mainwalk").clone().prependTo("#routesDetails");

        $("#fromRouteDetail").append($("#from").text());

        $("#popup_route").addClass("active");

        map.removeObject(poly);
        map.addObject(poly1);
        map.setViewBounds(poly1.getBounds(), true);
        $('.inp_search').val($("#to").text());
        e.stopPropagation();
    });

    $('.altwalk').click(function(e){

        $("#popup_route").addClass("active");

        if($("#routesDetails").length > 0) {
            $("#routesDetails").empty();
            $("#fromRouteDetail").empty();
        }

        $(".altwalk").clone().prependTo("#routesDetails");

        $("#fromRouteDetail").append($("#from").text());

        $("#popup_on_marker").removeClass("active");

        map.removeObject(poly1);
        map.addObject(poly);
        map.setViewBounds(poly.getBounds(), true);
        $('.inp_search').val($("#to").text());
        e.stopPropagation();
    });


}


//Removing polyline by second tap on map, this function called in get_coords.js module
function removePolyLine() {
    map.removeObject(poly);
    map.removeObject(poly1);

}


/**
 * Creates a series of H.map.Marker points from the route and adds them to the map.
 * @param {Object} route  A route as received from the H.service.RoutingService
 */
function addWaypointsToPanel(route){

    var fromElem = document.getElementById("from");
    var toElem = document.getElementById('to');

    var GetFullAddress = {};

    // //If address have no house number or streets address
   reverseGeocode(platform, route[0].shape[0], function(){

       GetFullAddress.addressStreet = this.Response.View["0"].Result["0"].Location.Address.Street;
       GetFullAddress.HouseNumber = this.Response.View["0"].Result["0"].Location.Address.HouseNumber;


       if(typeof (GetFullAddress.addressStreet && GetFullAddress.HouseNumber) !== 'undefined')  {
           fromElem.textContent = GetFullAddress.HouseNumber + ", " + GetFullAddress.addressStreet;
       } else if((typeof (GetFullAddress.addressStreet && GetFullAddress.HouseNumber) === 'undefined') && this.Response.View["0"].Result["0"].Location.Address.District) {
               fromElem.textContent = this.Response.View["0"].Result["0"].Location.Address.District
       } else {
           fromElem.textContent = this.Response.View["0"].Result["0"].Location.Address.Label
       }
   });

   reverseGeocode(platform, route[0].shape[route[0].shape.length-1], function() {

        GetFullAddress.addressStreet = this.Response.View["0"].Result["0"].Location.Address.Street;
        GetFullAddress.HouseNumber = this.Response.View["0"].Result["0"].Location.Address.HouseNumber;


        if(typeof (GetFullAddress.addressStreet && GetFullAddress.HouseNumber) !== 'undefined')  {

            toElem.textContent = GetFullAddress.HouseNumber + ", " + GetFullAddress.addressStreet;

        } else if((typeof (GetFullAddress.addressStreet && GetFullAddress.HouseNumber) === 'undefined') && this.Response.View["0"].Result["0"].Location.Address.District) {

            toElem.textContent = this.Response.View["0"].Result["0"].Location.Address.District

        } else {

            toElem.textContent = this.Response.View["0"].Result["0"].Location.Address.Label
        }
    });

}




/**
 * Creates a series of H.map.Marker points from the route and adds them to the map.
 * @param {Object} route  A route as received from the H.service.RoutingService
 */
function addSummaryToPanel(route){
    var getVia = document.getElementById('viaRoud'),
        getViaAlt = document.getElementById('viaRoudAlt'),

        getDifferentPosition = {};

    for(var i = 0; i < route[0].leg["0"].maneuver.length; i++) {
        if((route[0].leg["0"].maneuver[i].position.latitude + ',' + route[0].leg["0"].maneuver[i].position.longitude) !== (route[1].leg["0"].maneuver[i].position.latitude + ',' + route[0].leg["0"].maneuver[i].position.longitude)) {
            getDifferentPosition.positionMain = route[0].leg["0"].maneuver[i].position.latitude + ',' + route[0].leg["0"].maneuver[i].position.longitude;
            getDifferentPosition.positionAlt = route[1].leg["0"].maneuver[i].position.latitude + ',' + route[0].leg["0"].maneuver[i].position.longitude;
            break
        }
    }

    reverseGeocode(platform, getDifferentPosition.positionMain, function(){
        getVia.textContent = 'via ' + this.Response.View["0"].Result["0"].Location.Address.Street;
    });

    reverseGeocode(platform, getDifferentPosition.positionAlt, function(){
        getViaAlt.textContent = 'via ' + this.Response.View["0"].Result["0"].Location.Address.Street;
    });

    var summaryDiv = document.getElementById('distance'),
        summaryDivAlt = document.getElementById('distanceAlt'),
        distance = route[0].summary.distance / 1000,
        distanceAlt = route[1].summary.distance / 1000,
        altcontent = '',
        content = '';

    content += '<b>' + distance.toFixed(1)  + 'km. <hr id="hrDist">';
    content += 'arrive: ' + route[0].summary.travelTime.toMMSS() + '</b>';
    altcontent += '<b>' + distanceAlt.toFixed(1)  + 'km. <hr id="hrDist">';
    altcontent += 'arrive: ' + route[1].summary.travelTime.toMMSS() + '</b>';
    summaryDiv.innerHTML = content;
    summaryDivAlt.innerHTML = altcontent;



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
    // nodeOL.style.marginLeft ='5%';
    // nodeOL.style.marginRight ='5%';

    nodeOL.className = 'directions';


    // Add a marker for each maneuver
    for (i = 0;  i < route.leg.length; i += 1) {
        for (j = 0;  j < route.leg[i].maneuver.length; j += 1) {
            // Get the next maneuver.
            maneuver = route.leg[i].maneuver[j];
            travelTimers = route.leg[i].maneuver[j].travelTime.toMMS();
            console.log(maneuver.instruction.indexOf('<span class="distance-description">Go for'), '<span class="distance-description">Go for'.length);

            var li = document.createElement('li'),
                spanArrow = document.createElement('span'),
                spanInstruction = document.createElement('span'),
                travelTime = document.createElement('span');


            var routesStr = maneuver.instruction.substring(0, maneuver.instruction.indexOf('<span class="distance-description">Go for'));
            var routesDistance = maneuver.instruction.substring(maneuver.instruction.indexOf('<span class="length">'));
            spanArrow.className = 'arrow '  + maneuver.action;
            spanInstruction.innerHTML = routesStr + "<br>" + routesDistance + " " +  '<hr>';
            travelTime.innerHTML = travelTimers;
            travelTime.classList.add('timer');
            li.classList.add('routesDetailsLi');
            //console.log($("ol.directions:last").addClass('sss'));
            li.style.paddingLeft = '10px';
            li.style.paddingRight = '10px';
            li.appendChild(spanArrow);
            li.appendChild(spanInstruction);
            li.appendChild(travelTime);


            nodeOL.appendChild(li);

        }
    }

    document.getElementById('routesBlock').appendChild(nodeOL);
    $('ol.directions li:last-child .timer').empty();
    $('ol.directions li:last-child hr').detach();
    $('ol.directions li:last-child span br').detach();
}

Number.prototype.toMMS = function () {
    return  this >= 60 || this === 0 ? " " + Math.floor(this / 60)  + ' min': ' <1 min';
};

Number.prototype.toMMSS = function () {
    var date = new Date();
    var options = {
        hour: 'numeric',
        minute: 'numeric'
    };
    date.setMinutes(date.getMinutes() + Math.floor(this / 60));
    return date.toLocaleString("en-US", options) ;

};



