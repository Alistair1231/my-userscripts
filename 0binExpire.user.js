// ==UserScript==
// @name         0bin.net auto-select never expire
// @namespace    https://greasyfork.org/en/users/12725-alistair1231
// @version      0.1
// @description  auto selects never expire when making a paste
// @author       Alistair1231
// @match        https://0bin.net/
// @grant        none
// @downloadURL  https://gist.github.com/Auncaughbove17/1efc6138988425c938e6289736ada85d/raw/0binExpire.user.js
// @license GPL-3.0
// ==/UserScript==


(function() {
    'use strict';
    document.getElementById("expiration").value="never";
    // Your code here...
})();