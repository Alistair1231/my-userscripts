// ==UserScript==
// @name         Trimps Ultra Wide Fix
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.1.0
// @description  loads Trimps in an iframe with 16:10 aspect ratio
// @downloadURL  https://github.com/Alistair1231/my-userscripts/raw/master/trimpsUltraWideFix.user.js
// @author       Alistair1231
// @match        https://trimps.github.io/
// @icon         https://icons.duckduckgo.com/ip2/github.io.ico
// @grant        GM.addStyle
// @license GPL-3.0
// ==/UserScript==
// https://github.com/Alistair1231/my-userscripts/raw/master/trimpsUltraWideFix.user.js

(() => {
  'use strict';
  //only run if width > 1920px
  if (window.innerWidth <= 1920) {
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
  // calculate 16:10 dimensions that fill the viewport vertically
  iframe.width = Math.ceil(window.innerHeight * 16 / 10);
  iframe.height = window.innerHeight;
  // center iframe horizontally
  iframe.style.position = 'absolute';
  iframe.style.left = '50%';
  iframe.style.transform = 'translateX(-50%)';

  document.body.appendChild(iframe);
})();