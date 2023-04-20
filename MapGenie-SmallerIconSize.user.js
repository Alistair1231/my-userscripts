// ==UserScript==
// @name         MapGenie - Smaller Icon Size
// @namespace    https://github.com/Auncaughbove17/my-userscripts/
// @version      0.1.1
// @description  Makes the icons smaller on the map, so you can see more of the map at once.
// @author       Alistair1231
// @match        https://mapgenie.io/*
// @icon         https://icons.duckduckgo.com/ip2/mapgenie.io.ico
// @downloadURL  https://github.com/Alistair1231/my-userscripts/raw/main/MapGenie-SmallerIconSize.user.js
// @license GPL-3.0
// ==/UserScript==

(function () {

    function setIconSize() {
      // Get the current zoom level
      var zoom = map.getZoom();
      var maxZoom = map.getMaxZoom();
      var minZoom = map.getMinZoom();
      // Loop through all the symbols on the 'locations' layer
      map.queryRenderedFeatures({
        layers: ['locations','notes','suggestions'],
        filter: ['==', '$type', 'Point']
      }).forEach(function (feature) {
        // Set the new icon size based on the current zoom level
        var newIconSize = Math.max(0.2, Math.min(1, (zoom - 4) / maxZoom)); // Adjust the minimum and maximum size as needed
        map.setLayoutProperty('locations', 'icon-size', newIconSize, ['==', 'locationId', feature.properties.locationId]);
      });
    }
    if (typeof map !== "undefined") {
      map.on('zoom', function () {
        setIconSize();
      });
    }
  })();