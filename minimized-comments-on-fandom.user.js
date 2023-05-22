// ==UserScript==
// @name         Minimized Comments on Fandom
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.1
// @description  Wraps the #articleComments element inside a details tag using MutationObserver
// @match        http://*.fandom.com/*
// @downloadURL  https://github.com/Alistair1231/my-userscripts/raw/main/minimized-comments-on-fandom.user.js
// @license MIT
// ==/UserScript==

(function() {
    'use strict';

    // Function to wrap the #articleComments element inside a <details> tag
    function wrapCommentsInDetails() {
        var articleComments = document.getElementById('articleComments');

        if (articleComments) {
            articleComments.innerHTML = '<details><summary>Comments</summary>' + articleComments.innerHTML + '</details>';
        }
    }

    // Create a new instance of MutationObserver
    var observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            // Check if the #articleComments element has been added or changed
            if (mutation.addedNodes.length > 0 || mutation.type === 'characterData') {
                wrapCommentsInDetails();
            }
        });
    });

    // Start observing changes to the document body and its descendants
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        characterData: true
    });

    // Wrap the initial #articleComments element if it exists
    wrapCommentsInDetails();
})();
