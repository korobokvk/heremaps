function addMarkersToMap(map) {
    var svgMarkup = `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="40px" height="40px" version="1.1" style="shape-rendering:geometricPrecision; text-rendering:geometricPrecision; image-rendering:optimizeQuality; fill-rule:evenodd; clip-rule:evenodd"
viewBox="0 0 665 665"
 xmlns:xlink="http://www.w3.org/1999/xlink">
 <defs>
  <style type="text/css">
   <![CDATA[
    .fil2 {fill:none}
    .fil0 {fill:#2ECB72}
    .fil1 {fill:white;fill-rule:nonzero}
   ]]>
  </style>
   <clipPath id="id0">
    <path d="M0 0l665 0 0 665 -665 0 0 -665z"/>
   </clipPath>
 </defs>
 <g id="Слой_x0020_1">
  <metadata id="CorelCorpID_0Corel-Layer"/>
  <g>
  </g>
  <g style="clip-path:url(#id0)">
   <g>
    <path class="fil0" d="M333 39c129,0 233,105 233,234 0,34 -7,66 -20,94 -35,80 -158,178 -213,259 -56,-81 -180,-179 -215,-259 -12,-29 -19,-60 -19,-94 0,-129 104,-234 234,-234zm0 171c28,0 51,23 51,51 0,29 -23,52 -51,52 -29,0 -52,-23 -52,-52 0,-28 23,-51 52,-51z"/>
    <path class="fil1" d="M333 17c70,0 134,29 181,75 46,46 75,110 75,181 0,18 -2,36 -6,53 -4,18 -9,34 -16,50 -22,50 -73,103 -123,155 -36,37 -71,74 -93,107l-18 27 -19 -27c-22,-33 -57,-70 -93,-107 -50,-52 -101,-106 -123,-155 -7,-16 -12,-33 -16,-50 -4,-17 -5,-35 -5,-53 0,-71 28,-135 75,-181 46,-46 110,-75 181,-75zm149 106c-38,-38 -91,-62 -149,-62 -59,0 -112,24 -150,62 -38,39 -62,92 -62,150 0,15 1,30 4,44 3,14 8,28 14,41 18,42 66,93 114,143 28,29 57,59 80,88 22,-29 51,-59 79,-88 48,-50 96,-100 114,-142 6,-14 11,-28 14,-42 3,-14 4,-29 4,-44 0,-58 -24,-111 -62,-150zm-149 65c20,0 38,8 51,22 14,13 22,31 22,51 0,21 -8,39 -22,52 -13,14 -31,22 -51,22 -21,0 -39,-8 -52,-22l0 0c-14,-13 -22,-31 -22,-52 0,-20 8,-38 22,-51 13,-14 31,-22 52,-22zm20 53c-5,-5 -12,-9 -20,-9 -8,0 -16,4 -21,9 -5,5 -8,12 -8,20 0,8 3,16 8,21l0 0c5,5 12,8 21,8 8,0 15,-3 20,-8 5,-5 9,-13 9,-21 0,-8 -4,-15 -9,-20z"/>
   </g>
  </g>
  <polygon class="fil2" points="0,0 665,0 665,665 0,665 "/>
 </g>
</svg>`;
    var bearsIcon = new H.map.Icon(svgMarkup),
        bearsMarker = new H.map.Marker({lat: 37.5739, lng: -122.3593 },
            {icon: bearsIcon});
    map.addObject(bearsMarker);
}
addMarkersToMap(map);