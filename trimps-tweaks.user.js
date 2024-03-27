// ==UserScript==
// @name         Trimps Tweaks
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.1.3
// @description  various tweaks for Trimps
// @downloadURL  https://github.com/Alistair1231/my-userscripts/raw/master/trimps-tweaks.user.js
// @author       Alistair1231
// @match        https://trimps.github.io/
// @icon         https://icons.duckduckgo.com/ip2/github.io.ico
// @license MIT
// ==/UserScript==
// https://github.com/Alistair1231/my-userscripts/raw/master/trimps-tweaks.user.js

const addSaveLabel = () => {
  const run = () => {
    const exportDiv = [...document.querySelectorAll("#settingsTable div")].find(x => x.innerHTML === "Export");
    if (exportDiv) {
      exportDiv.innerHTML += " (F8)";
      return true;
    }
    return false;
  }
  // try to run immediately, if it fails, wait for the settings to load
  if(run()) return;

  new Promise(resolve => {
    const observer = new MutationObserver(() => {
      const target = document.querySelector("#settingsTable div");
      if (target) {
        observer.disconnect();
        resolve();
      }
    });
    observer.observe(document.body, {childList: true, subtree: true});
  }).then(run);
}
(async () => {
  'use strict';
  document.addEventListener('keydown', (e) => {
    if (e.key === 'F8') {
      e.preventDefault();
      navigator.clipboard.writeText(window.save(true));
    }
  });

  addSaveLabel();

  // when pressing F5, first autoSave() then reload the page
  document.addEventListener('keydown', (e) => {
    if (e.key === 'F5') {
      e.preventDefault();
      window.autoSave();
      window.location.reload();
    }
  });

})();