// ==UserScript==
// @name         fantastic fiction search on goodreads
// @namespace    https://greasyfork.org/en/users/12725-alistair1231
// @version      0.1.1
// @description  adds button to fantastic fiction for searching on goodreads
// @author       Alistair1231
// @match        https://www.fantasticfiction.com/k/*
// @icon         https://icons.duckduckgo.com/ip2/fantasticfiction.com.ico
// @grant        none
// @downloadURL  https://github.com/Auncaughbove17/my-userscripts/raw/main/fantastic-fiction-search-on-goodreads.user.js
// @license GPL-3.0
// ==/UserScript==


(function() {
    'use strict';
    
    var author = jQuery(".ff span[itemprop='author']").children(0).children()[0].outerText;
    

})();