// ==UserScript==
// @name         Old Reddit Side Bar Max Width of 20vw
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.1.0
// @description  limits the width of the side bar to 20vw
// @downloadURL  https://github.com/Alistair1231/my-userscripts/raw/master/reddit-side-bar-max-width.user.js
// @author       Alistair1231
// @match        https://old.reddit.com/*
// @icon         https://icons.duckduckgo.com/ip2/github.com.ico
// @grant        GM.addStyle
// @license MIT
// ==/UserScript==
// https://github.com/Alistair1231/my-userscripts/raw/master/reddit-side-bar-max-width.user.js

(() => {
  GM.addStyle(`
    .side {
        max-width: 20vw;
    }
    `);
})();
