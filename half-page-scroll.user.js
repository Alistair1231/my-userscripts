// ==UserScript==
// @name         Half page (up/down) scroll
// @namespace    https://greasyfork.org/en/users/12725-alistair1231
// @version      0.1
// @description  scrolls half a page when pressing page up / down
// @author       Alistair1231
// @match        *://*/*
// @grant        unsafeWindow
// @require      https://code.jquery.com/jquery-3.3.1.min.js
// @downloadURL  https://github.com/Auncaughbove17/my-userscripts/raw/main/half-page-scroll.user.js
// @license GPL-3.0
// ==/UserScript==

(function () {
    'use strict';

    jQuery(unsafeWindow).on('keydown', function (e) {
        // page down
        if (e.keyCode === 34) {
            e.preventDefault();
            unsafeWindow.scrollBy(0, unsafeWindow.innerHeight / 2)
            console.log("page down")
        }
        // page up
        else if (e.keyCode === 33) {
            e.preventDefault();
            unsafeWindow.scrollBy(0, -unsafeWindow.innerHeight / 2)
            console.log("page up")
        }

    });

})();
