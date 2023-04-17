// ==UserScript==
// @name         Anilist links on MAL
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.2.2
// @description  adds anilist links to mal
// @author       Alistair1231
// @match        https://myanimelist.net/anime/*
// @match        https://www.google.com/url?q=*
// @icon         https://icons.duckduckgo.com/ip2/myanimelist.net.ico
// @grant none
// @require none
// @downloadURL  https://gist.github.com/Alistair1231/1efc6138988425c938e6289736ada85d/raw/Anilist-links-on-MAL.user.js
// @license GPL-3.0
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
    var anilistLink = `https://www.google.com/search?btnI=I&q=${document.querySelector(".title-name.h1_bold_none strong").innerHTML}+site%3Aanilist.co%2Fanime`;
    var anilistIcon = "https://icons.duckduckgo.com/ip2/anilist.co.ico";

    // array from all div.external_links -> get the last one -> get the first child -> add the button before that
    [...document.querySelectorAll("div.external_links")].splice(-1)[0].firstChild.before(
        createButton(anilistLink, anilistIcon, "Anilist")
    );
    
    // code to automatically redirect to the google search result
    document.querySelector("body>div>div>font>b").innerHTML=="Redirect Notice" && document.querySelector("body>div>a").click();
})(window);
