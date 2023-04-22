// ==UserScript==
// @name         Replace Youtube Embeds with Yewtube (invidious) Embeds
// @namespace    https://github.com/Auncaughbove17/my-userscripts/
// @version      0.1
// @description  Replaces youtube embeds with yewtube (invidious) embeds
// @author       Alistair1231
// @match        http*://*/*
// @grant        none
// @license      GPL-3.0
// ==/UserScript==

(function() {
    'use strict';
   
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            [...mutation.addedNodes].forEach(function(node) {
                if (node.tagName === "IFRAME" && node.src.includes("https://www.youtube.com/embed")) {
                    node.src = node.src.replace("https://www.youtube.com/embed", "https://yewtu.be/embed");
                }
            });
        });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
})();
