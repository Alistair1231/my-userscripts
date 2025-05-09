// ==UserScript==
// @name         Youtube Remove Timestamp
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.1.4
// @description  Removes the timestamp from URL, so it doesn't invalidate your progress when you reload the page.
// @author       Alistair1231
// @match        https://www.youtube.com/watch*
// @icon         https://icons.duckduckgo.com/ip2/youtube.com.ico
// @license      MIT
// ==/UserScript==
// https://greasyfork.org/en/scripts/535336-youtube-remove-timestamp/
// https://github.com/Alistair1231/my-userscripts/blob/master/youtube-remove-timestamp.user.js

(function () {
  "use strict";
  
  const removeTimestamp = () => {
    
  
  // Wait for 10 seconds before updating the URL. If done too quick, Youtube will re-add the timestamp under certain conditions
  setTimeout(() => {
    removeTimestamp();
  }, 10000);
})();
