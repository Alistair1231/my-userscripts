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
      // Your navigation code here
      console.log('URL changed:', lastUrl);
    }
  }, 200); // 200ms is a good balance
  

  function removeTimestamp() {
    if (!window.location.href.includes("https://www.youtube.com/watch")) return;

    const params = new URLSearchParams(window.location.search);
    if (params.has("t")) {
      params.delete("t");
      const newUrl =
        window.location.origin +
        window.location.pathname +
        (params.toString() ? "?" + params.toString() : "") +
        window.location.hash;
      window.history.replaceState(null, "", newUrl);
      console.log("Timestamp removed from URL.");
    }
  }

  // Wait for 10 seconds before first run (as in your script)
  setTimeout(() => {
    removeTimestamp();
    addListeners();
    pollUrlChange();
  }, 4000);
})();