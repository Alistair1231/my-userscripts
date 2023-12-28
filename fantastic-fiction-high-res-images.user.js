// ==UserScript==
// @name         High res images on fantasticfiction.com
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.2.1
// @description  replaces low res images on hideoutshowcase with high res ones
// @author       Alistair1231
// @match        https://www.fantasticfiction.com/*
// @icon         https://icons.duckduckgo.com/ip2/fantasticfiction.com.ico
// @license      MIT
// ==/UserScript==
// https://github.com/Alistair1231/my-userscripts/raw/master/fantastic-fiction-high-res-images.user.js

(function () {
  // From:    https://m.media-amazon.com/images/I/516s5YwK2HL.SX316.SY480._SL500_.jpg
  // To:      https://m.media-amazon.com/images/I/516s5YwK2HL.jpg
  // https://regex101.com/r/yoj8UD/1
  const replaceAllImages = () => {
    [...document.querySelectorAll("img")].map(
      (x) => (x.src = x.src.replace(/(?:[\._]+?S[XLY]\d+_?){3}(?=\.jpg)/gm, ""))
    );
  };

  const observer = new MutationObserver(replaceAllImages);
  observer.observe(document.body, { childList: true, subtree: true });

  replaceAllImages();
})();
