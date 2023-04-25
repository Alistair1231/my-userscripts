// ==UserScript==
// @name         jQuery and common function shortcuts everywhere
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.4
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
  let e = document.createElement('script');
  e.id = 'injected-script';
  e.innerText = "";
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

  function removeIndent(str) {
    const lines = str.split('\n');
    if (lines[0] !== '' || lines[lines.length - 1] !== '') {
      return str;
    }
    lines.shift();
    lines.pop();

    const lens = lines.map(l => l.match(/ */)[0].length)
    const minLen = Math.min(...lens);
    return '\n' + lines.map(l => l.substr(minLen)).join('\n') + '\n';
  }

  const helpString = removeIndent`
    al: jQuery and Method shortcuts everywhere
    ------------------------------------------
    al.js(obj) - JSON.stringify(obj)
    al.jsp(obj) - JSON.stringify(obj, null, 2)
    al.jp(str) - JSON.parse(str)
    al.qs(selector) - document.querySelector(selector)
    al.qsa(selector) - document.querySelectorAll(selector)
    al.gid(id) - document.getElementById(id)
    ------------------------------------------`;

  const shortcuts = removeIndent`
    const al = {
      help: () => console.log(${helpString}),
      js: (obj) => JSON.stringify(obj),
      jsp: (obj) => JSON.stringify(obj, null, 2),
      jp: (str) => JSON.parse(str),
      qs: (selector) => document.querySelector(selector),
      qsa: (selector) => document.querySelectorAll(selector),
      gid: (id) => document.getElementById(id),
    };
`;

  e.innerText += shortcuts;
})();