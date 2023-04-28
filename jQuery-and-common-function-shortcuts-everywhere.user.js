// ==UserScript==
// @name         jQuery and common function shortcuts everywhere
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.4.5
// @description  injects jquery if not exists and adds some common function shortcuts to the window object. See al.help() for details.
// @author       Alistair1231
// @match        *://*/*
// @downloadURL  https://github.com/Alistair1231/my-userscripts/raw/main/jQuery-and-common-function-shortcuts-everywhere.user.js
// @grant        GM_xmlhttpRequest
// @license      GPL-3.0
// ==/UserScript==
// https://greasyfork.org/en/scripts/439017-jquery-and-common-function-shortcuts-everywhere
(function () {
  'use strict';

  const shortcuts = `
const bl = {
  help: () => console.log('al: jQuery and Method shortcuts everywhere\n------------------------------------------\nal.cl(str) - console.log(str)\nal.js(obj) - JSON.stringify(obj)\nal.jsp(obj) - JSON.stringify(obj, null, 2)\nal.jp(str) - JSON.parse(str)\nal.qs(selector) - document.querySelector(selector)\nal.qsa(selector) - document.querySelectorAll(selector)\nal.gid(id) - document.getElementById(id)\n------------------------------------------'),
  cl: (str) => console.log(str),
  js: (obj) => JSON.stringify(obj),
  jsp: (obj) => JSON.stringify(obj, null, 2),
  jp: (str) => JSON.parse(str),
  qs: (selector) => document.querySelector(selector),
  qsa: (selector) => document.querySelectorAll(selector),
  gid: (id) => document.getElementById(id)
};
`;

  const e = document.createElement('script');
  e.id = 'injectedScript';
  e.innerText = shortcuts;
  document.head.appendChild(e);

})();