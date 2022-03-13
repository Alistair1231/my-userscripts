// ==UserScript==
// @name         Anilist links on MAL
// @namespace    https://greasyfork.org/en/users/12725-alistair1231
// @version      0.1.1
// @description  adds anilist links to mal
// @author       Alistair1231
// @match        https://myanimelist.net/anime/*
// @icon         https://icons.duckduckgo.com/ip2/anilist.co.ico
// @grant       none
// @require https://code.jquery.com/jquery-3.6.0.min.js
// @downloadURL  https://github.com/Auncaughbove17/my-userscripts/raw/main/Anilist-links-on-MAL.user.js
// @license GPL-3.0
// ==/UserScript==

(function (window, undefined) {
    let jQ = jQuery;
    console.log("in run");
    
    let anidb = document.createElement('a');
    anidb.href="https://duckduckgo.com/?q=!ducky+" + $(".title-name.h1_bold_none strong")[0].innerHTML + "+site%3Aanilist.co%2Fanime";
    anidb.target="_blank";
    anidb.innerHTML="Anilist";
    
    let myDiv= jQ("h2:contains(\"External Links\")").next();
    jQ(myDiv).append(", ")
    jQ(myDiv).append(anidb);
})(window);
