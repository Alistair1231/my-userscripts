// ==UserScript==
// @name         Youtube Remove Timestamp
// @namespace    https://github.com/Auncaughbove17/my-userscripts/
// @version      0.3.3
// @description  Removes the timestamp from URL, so it doesn't invalidate your progress when you reload the page.
// @author       Alistair1231
// @match        https://mapgenie.io/*
// @icon         https://icons.duckduckgo.com/ip2/mapgenie.io.ico
// @license      MIT
// ==/UserScript==
// https://greasyfork.org/en/scripts/464497-mapgenie-smaller-icon-size
// https://openuserjs.org/scripts/Alistair1231/MapGenie_-_Smaller_Icon_Size

(function () {
  "use strict";
  // Get all the query parameters from the URL, except for the timestamp
  search = window.location.search.split("&").filter((x) => !x.startsWith("t="));
  window.history.pushState(
    null,
    "",
    // build the new URL with the same path and query parameters, but without the timestamp
    `${window.location.origin}${window.location.pathname}${search}`
  );
})();
