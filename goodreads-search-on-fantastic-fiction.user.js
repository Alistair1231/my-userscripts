// ==UserScript==
// @name         goodreads search on fantastic fiction
// @namespace    https://greasyfork.org/en/users/12725-alistair1231
// @version      0.1
// @description  adds button to goodreads for searching on fantastic fiction 
// @author       Alistair1231
// @match        https://www.goodreads.com/book/show/*
// @require https://code.jquery.com/jquery-3.6.0.min.js
// @icon         https://icons.duckduckgo.com/ip2/goodreads.com.ico
// @downloadURL  https://github.com/Auncaughbove17/my-userscripts/raw/main/goodreads-search-on-fantastic-fiction.user.js
// @grant        none
// @license GPL-3.0
// ==/UserScript==

// Inspired by Slengpung (https://greasyfork.org/en/users/78880) "Goodreads Plus" script

function createEntry(text,link){
    var button = document.createElement("li");
    button.innerHTML = `<a id="ffLink" href="${link}" target="_blank" class="buttonBar">${text}</a>`;
    button.className = "Button";
    return button;
}

function getButtonList(){
    var buttonBar = document.getElementById("buyButtonContainer");
    if (buttonBar === null || buttonBar == "null") {
        buttonBar = document.getElementById("asyncBuyButtonContainer");
    }
    return buttonBar.getElementsByTagName("ul");
}

(function() {
    'use strict';
    var title = jQuery('#bookTitle').html().trim();
    var author = jQuery('.authorName span[itemprop="name"]').html();
    var series= jQuery('#bookSeries a')
        .html() // get text
        .trim() // remove whitespace
        .replace(/[\(\)]/g,'') // remove parentheses
        .replace(/ #\d+$/,''); // remove series number

    var buttonUl = getButtonList();
    var ffButton1 = createEntry("Search FF (title)", `https://www.fantasticfiction.com/search/?searchfor=book&keywords=${title}+${author}`);
    buttonUl[0].appendChild(ffButton1);
    var ffButton2 = createEntry("Search FF (series)", `https://www.fantasticfiction.com/search/?searchfor=series&keywords=${series}`);
    buttonUl[0].appendChild(ffButton2);
})();