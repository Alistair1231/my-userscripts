// ==UserScript==
// @name         Audible series copy ids
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.3.2
// @description  adds button do ccopy id of an audiobook in the series view
// @downloadURL  https://github.com/Alistair1231/my-userscripts/raw/master/audible-series-copy-ids.user.js
// @author       Alistair1231
// @match        https://www.audible.com/series/*
// @match        https://www.audible.de/series/*
// @match        https://www.audible.nl/series/*
// @match        https://www.audible.co.uk/series/*
// @icon         https://icons.duckduckgo.com/ip2/audible.com.ico
// @grant        none
// @license GPL-3.0
// ==/UserScript==

const getIds = (entries) => {
    // links that aren't searches for the author and aren't "not available" links (they need to have a href attribute)
    var links = entries.map(x => x.querySelector("a.bc-link[href]:not([href*='search?searchAuthor'])"))

    // get all ids
    var ids = links.map(x => x?.href.replace(/.*\/([\w\d]+)\?.*/g, "$1"))
    return ids;
}

const createClickToCopy = (idToMakeClickable, idClickedNotifier, valueToCopy) => {
    document.getElementById(idToMakeClickable).addEventListener("click", function () {
        navigator.clipboard.writeText(valueToCopy);
        document.getElementById(idClickedNotifier).innerHTML = "Copied!";
        setTimeout(function () {
            document.getElementById(idClickedNotifier).innerHTML = '';
        }, 1000);
    });
}

const createButton = ($text, $id, $addWhere) => {
    // parent div with link and copy notification p
    var $div = document.createElement("div");
    $div.className = "bc-row bc-spacing-top-micro";

    // create link
    var $a = document.createElement("a");
    $a.className = "bc-button-text";
    $a_id = "ab-id-" + $id;
    $a.id = $a_id;
    $a.setAttribute("role", "button");
    $a.setAttribute("tabindex", "0");

    // span that houses the link
    var $span = document.createElement("span");
    $span.className = "bc-button bc-button-primary bc-spacing-top-mini bc-button-small";

    // span with the text
    var $spanText = document.createElement("span");
    $spanText.className = "bc-text bc-button-text-inner bc-size-action-small";
    $spanText.innerHTML = $text;

    // create copy notification p
    var $p = document.createElement("p");
    $p_id = "ab-id-copy-" + $id;
    $p.id = $p_id;
    $p.style = "font-size: 9px;margin-left: 10px;";


    $span.appendChild($a);      // add link into outer span
    $a.appendChild($spanText);  // add span with text into link
    $div.appendChild($span);    // add outer span to parent div

    // add copy notification p to parent div
    $div.appendChild($p);

    // add parent div to page
    document.getElementById($addWhere).appendChild($div);

    // make clickable
    console.log($a_id, $p_id, $id);
    createClickToCopy($a_id, $p_id, $id);

    return $div;
}



(function () {
    'use strict';

    var entries = Array.from(document.querySelectorAll("li.bc-list-item.productListItem"))

    // buyBoxArea
    var addWhere = document.querySelectorAll("div[data-widget='productList'] li.bc-list-item .adblBuyBoxArea")

    // log all ids
    var ids = getIds(entries);
    ids.forEach(x => console.log(x));


    document.querySelectorAll("div[data-widget='productList'] li.bc-list-item .adblBuyBoxArea").forEach(x => {
        var id= ids.shift();
        if(id){
            x.appendChild(createButton("Copy ID", id, x.id));
        }
    })


})();