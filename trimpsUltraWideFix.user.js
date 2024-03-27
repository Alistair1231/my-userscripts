// ==UserScript==
// @name         Trimps Ultra Wide Fix
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.1.2
// @description  loads Trimps in an iframe with 16:10 aspect ratio
// @downloadURL  https://github.com/Alistair1231/my-userscripts/raw/master/trimpsUltraWideFix.user.js
// @author       Alistair1231
// @match        https://trimps.github.io/
// @icon         https://icons.duckduckgo.com/ip2/github.io.ico
// @grant        GM.addStyle
// @grant        unsafeWindow
// @license MIT
// ==/UserScript==
// https://github.com/Alistair1231/my-userscripts/raw/master/trimpsUltraWideFix.user.js
// https://greasyfork.org/en/scripts/491030-trimps-ultra-wide-fix

(() => {
  'use strict';


  //only run if aspect ratio is wider than 16:9
  if ((window.innerWidth / window.innerHeight) > (16 / 9)) {
    return;
  }
  // do not run in iframes
  if (window.self !== window.top) {
    return;
  }
  // clear page
  document.body.innerHTML = '';

  // load current page in iframe with dimensions 16:10
  const iframe = document.createElement('iframe');
  iframe.src = location.href;

  // set iframe size, hieght = window.innerHeight, width 100% unless it is wider than 16:10
  iframe.style.height = '100vh';
  iframe.style.width = '100%';
  iframe.style.maxWidth = '160vh'; // 16:10 aspect ratio (160vh = 16/10 * 100vh)

  // center iframe horizontally
  iframe.style.position = 'absolute';
  iframe.style.left = '50%';
  iframe.style.transform = 'translateX(-50%)';

  document.body.appendChild(iframe);
})();