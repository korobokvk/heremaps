function moveMapToBerlin(map){
    map.setCenter({lat:37.5739, lng:-122.3593});
    map.setZoom(14);
}

/**
 * Boilerplate map initialization code starts below:
 */

//Step 1: initialize communication with the platform
var platform = new H.service.Platform({
    app_id: 'e7ofwHOWmAV2s8KnY4Xi',
    app_code: 'cJXpDGMrI0ssliwAJ-drRA',
    useCIT: true,
    useHTTPS: true
});
var defaultLayers = platform.createDefaultLayers();

//Step 2: initialize a map  - not specificing a location will give a whole world view.
var map = new H.Map(document.getElementById('map'),
    defaultLayers.normal.map);

//Step 3: make the map interactive
// MapEvents enables the event system
// Behavior implements default interactions for pan/zoom (also on mobile touch environments)
var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

// Create the default UI components
var ui = H.ui.UI.createDefault(map, defaultLayers);

// Now use the map as required...

moveMapToBerlin(map);

