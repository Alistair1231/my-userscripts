// ==UserScript==
// @name         Pastebin auto select Unlisted
// @namespace    https://github.com/Auncaughbove17/my-userscripts/
// @version      0.1.2
// @description  auto selects unlisted when making a paste
// @author       Alistair1231
// @include      https://pastebin.com/edit/*
// @include      https://pastebin.com/clone/*
// @include      https://pastebin.com/
// @downloadURL  https://github.com/Auncaughbove17/my-userscripts/raw/main/pastebinUnlisted.user.js
// @grant        none
// @license GPL-3.0
// ==/UserScript==

(function() {
    'use strict';
    document.getElementById("postform-status").value=1;
    document.getElementById("select2-postform-status-container").innerHTML="Unlisted";
    // Your code here...
})();