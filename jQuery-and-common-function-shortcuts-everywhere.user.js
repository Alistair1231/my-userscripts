// ==UserScript==
// @name         jQuery and common function shortcuts everywhere
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.4.8
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
const helpString = `
'\
al: jQuery and Method shortcuts everywhere\\n\
------------------------------------------\\n\
al.cl(str) - console.log(str)\\n\
al.js(obj) - JSON.stringify(obj)\\n\
al.jsp(obj) - JSON.stringify(obj, null, 2)\\n\
al.jp(str) - JSON.parse(str)\\n\
al.qs(selector) - document.querySelector(selector)\\n\
al.qsa(selector) - document.querySelectorAll(selector)\\n\
al.gid(id) - document.getElementById(id)\\n\
al.print() - Prints the object definition\\n\
al.cc() - navigator.clipboard.writeText(str)\\n\
------------------------------------------\\n\
'
`;

const shortcuts = `
const al = {
  help: () => console.log(${helpString}),
  cl: (str) => console.log(str),
  js: (obj) => JSON.stringify(obj),
  jsp: (obj) => JSON.stringify(obj, null, 2),
  jp: (str) => JSON.parse(str),
  qs: (selector) => document.querySelector(selector),
  qsa: (selector) => document.querySelectorAll(selector),
  gid: (id) => document.getElementById(id),
  cc: (str) => navigator.clipboard.writeText(str),
  print: () => {
    const { help, ...rest } = al;
    console.log(rest);
  }
};
`;

  const e = document.createElement('script');
  e.id = 'injectedScript';
  e.innerText = shortcuts;

  document.head.appendChild(e);

})();