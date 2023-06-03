// ==UserScript==
// @name         fantastic fiction search on goodreads
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.1.3
// @description  adds button to fantastic fiction for searching on goodreads
// @author       Alistair1231
// @match        https://www.fantasticfiction.com/*
// @icon         https://icons.duckduckgo.com/ip2/fantasticfiction.com.ico
// @require https://code.jquery.com/jquery-3.6.0.min.js
// @license      MIT
// ==/UserScript==


function createEntry(text,link){
    var span = document.createElement("span");
    span.style="float:left; vertical-align:middle;"
    span.innerHTML = `
        <font size="+1">
            <strong>${text}</strong>
        </font> &nbsp;
        <a href="${link}">
            <button>
                Search
            </button>
        </a>
    `;
    return span;
}

(function() {
    'use strict';
    let j = jQuery;

    var author = j(".ff span[itemprop='author']").children(0).children()[0].outerText;
    var title= j(".bookheading").children()[0].innerText;
    var link = `https://www.goodreads.com/search?q=${title}+${author}`;
    var entry = createEntry("Search on Goodreads",link);
    j(j("#book-shop").children()[0]).after(
        document.createElement("br"),
        document.createElement("br"),
        entry);
})();
