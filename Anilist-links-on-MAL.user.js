// ==UserScript==
// @name         Anilist links on MAL
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.3.2
// @description  adds anilist links to mal
// @author       Alistair1231
// @match        https://myanimelist.net/anime/*
// @icon         https://icons.duckduckgo.com/ip2/myanimelist.net.ico
// @license      MIT
// ==/UserScript==

function createButton(href, icon, textContent) {
    var link = document.createElement("a");
    link.href = href;
    link.target = "_blank";
    link.className = "link ga-click";

    var img = document.createElement("img");
    img.src = icon;
    img.className = "link_icon";
    img.alt = "icon";

    link.appendChild(img);

    var div = document.createElement("div");
    div.className = "caption";
    div.textContent = textContent;

    link.appendChild(div);

    return link;
}

(function (window, undefined) {
    var anilistLink = `https://duckduckgo.com/?q=!anilist+${document.querySelector(".title-name.h1_bold_none strong").innerHTML}`;
    var livechartLink = `https://duckduckgo.com/?q=!livec+${document.querySelector(".title-name.h1_bold_none strong").innerHTML}`;

    // array from all div.external_links -> get the last one -> get the first child -> add the button before that
    [...document.querySelectorAll("div.external_links")].splice(-1)[0].firstChild.before(
        createButton(anilistLink, "https://icons.duckduckgo.com/ip2/anilist.co.ico", "Anilist"),
        createButton(livechartLink, "https://icons.duckduckgo.com/ip2/livechart.me.ico", "livechart.me")
    );
})(window);
