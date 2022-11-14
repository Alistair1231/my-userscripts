// ==UserScript==
// @name         old reddit centered layout
// @namespace    https://github.com/Auncaughbove17/my-userscripts/
// @version      0.3.1
// @description  makes old reddit centered instead of left-aligned
// @author       Alistair1231
// @match        https://old.reddit.com/r/*
// @match        https://old.reddit.com/
// @icon         https://icons.duckduckgo.com/ip2/reddit.com.ico
// @downloadURL  https://github.com/Auncaughbove17/my-userscripts/raw/main/old-reddit-centered-layout.user.js
// @grant        none
// @license GPL-3.0
// ==/UserScript==

function fixMainPage(){
    document.querySelector(".sitetable").style = "margin:auto;width:60%;";
}
function fixCommentPage(){
    document.querySelector(".res .commentarea > .usertext").style = "margin-top:0px;";
    document.querySelector("div.content").style = "margin:auto;width:60%;";
}

(function () {
    'use strict';
    
    if(document.URL.startsWith("https://old.reddit.com/r/"))
        fixCommentPage();
    else
       fixMainPage();
})();


