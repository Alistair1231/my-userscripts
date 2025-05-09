// ==UserScript==
// @name         Youtube Remove Timestamp
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.2.3
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

  // Debounce utility
  function debounce(fn, delay) {
    let timer = null;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  function removeTimestamp() {
    if (!window.location.href.includes("https://www.youtube.com/watch")) {
      return;
    }

    // Only proceed if there is a timestamp to remove
    if (!window.location.search.includes("t=")) {
      return;
    }

    // Get all the query parameters from the URL, except for the timestamp
    const search = window.location.search
      .split("&")
      .filter((x) => !x.startsWith("t="))
      .join("&");

    // Update the URL in the address bar without reloading the page
    window.history.pushState(
      null,
      "",
      `${window.location.origin}${window.location.pathname}${search}`
    );
    console.log("Timestamp found in URL, removing...");
  };

  
  setTimeout(() => {
    removeTimestamp();
    const observer = new MutationObserver((mutations) => {
      // Only act if new nodes have been added
      if (mutations.some((m) => m.addedNodes.length > 0)) {
        // Only call if there's a timestamp
        if (window.location.search.includes("t=")) {
          // Debounced to avoid spamming
          debounce(removeTimestamp, 1000);
        }
      }
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  }, 4000);
})();
