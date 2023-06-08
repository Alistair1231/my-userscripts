// ==UserScript==
// @name         igg-games/bluemediafiles auto continue after wait
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.6
// @description  waits for cooldown and clicks continue
// @author       Alistair1231
// @match        http*://*/*
// @license      MIT
// ==/UserScript==
// https://greasyfork.org/en/scripts/425739-igg-games-bluemediafiles-auto-continue-after-wait
// https://openuserjs.org/scripts/Alistair1231/igg-gamesbluemediafiles_auto_continue_after_wait/
// https://github.com/Alistair1231/my-userscripts/raw/master/iggAutoContinue.user.js

(function () {
    'use strict';
    if (window.location.href.match((/.*bluemedia.*url-generator-?\d+?.php/)).length>0) {
        // waiting for countown
        var clickButton;
        var count = 0;
        var interval = setInterval(() => {
            clickButton = document.getElementById("nut");
            count++;
            console.log("Waited " + count + " seconds");
            if (clickButton.src !== "") {
                //clicking
                clickButton.parentElement.submit();
                clearInterval(interval);
            }
        }, 1000);
    }
})();
