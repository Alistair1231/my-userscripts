// ==UserScript==
// @name         High res images on hideoutshowcase
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.1
// @description  replaces low res images on hideoutshowcase with high res ones
// @author       Alistair1231
// @match        https://hideoutshowcase.com/*
// @icon         https://icons.duckduckgo.com/ip2/hideoutshowcase.com.ico
// @license      MIT
// ==/UserScript==
// https://github.com/Alistair1231/my-userscripts/raw/master/hideoutshowcase-highResImages.user.js
const replaceAllImages = () => {
  [...document.querySelectorAll("div a.nk-post-image img")].map(
    (x) => (x.src = x.src.replace("/other", "/gallery"))
  );
};

const observer = new MutationObserver(replaceAllImages);
observer.observe(document.body, { childList: true, subtree: true });
