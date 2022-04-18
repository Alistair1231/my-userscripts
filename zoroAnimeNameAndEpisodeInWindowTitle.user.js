// ==UserScript==
// @name         zoro.to anime name and episode number as windw title
// @namespace    https://greasyfork.org/en/users/12725-alistair1231
// @version      0.1
// @description  sets anime name and episode number as windw title on zoro.to
// @author       Alistair1231
// @match        https://zoro.to/watch/*?ep=*
// @icon         https://icons.duckduckgo.com/ip2/zoro.to.ico
// @grant        none
// @downloadURL  https://github.com/Auncaughbove17/my-userscripts/raw/main/zoroAnimeNameAndEpisodeInWindowTitle.user.js
// @license GPL-3.0
// ==/UserScript==


(function () {
    'use strict';
    var interval = setInterval(() => {
        if (document.querySelector(".server-notice b") == null) {
            return;
        }
        var animeName = document.querySelector(".dynamic-name.text-white").title;
        var episodeNumber = document.querySelector(".server-notice b").innerText;
        document.title = animeName + " - " + episodeNumber;
    },300);

})();