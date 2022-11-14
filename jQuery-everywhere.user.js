// ==UserScript==
// @name         jQuery everywhere
// @namespace    https://github.com/Auncaughbove17/my-userscripts/
// @version      0.3.1
// @description  injects jquery if not exists
// @author       Alistair1231
// @match      *://*/*
// @downloadURL  https://github.com/Auncaughbove17/my-userscripts/raw/main/jQuery-everywhere.user.js
// @grant        GM_xmlhttpRequest
// @license GPL-3.0
// ==/UserScript==

(function() {
    'use strict';
    if(typeof jQuery=='undefined') {
        // https://stackoverflow.com/questions/54499985/how-can-i-load-an-external-script-on-a-webpage-using-tampermonkey
        GM_xmlhttpRequest({
            method : "GET",
            // from other domain than the @match one (.org / .com):
            url : "https://code.jquery.com/jquery-3.6.0.min.js",
            onload : (ev) =>
            {
              let e = document.createElement('script');
              e.innerText = ev.responseText;
              document.head.appendChild(e);
              jQuery.noConflict();
            }
          });
    }
})();