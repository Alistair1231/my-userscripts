// ==UserScript==
// @name         Audible series copy ids
// @namespace    https://greasyfork.org/en/users/12725-alistair1231
// @version      0.1
// @description  adds button do ccopy id of an audiobook in the series view
// @downloadURL  https://github.com/Auncaughbove17/my-userscripts/raw/main/audible-series-copy-ids.user.js
// @author       Alistair1231
// @match        https://www.audible.*/series/*-Audiobooks/*
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

const createButton = ($text, $id, $addWhere) => {
    // parent div with link and copy notification p
    var $div = document.createElement("div");
    $div.className = "bc-row bc-spacing-top-micro";

    // create link
    var $a = document.createElement("a"); 
    $a.className = "bc-button-text";
    $a_id="ab-id-" + $id;
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
    $p_id= "ab-id-copy-" + $id;
    $p.id=$p_id;
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

    // log all ids
    var $ids=getIds();
    $ids.forEach(x => console.log(x));

    document.querySelectorAll("div[data-widget='productList'] li.bc-list-item .adblBuyBoxArea").forEach(x => {
        x.appendChild(createButton("Copy ID", $ids.shift(), x.id));
    })


})();