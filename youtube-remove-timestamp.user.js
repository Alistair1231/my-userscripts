// ==UserScript==
// @name         Youtube Remove Timestamp
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.1.0
// @description  Removes the timestamp from URL, so it doesn't invalidate your progress when you reload the page.
// @author       Alistair1231
// @match        https://www.youtube.com/watch*
// @icon         https://icons.duckduckgo.com/ip2/youtube.com.ico
// @license      MIT
// ==/UserScript==
// https://greasyfork.org/en/scripts/464497-mapgenie-smaller-icon-size
// https://github.com/Alistair1231/my-userscripts/blob/master/youtube-remove-timestamp.user.js
(function () {
  "use strict";
  // Get all the query parameters from the URL, except for the timestamp
  search = window.location.search.split("&").filter((x) => !x.startsWith("t="));
  
  // Update the URL in the address bar without reloading the page
  window.history.pushState(
    null,
    "",
    // build the new URL with the same path and query parameters, but without the timestamp
    `${window.location.origin}${window.location.pathname}${search}`
  );
})();
