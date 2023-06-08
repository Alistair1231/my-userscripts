// ==UserScript==
// @name         IGG-Games show last edit date
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.0.3
// @description  Show the last edit date of the game on IGG-Games
// @author       Alistair1231
// @icon         https://icons.duckduckgo.com/ip2/igg-games.com.ico
// @grant        none
// @match        https://igg-games.com/*
// @license MIT
// ==/UserScript==

(async function() {

function tryGetDate() {
    return new Promise((resolve, reject) => {
      const preDate = document.querySelector("article meta[property*='date']");
      if (preDate === null) {
        setTimeout(tryGetDate, 500);
      } else {
        resolve(preDate);
      }
    });
  }

preDate= await tryGetDate()

dateString = new Date(preDate.content).toLocaleDateString("en-US", {
year: "numeric",
month: "long",
day: "numeric"
});


document.querySelector("p time").append(
` (last update ${dateString})`
)
  // Your code here...
})();