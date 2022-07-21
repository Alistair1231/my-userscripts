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

function getBookTitle(el){
	var bookTitle = el.innerHTML.trim().split('<', 1)+'';
	console.log("Book title: " + bookTitle.trim());
	return bookTitle.trim();
}

(function() {
    'use strict';
    var title = 

    var buttonUl = getButtonList();
    var ffButton = createEntry("Search Fantastic Fiction", "https://www.fantasticfiction.com/search/?searchfor=book&keywords=Aether+Mage+Dante+King");
    buttonUl[0].appendChild(ffButton);
})();