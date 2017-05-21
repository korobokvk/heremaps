/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

//
// import setUpClickListener from './get_coords'
// console.log(setUpClickListener);
// var bubble;
// function calculateRouteFromAtoB (platform) {
//     var router = platform.getRoutingService(),
//         routeRequestParams = {
//             mode: 'fastest;car',
//             representation: 'display',
//             routeattributes : 'waypoints,summary,shape,legs',
//             maneuverattributes: 'direction,action',
//             waypoint0: '37.69355613985834,-122.47931119636486', // Brandenburg Gate
//             waypoint1: setUpClickListener // Friedrichstraße Railway Station
//         };
//
//
//     router.calculateRoute(
//         routeRequestParams,
//         onSuccess,
//         onError
//     );
// }
// /**
//  * This function will be called once the Routing REST API provides a response
//  * @param  {Object} result          A JSONP object representing the calculated route
//  *
//  * see: http://developer.here.com/rest-apis/documentation/routing/topics/resource-type-calculate-route.html
//  */
// function onSuccess(result) {
//     var route = result.response.route[0];
//     /*
//      * The styling of the route response on the map is entirely under the developer's control.
//      * A representitive styling can be found the full JS + HTML code of this example
//      * in the functions below:
//      */
//     addRouteShapeToMap(route);
//     addManueversToMap(route);
//
//     addWaypointsToPanel(route.waypoint);
//     addManueversToPanel(route);
//     addSummaryToPanel(route.summary);
//     // ... etc.
// }
//
// /**
//  * This function will be called if a communication error occurs during the JSON-P request
//  * @param  {Object} error  The error message received.
//  */
// function onError(error) {
//     alert('Ooops!');
// }
//
// var mapContainer = document.getElementById('map'),
//     routeInstructionsContainer = document.getElementById('panel');
//
// function openBubble(position, text){
//     if(!bubble){
//         bubble =  new H.ui.InfoBubble(
//             position,
//             // The FO property holds the province name.
//             {content: text});
//         ui.addBubble(bubble);
//     } else {
//         bubble.setPosition(position);
//         bubble.setContent(text);
//         bubble.open();
//     }
// }
//
//
// /**
//  * Creates a H.map.Polyline from the shape of the route and adds it to the map.
//  * @param {Object} route A route as received from the H.service.RoutingService
//  */
// function addRouteShapeToMap(route){
//     var strip = new H.geo.Strip(),
//         routeShape = route.shape,
//         polyline;
//
//     routeShape.forEach(function(point) {
//         var parts = point.split(',');
//         strip.pushLatLngAlt(parts[0], parts[1]);
//     });
//
//     polyline = new H.map.Polyline(strip, {
//         style: {
//             lineWidth: 4,
//             strokeColor: 'rgba(0, 128, 255, 0.7)'
//         }
//     });
//     // Add the polyline to the map
//     map.addObject(polyline);
//     // And zoom to its bounding rectangle
//     map.setViewBounds(polyline.getBounds(), true);
// }
//
//
// /**
//  * Creates a series of H.map.Marker points from the route and adds them to the map.
//  * @param {Object} route  A route as received from the H.service.RoutingService
//  */
// function addManueversToMap(route){
//     var svgMarkup = '<svg width="18" height="18" ' +
//             'xmlns="http://www.w3.org/2000/svg">' +
//             '<circle cx="8" cy="8" r="8" ' +
//             'fill="#1b468d" stroke="white" stroke-width="1"  />' +
//             '</svg>',
//         dotIcon = new H.map.Icon(svgMarkup, {anchor: {x:8, y:8}}),
//         group = new  H.map.Group(),
//         i,
//         j;
//
//     // Add a marker for each maneuver
//     for (i = 0;  i < route.leg.length; i += 1) {
//         for (j = 0;  j < route.leg[i].maneuver.length; j += 1) {
//             // Get the next maneuver.
//             maneuver = route.leg[i].maneuver[j];
//             // Add a marker to the maneuvers group
//             var marker =  new H.map.Marker({
//                     lat: maneuver.position.latitude,
//                     lng: maneuver.position.longitude} ,
//                 {icon: dotIcon});
//             marker.instruction = maneuver.instruction;
//             group.addObject(marker);
//         }
//     }
//
//     group.addEventListener('tap', function (evt) {
//         map.setCenter(evt.target.getPosition());
//         openBubble(
//             evt.target.getPosition(), evt.target.instruction);
//     }, false);
//
//     // Add the maneuvers group to the map
//     map.addObject(group);
// }
//
//
// /**
//  * Creates a series of H.map.Marker points from the route and adds them to the map.
//  * @param {Object} route  A route as received from the H.service.RoutingService
//  */
// function addWaypointsToPanel(waypoints){
//
//
//
//     var nodeH3 = document.createElement('h3'),
//         waypointLabels = [],
//         i;
//
//
//     for (i = 0;  i < waypoints.length; i += 1) {
//         waypointLabels.push(waypoints[i].label)
//     }
//
//     nodeH3.textContent = waypointLabels.join(' - ');
//
//     routeInstructionsContainer.innerHTML = '';
//     routeInstructionsContainer.appendChild(nodeH3);
// }
//
// /**
//  * Creates a series of H.map.Marker points from the route and adds them to the map.
//  * @param {Object} route  A route as received from the H.service.RoutingService
//  */
// function addSummaryToPanel(summary){
//     var summaryDiv = document.createElement('div'),
//         content = '';
//     content += '<b>Total distance</b>: ' + summary.distance  + 'm. <br/>';
//     content += '<b>Travel Time</b>: ' + summary.travelTime.toMMSS() + ' (in current traffic)';
//
//
//     summaryDiv.style.fontSize = 'small';
//     summaryDiv.style.marginLeft ='5%';
//     summaryDiv.style.marginRight ='5%';
//     summaryDiv.innerHTML = content;
//     routeInstructionsContainer.appendChild(summaryDiv);
// }
//
// /**
//  * Creates a series of H.map.Marker points from the route and adds them to the map.
//  * @param {Object} route  A route as received from the H.service.RoutingService
//  */
// function addManueversToPanel(route){
//
//
//
//     var nodeOL = document.createElement('ol'),
//         i,
//         j;
//
//     nodeOL.style.fontSize = 'small';
//     nodeOL.style.marginLeft ='5%';
//     nodeOL.style.marginRight ='5%';
//     nodeOL.className = 'directions';
//
//     // Add a marker for each maneuver
//     for (i = 0;  i < route.leg.length; i += 1) {
//         for (j = 0;  j < route.leg[i].maneuver.length; j += 1) {
//             // Get the next maneuver.
//             maneuver = route.leg[i].maneuver[j];
//
//             var li = document.createElement('li'),
//                 spanArrow = document.createElement('span'),
//                 spanInstruction = document.createElement('span');
//
//             spanArrow.className = 'arrow '  + maneuver.action;
//             spanInstruction.innerHTML = maneuver.instruction;
//             li.appendChild(spanArrow);
//             li.appendChild(spanInstruction);
//
//             nodeOL.appendChild(li);
//         }
//     }
//
//     routeInstructionsContainer.appendChild(nodeOL);
// }
//
//
// Number.prototype.toMMSS = function () {
//     return  Math.floor(this / 60)  +' minutes '+ (this % 60)  + ' seconds.';
// }
//
// // Now use the map as required...
// calculateRouteFromAtoB (platform);

/***/ })
/******/ ]);