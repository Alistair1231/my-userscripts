// ==UserScript==
// @name         faloop.app copy map locations
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.1.5
// @description  copy map location when clicked
// @author       Alistair1231
// @match        https://faloop.app/*
// @icon         https://icons.duckduckgo.com/ip2/faloop.app.ico
// @grant        none
// @require https://code.jquery.com/jquery-3.6.0.min.js
// @downloadURL  https://github.com/Alistair1231/my-userscripts/raw/main/faloop-app-copy-map-locations.user.js
// @license GPL-3.0
// ==/UserScript==



(function (window, undefined) {
    'use strict';

    new MutationObserver(() => {
        // blue dots
        jQuery("div[class^=ZoneMap_poi] div span[class*=blue]").each(function () {
            // add click event
            jQuery(this).click(function () {
                // copy value to clipboard
                navigator.clipboard.writeText($(this).attr("data-pr-tooltip"))
            });
        });
        // aetherytes
        jQuery("div[class^=ZoneMap_poi] span[class*=aether]").each(function () {
            // add click event
            jQuery(this).click(function () {
                // copy value to clipboard
                navigator.clipboard.writeText($(this).attr("data-pr-tooltip"))
            });
        });
    }).observe(document, { subtree: true, childList: true });


    
})(window);
