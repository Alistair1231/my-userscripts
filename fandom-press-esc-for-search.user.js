// ==UserScript==
// @name         Fandom press ESC for search
// @namespace    https://github.com/Auncaughbove17/my-userscripts/
// @version      0.1.1
// @description  when you press esc on a fandom wiki it will now open and select the search bar
// @author       Alistair1231
// @match        *://*.fandom.com/wiki/*
// @grant        unsafeWindow
// @downloadURL  https://github.com/Auncaughbove17/my-userscripts/raw/main/fandom-press-esc-for-search.user.js
// @license GPL-3.0
// ==/UserScript==


(function () {
    'use strict';
    // observe for changes in the document body
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            // check if the mutation is a node insertion
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                for (var i = 0; i < mutation.addedNodes.length; i++) {
                    var node = mutation.addedNodes[i];
                    document.querySelector(".resizable-container").style.maxWidth = "80%";
                }
            }
        });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    var active = false;
    

    window.addEventListener('keydown', function (e) {
        // escape
        if (e.keyCode === 27) {
            e.preventDefault();
            console.log(active);
            // close search if it is open
            if (active) {
                document.getElementById('firstHeading').click();
                active = false;
            }
            // open search
            else {
                var searchButton = document.querySelector("header.fandom-community-header a.wiki-tools__search[title='Search']");
                if (searchButton) {
                    searchButton.click();
                    active = true;

                }
            }
        }
    });

})();