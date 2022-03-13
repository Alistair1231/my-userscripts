// ==UserScript==
// @name         Pastebin auto select Unlisted
// @namespace    https://greasyfork.org/en/users/12725-alistair1231
// @version      0.1
// @description  auto selects unlisted when making a paste
// @author       Alistair1231
// @include      https://pastebin.com/edit/*
// @include      https://pastebin.com/clone/*
// @include      https://pastebin.com/
// @downloadURL  https://gist.github.com/Auncaughbove17/1efc6138988425c938e6289736ada85d/raw/pastebinUnlisted.user.js
// @grant        none
// @license GPL-3.0
// ==/UserScript==

(function() {
    'use strict';
    document.getElementById("postform-status").value=1;
    document.getElementById("select2-postform-status-container").innerHTML="Unlisted";
    // Your code here...
})();