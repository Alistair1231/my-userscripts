// ==UserScript==
// @name         0bin.net auto-select never expire
// @namespace    https://github.com/Auncaughbove17/my-userscripts/
// @version      0.1.2
// @description  auto selects never expire when making a paste
// @author       Alistair1231
// @match        https://0bin.net/
// @grant        none
// @downloadURL  https://github.com/Auncaughbove17/my-userscripts/raw/main/0binExpire.user.js
// @license GPL-3.0
// ==/UserScript==


(function() {
    'use strict';
    document.getElementById("expiration").value="never";
    // Your code here...
})();