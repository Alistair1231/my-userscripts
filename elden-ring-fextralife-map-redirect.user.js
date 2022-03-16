// ==UserScript==
// @name         Elden Ring Fextralife fullscreen map redirect
// @namespace    https://greasyfork.org/en/users/12725-alistair1231
// @version      0.1.1
// @description  redirects to fullscreen map when opening a map link
// @author       Alistair1231
// @match        https://eldenring.wiki.fextralife.com/Interactive+Ma*
// @match        https://eldenring.wiki.fextralife.com/Interactive+ma*
// @match        https://eldenring.wiki.fextralife.com/interactive+ma*
// @match        https://eldenring.wiki.fextralife.com/interactive+Ma*
// @icon         https://icons.duckduckgo.com/ip2/fextralife.com.ico
// @grant        none
// @downloadURL  https://gist.github.com/Auncaughbove17/1efc6138988425c938e6289736ada85d/raw/elden-ring-fextralife-map-redirect.user.js
// @license GPL-3.0
// ==/UserScript==

(function() {
    'use strict';
    var map = Array.from(document.getElementsByTagName("iframe")).filter(x => x.classList.contains("interactivemapcontainer") && x.parentElement.parentElement.style.display!="none")[0];
    document.location=map.src;
})();


