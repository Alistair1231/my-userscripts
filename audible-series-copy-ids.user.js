// ==UserScript==
// @name         Audible series copy ids
// @namespace    https://greasyfork.org/en/users/12725-alistair1231
// @version      0.1
// @description  adds button do ccopy id of an audiobook in the series view
// @downloadURL  https://github.com/Auncaughbove17/my-userscripts/raw/main/audible-series-copy-ids.user.js
// @author       Alistair1231
// @match        https://www.audible.com/series/*-Audiobooks/*
// @icon         https://icons.duckduckgo.com/ip2/audible.com.ico
// @grant        none
// @license GPL-3.0
// ==/UserScript==

const getIds = () => {
    var ids = [];
    Array.from(document.querySelectorAll("div[data-widget='productList'] li.bc-list-item h3.bc-heading a")).forEach(x=>{
        ids.push(x.href.replace(/.*?Audiobook\/([\d\w]+)\?.*/gm, `$1`));
    });
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

const createButton = ($text, $id) => {
    // parent div with link and copy notification p
    var $div = document.createElement("div");

    // create link
    var $a = document.createElement("a");
    $a.href = "#";
    $a.className = "bc-button-text";
    $a.id = "ab-id-" + $id;
    $a.setAttribute("role", "button");
    $a.setAttribute("tabindex", "0");

    // create link text
    var $span = document.createElement("span");
    $span.className = "bc-text bc-button-text-inner bc-size-action-small";
    $span.textContent = $text;

    // create copy notification p
    var $p = document.createElement("p");
    $p.id = "ab-id-copy-" + $id;
    $p.style = "font-size: 9px;margin-left: 10px;";

    // add link text into link
    $a.appendChild($span);

    // add link to parent div
    $div.appendChild($a);

    // add copy notification p to parent div
    $div.appendChild($p);

    // make clickable
    createClickToCopy($a.id, $p.id, $id);

    return $div;
}



(function () {
    'use strict';

    // log all ids
    getIds().forEach(x => { console.log(x.href.replace(/.*?Audiobook\/([\d\w]+)\?.*/gm, `$1`)) });

    document.querySelectorAll("div[data-widget='productList'] li.bc-list-item .adblBuyBoxArea").forEach(x => {
        $element = document.createElement("span")
        $element.innerHTML = "test"
        // add element under buy button
        x.parentElement.appendChild($element)
    })


})();