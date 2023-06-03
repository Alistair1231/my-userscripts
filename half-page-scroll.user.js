// ==UserScript==
// @name         Half page (up/down) scroll
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.2.0
// @description  scrolls half a page when pressing page up / down
// @author       Alistair1231
// @match        *://*/*
// @grant        none
// @downloadURL  https://github.com/Alistair1231/my-userscripts/raw/main/half-page-scroll.user.js
// @license      GPL-3.0
// ==/UserScript==

(function () {
    'use strict';

    document.addEventListener('keydown', function (e) {
        // page down
        if (e.key === "PageDown") {
            e.preventDefault();
            window.scrollBy(0, window.innerHeight*.45);
            console.log("page down");
        }
        // page up
        else if (e.key === "PageUp") {
            e.preventDefault();
            window.scrollBy(0, -window.innerHeight*.45);
            console.log("page up");
        }
    });

})();
