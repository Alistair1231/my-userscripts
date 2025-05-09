// ==UserScript==
// @name         Youtube Remove Timestamp
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.2.1
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
  // check if on "https://www.youtube.com/watch*", as youtube is a SPA, we need to load the script on the homepage too, but we only want to remove the timestamp on the watch page
  if (!window.location.href.includes("https://www.youtube.com/watch")) {
    // if not on the watch page, return
    return;
  }

  const removeTimestamp = () => {
    console.log("Trying to remove timestamp from URL...");
    // Get all the query parameters from the URL, except for the timestamp
    const search = window.location.search
      .split("&")
      .filter((x) => !x.startsWith("t="))
      .join("&");

    // Update the URL in the address bar without reloading the page
    window.history.pushState(
      null,
      "",
      // build the new URL with the same path and query parameters, but without the timestamp
      `${window.location.origin}${window.location.pathname}${search}`
    );
  };

  // Wait for 10 seconds before updating the URL. If done too quick, Youtube will re-add the timestamp under certain conditions
  while(!window.location.search.includes("t=")) {
    console.log("Waiting for timestamp to be added to URL...");
    // wait for 10 seconds
    await new Promise((resolve) => setTimeout(resolve, 10000));
  }
  removeTimestamp();
  // mutattion observer to watch for new video loads
  const observer = new MutationObserver(() => {
    // check if the URL has a timestamp
    if (window.location.search.includes("t=")) {
      console.log("Timestamp found in URL, removing...");
      setTimeout(removeTimestamp, 2000);
    }
  });
  // start observing the body for changes
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
})();
