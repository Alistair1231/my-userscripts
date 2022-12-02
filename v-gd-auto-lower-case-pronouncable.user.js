// ==UserScript==
// @name         v.gd auto lower case pronouncable
// @namespace    https://github.com/Auncaughbove17/my-userscripts/
// @version      0.1
// @description  automatically select lower-case pronouncable
// @author       Alistair1231
// @match        https://v.gd/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=v.gd
// @downloadURL  https://github.com/Auncaughbove17/my-userscripts/raw/main/v-gd-auto-lower-case-pronouncable.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';
    document.querySelector("#shorturllabel label").click();
    setTimeout(function () {
        document.querySelector("#options #r3").click();
        setTimeout(function () {
            if(document.location.href.split('/')[3] == "create.php"){
                document.querySelector("input#short_url").select();
            }
            else{
                document.querySelector("#urlboxcontainer input").select();
            }
        },100);
    }, 100);
})();