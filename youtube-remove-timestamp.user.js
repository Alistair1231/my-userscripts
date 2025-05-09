// ==UserScript==
// @name         Youtube Remove Timestamp
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.3.0
// @description  Removes the timestamp from URL, so it doesn't invalidate your progress when you reload the page.
// @author       Alistair1231
// @match        https://www.youtube.com/*
// @icon         https://icons.duckduckgo.com/ip2/youtube.com.ico
// @license      MIT
// ==/UserScript==
// https://greasyfork.org/en/scripts/535336-youtube-remove-timestamp/
// https://github.com/Alistair1231/my-userscripts/blob/master/youtube-remove-timestamp.user.js

(function () {
  "use strict";

  let lastUrl = location.href;
  setInterval(() => {
    if (location.href !== lastUrl) {
      lastUrl = location.href;
      removeTimestamp();
    }
  }, 200); // 200ms is a good balance
  

  function removeTimestamp() {
    if (!window.location.href.includes("https://www.youtube.com/watch")) return;
    console.log("Removing timestamp from URL, if present");

    // Get all the query parameters from the URL, except for the timestamp
    const search = window.location.search.split("&").filter((x) => !x.startsWith("t=")).join("&");
    // Update the URL in the address bar without reloading the page

    window.history.pushState(
      null,
      "",
      // build the new URL with the same path and query parameters, but without the timestamp
      `${window.location.origin}${window.location.pathname}${search}`
    );
  }

  // Wait for 10 seconds before first run (as in your script)
  setTimeout(() => {
    removeTimestamp();
    addListeners();
    pollUrlChange();
  }, 4000);
})();