// ==UserScript==
// @name         Fandom press ESC for search
// @namespace    https://greasyfork.org/en/users/12725-alistair1231
// @version      0.1
// @description  when you press esc on a fandom wiki it will now open and select the search bar
// @author       Alistair1231
// @match        *://*.fandom.com/wiki/*
// @grant        unsafeWindow
// @downloadURL  https://github.com/Auncaughbove17/my-userscripts/raw/main/fandom-press-esc-for-search.user.js
// @license GPL-3.0
// ==/UserScript==

(function () {
    'use strict';
    var active =false;
    jQuery(unsafeWindow).on('keydown', function (e) {
        // escape
        if (e.keyCode === 27) {
            e.preventDefault();
            console.log(active);
            // close search if it is open
            if(active){
                document.getElementById('firstHeading').click();   
                active=false;
            }
            // open search
            else{
                document.querySelector("header.fandom-community-header a.wiki-tools__search[title='Search']").click();   
                // select search bar
                setTimeout(() => document.querySelector("div.search-modal input[data-testid='search-modal-input']").click(), 100);
                active=true;
            }
        }
    });

})();
