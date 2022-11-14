// ==UserScript==
// @name         is.gd auto pronouncable
// @namespace    https://github.com/Auncaughbove17/my-userscripts/
// @version      3.1.1
// @description  auto selects 'lowercase pronouncable'
// @author       Alistair1231
// @match        https://is.gd/
// @match        https://is.gd/create.php
// @match        https://is.gd/index.php
// @downloadURL  https://github.com/Auncaughbove17/my-userscripts/raw/main/isgd.user.js
// @grant        none
// @license GPL-3.0
// @copyright 2020, Alistair1231 (https://openuserjs.org/users/Alistair1231)
// ==/UserScript==

(function() {
    'use strict';
    // click more options (technically not necessary)
    document.getElementById("shorturllabel").children[0].click();
    // select lower-case pronouncable
    document.getElementById("options").children[4].checked=true;

    var page = window.location.pathname.split('/')[1];
    // if on create.php highlight shorted url
    if(page === "create.php"){
        document.getElementById("short_url").select();
    }
    // If on main page highlight long url input
    else if(page == "index.php" || page === ""){
        document.getElementById("urlboxcontainer").children[0].select();
    }
})();