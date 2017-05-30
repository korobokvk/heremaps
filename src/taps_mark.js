var svgMarkup = `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="40px" height="40px" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
viewBox="0 0 662 662"
 xmlns:xlink="http://www.w3.org/1999/xlink">
 <defs>
  <style type="text/css">
   <![CDATA[
    .fil2 {fill:none}
    .fil0 {fill:#9B5AB5}
    .fil1 {fill:white;fill-rule:nonzero}
   ]]>
  </style>
   <clipPath id="id0">
    <path d="M0 0l662 0 0 662 -662 0 0 -662z"/>
   </clipPath>
 </defs>
 <g id="Слой_x0020_1">
  <metadata id="CorelCorpID_0Corel-Layer"/>
  <g>
  </g>
  <g style="clip-path:url(#id0)">
   <g>
    <path class="fil0" d="M331 39c128,0 233,104 233,233 0,33 -7,65 -20,94 -35,79 -158,176 -213,257 -55,-81 -178,-179 -213,-258 -13,-28 -20,-60 -20,-93 0,-129 104,-233 233,-233zm0 170c28,0 51,23 51,51 0,28 -23,51 -51,51 -28,0 -51,-23 -51,-51 0,-28 23,-51 51,-51z"/>
    <path class="fil1" d="M331 17c70,0 134,29 180,75 46,46 75,109 75,180 0,18 -2,35 -6,52 -4,18 -9,35 -16,51 -22,48 -72,101 -122,154 -36,37 -71,73 -93,106l-18 27 -18 -27c-22,-33 -58,-69 -93,-106 -50,-53 -101,-106 -122,-155 -7,-16 -13,-32 -16,-50 -4,-17 -6,-34 -6,-52 0,-71 29,-134 75,-180 46,-46 110,-75 180,-75zm149 106c-38,-38 -91,-62 -149,-62 -58,0 -111,24 -149,62 -38,38 -62,91 -62,149 0,15 2,29 5,43 3,14 7,28 13,41 18,42 66,93 114,142 28,30 56,59 79,88 23,-29 51,-58 79,-88 47,-49 95,-99 114,-141 6,-13 10,-27 13,-42 3,-14 5,-28 5,-43 0,-58 -24,-111 -62,-149zm-149 64c20,0 38,8 52,21 13,14 21,32 21,52 0,20 -8,39 -21,52 -14,13 -32,21 -52,21 -20,0 -38,-8 -52,-21l0 0c-13,-14 -21,-32 -21,-52 0,-20 8,-38 21,-52 13,-13 32,-21 52,-21zm20 53c-5,-6 -12,-9 -20,-9 -8,0 -15,3 -21,9 -5,5 -8,12 -8,20 0,8 3,15 8,21l0 0c6,5 13,8 21,8 8,0 15,-3 20,-8 6,-6 9,-13 9,-21 0,-8 -3,-15 -9,-20z"/>
   </g>
  </g>
  <polygon class="fil2" points="0,0 662,0 662,662 0,662 "/>
 </g>
</svg>`;
var bears;

function orderMarkers(lat, lng) {
    var bearsIcon = new H.map.Icon(svgMarkup),
        bearsMarker = new H.map.Marker({lat: lat, lng: lng },
            {icon: bearsIcon});
    bears = bearsMarker;
    map.addObject(bearsMarker);


}

function removeMarkers() {
    map.removeObject(bears);
}

