// ==UserScript==
// @name         old reddit centered layout
// @namespace    https://greasyfork.org/en/users/12725-alistair1231
// @version      0.2
// @description  makes old reddit centered instead of left-aligned
// @author       Alistair1231
// @match        https://old.reddit.com/r/*
// @icon         https://icons.duckduckgo.com/ip2/reddit.com.ico
// @downloadURL  https://github.com/Auncaughbove17/my-userscripts/raw/main/old-reddit-centered-layout.user.js
// @grant        none
// @license GPL-3.0
// ==/UserScript==

(function() {
    'use strict';

    // fix comment area not being completely visible
    document.querySelector(".res .commentarea > .usertext").style="margin-top:0px;";
    // make the page centered
    document.querySelector("div.content").style="margin:auto;width:50%;";



})();