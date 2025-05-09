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

  // Debounce function to avoid spamming
  function debounce(fn, delay) {
    let timer = null;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => fn.apply(this, args), delay);
    };
  }

  // Listen for YouTube navigation events
  function addListeners() {
    // YouTube fires this event on navigation
    window.addEventListener("yt-navigate-finish", debouncedRemove);
    // Fallback for browser navigation
    window.addEventListener("popstate", debouncedRemove);
  }

  // Poll for URL changes as a fallback (SPA navigation)
  function pollUrlChange() {
    setInterval(() => {
      if (location.href !== lastUrl) {
        lastUrl = location.href;
        debouncedRemove();
      }
    }, 1000);
  }

  const debouncedRemove = debounce(removeTimestamp, 1000);

  // Wait for 10 seconds before first run (as in your script)
  setTimeout(() => {
    removeTimestamp();
    addListeners();
    pollUrlChange();
  }, 4000);
})();