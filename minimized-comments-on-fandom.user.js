// ==UserScript==
// @name         Minimized Comments on Fandom
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.1
// @description  Wraps the #articleComments element inside a details tag using MutationObserver
// @match        http://*.fandom.com/*
// @downloadURL  https://github.com/Alistair1231/my-userscripts/raw/main/minimized-comments-on-fandom.user.js
// @license MIT
// ==/UserScript==

(function () {
    'use strict';

    // Function to wrap the #articleComments element inside a <details> tag
    function wrapCommentsInDetails() {
        var articleComments = document.getElementById('articleComments');
        console.log(articleComments);
        console.log(articleComments.parentElement.tagName);
        if (articleComments && articleComments.parentElement.tagName !== 'DETAILS') {
            articleComments.innerHTML = '<details><summary>Comments</summary>' + articleComments.innerHTML + '</details>';
        }
    }
    // mutationobserver that waits for the #articleComments element to be added to the DOM
    var observer = new MutationObserver(function (mutations) {
        mutations.forEach(function (mutation) {
            if (mutation.addedNodes.length) {
                wrapCommentsInDetails();
            }
        });
    }
    );
    // observer.observe(document.body, {
    //     childList: true,
    //     subtree: true
    // });

    function runAtStart() {
        if (document.querySelector('#articleComments') === null) {
            setTimeout(runAtStart, 500);
        }
        else{
            alert("ready");
            wrapCommentsInDetails();
        }
    }
})();
