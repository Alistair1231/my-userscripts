// ==UserScript==
// @name         IGG-Games show last edit date
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.0.1
// @description  Show the last edit date of the game on IGG-Games
// @author       Alistair1231
// @icon         https://icons.duckduckgo.com/ip2/igg-games.com.ico
// @grant        none
// @match        https://igg-games.com/*
// @license MIT
// ==/UserScript==

(function() {
  'use strict';
preDate=document.querySelector("article meta[property*='date']").content
dateString = new Date(preDate).toLocaleDateString("en-US", {
year: "numeric",
month: "long",
day: "numeric"
});


document.querySelector("p time").append(
` (last update ${dateString})`
)
  // Your code here...
})();