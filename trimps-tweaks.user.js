// ==UserScript==
// @name         Trimps Tweaks
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.1.1
// @description  various tweaks for Trimps
// @downloadURL  https://github.com/Alistair1231/my-userscripts/raw/master/trimps-tweaks.user.js
// @author       Alistair1231
// @match        https://trimps.github.io/
// @icon         https://icons.duckduckgo.com/ip2/github.io.ico
// @license MIT
// ==/UserScript==
// https://github.com/Alistair1231/my-userscripts/raw/master/trimps-tweaks.user.js

(() => {
  'use strict';
  document.addEventListener('keydown', (e) => {
    if (e.key === 'F8') {
      e.preventDefault();
      navigator.clipboard.writeText(window.save(true));
    }
  });
  // Add label to save button
  [...document.querySelectorAll("#settingsTable div")].filter(x => x.innerHTML === "Export")[0].innerHTML+=" (F8)"

  // when pressing F5, first autoSave() then reload the page
  document.addEventListener('keydown', (e) => {
    if (e.key === 'F5') {
      e.preventDefault();
      window.autoSave();
      window.location.reload();
    }
  });

})();