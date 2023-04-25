// ==UserScript==
// @name         jQuery and common function shortcuts everywhere
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.4.2
// @description  injects jquery if not exists
// @author       Alistair1231
// @match      *://*/*
// @downloadURL  https://github.com/Alistair1231/my-userscripts/raw/main/jQuery-and-common-function-shortcuts-everywhere.user.js
// @grant        GM_xmlhttpRequest
// @license GPL-3.0
// ==/UserScript==
// https://greasyfork.org/en/scripts/439017-jquery-and-common-function-shortcuts-everywhere
(function () {
  'use strict';

  const helpString = `
al: jQuery and Method shortcuts everywhere
------------------------------------------
al.js(obj) - JSON.stringify(obj)
al.jsp(obj) - JSON.stringify(obj, null, 2)
al.jp(str) - JSON.parse(str)
al.qs(selector) - document.querySelector(selector)
al.qsa(selector) - document.querySelectorAll(selector)
al.gid(id) - document.getElementById(id)
------------------------------------------`;

  const shortcuts = `
const al = {
  help: () => console.log('${helpString}'),
  js: (obj) => JSON.stringify(obj),
  jsp: (obj) => JSON.stringify(obj, null, 2),
  jp: (str) => JSON.parse(str),
  qs: (selector) => document.querySelector(selector),
  qsa: (selector) => document.querySelectorAll(selector),
  gid: (id) => document.getElementById(id)
};
`;

  let e = document.createElement('script');
  e.id = 'injectedScript';
  e.innerText = shortcuts;
  document.head.appendChild(e);

  if (typeof jQuery == 'undefined') {
    // https://stackoverflow.com/questions/54499985/how-can-i-load-an-external-script-on-a-webpage-using-tampermonkey
    GM_xmlhttpRequest({
      method: "GET",
      // from other domain than the @match one (.org / .com):
      url: "https://code.jquery.com/jquery-3.6.0.min.js",
      onload: (ev) => {
        e.innerText += ev.responseText;
        jQuery.noConflict();
      }
    });
  }


})();