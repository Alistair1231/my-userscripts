// ==UserScript==
// @name         Trimps Tweaks
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.2.0
// @description  various tweaks for Trimps
// @downloadURL  https://github.com/Alistair1231/my-userscripts/raw/master/trimps-tweaks.user.js
// @author       Alistair1231
// @match        https://trimps.github.io/
// @icon         https://icons.duckduckgo.com/ip2/github.io.ico
// @license MIT
// ==/UserScript==
// https://github.com/Alistair1231/my-userscripts/raw/master/trimps-tweaks.user.js

const getSave = () => window.save(true);
const setSave = (save) => window.load(save);

const copy = async (text) => await window.navigator.clipboard.writeText(text);
const paste = () => prompt('Paste save here');

const addHotkey = (key, action) => {
  document.addEventListener('keydown', (e) => {
    if (e.key === key) action(e);
  });
}

const addLabel = (selector,filter,value) => {
  const run = () => {
    const exportDiv = [...document.querySelectorAll(selector)].find(x => x.innerHTML === filter);
    if (exportDiv) {
      exportDiv.innerHTML += value;
      return true;
    }
    return false;
  }
  // try to run immediately, if it fails, wait for the settings to load
  if (run()) return;

  new Promise(resolve => {
    const observer = new MutationObserver(() => {
      const target = document.querySelector(selector);
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
  // copy save to clipboard when pressing F8
  addHotkey('F8', (e) => {
    e.preventDefault();
    copy(getSave());
  });

  addHotkey('F9', async (e) => {
    e.preventDefault();
    console.log('Backup save:', getSave());
    setSave(paste());
  });

  // add (F8) to the export button
  addLabel("#settingsTable div","Export"," (F8)");
  addLabel("#settingsTable div","Import"," (F9)");

})();