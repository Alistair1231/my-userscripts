// ==UserScript==
// @name         goodreads search on fantastic fiction
// @namespace    https://greasyfork.org/en/users/12725-alistair1231
// @version      0.1
// @description  adds button to goodreads for searching on fantastic fiction 
// @author       Alistair1231
// @match        https://www.goodreads.com/book/show/*
// @require https://code.jquery.com/jquery-3.6.0.min.js
// @icon         https://icons.duckduckgo.com/ip2/goodreads.com.ico
// @grant        none
// @license GPL-3.0
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

})();