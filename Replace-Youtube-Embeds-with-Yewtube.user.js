// ==UserScript==
// @name         Replace Youtube Embeds with Yewtube (invidious) Embeds
// @namespace    https://github.com/Auncaughbove17/my-userscripts/
// @version      0.1
// @description  Replaces youtube embeds with yewtube (invidious) embeds
// @author       Alistair1231
// @match        http*://*/*
// @grant        none
// @downloadURL  https://github.com/Alistair1231/my-userscripts/raw/main/Replace-Youtube-Embeds-with-Yewtube.user.js
// @license      GPL-3.0
// ==/UserScript==

const qSA = x => document.querySelectorAll(x);
const replaceIframe = (iframe) => {
    iframe.src = iframe.src.replace("https://www.youtube.com/embed", "https://yewtu.be/embed");
}

(function () {
    'use strict';
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.type == "childList") {
                // check for new youtube embeds and replace them with invidious embeds
                qSA("iframe[src*='https://www.youtube.com/embed']").forEach(replaceIframe);
            }

        });
    });

    // run this once for each iframe that is already on the page
    qSA("iframe[src*='https://www.youtube.com/embed']").forEach(replaceIframe);

    // keep observing for new iframes and run code from above
    observer.observe(document, { childList: true, subtree: true });
})();
