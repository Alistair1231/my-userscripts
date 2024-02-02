// ==UserScript==
// @name         System Rescue add Max width
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.1.0
// @description  adds a max width to the system-rescue.org website, so that it doesn't stretch too much on wide screens
// @author       Alistair1231
// @match        https://www.system-rescue.org/*
// @icon         https://icons.duckduckgo.com/ip2/system-rescue.org.ico
// @license      MIT
// @grant        GM_addStyle
// ==/UserScript==
// https://github.com/Alistair1231/my-userscripts/raw/master/system-rescue.org-maxWidth.user.js

(function () {

GM_addStyle(`
#wrapper {
    margin: auto;
    max-width: 1270px;
}`);


})();