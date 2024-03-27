// ==UserScript==
// @name         Trimps Ultra Wide Fix
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.1.0
// @description  CSS fix for Trimps on ultra-wide screens
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
  GM.addStyle(`
    #wrapper {
      max-width: 1920px;
      margin: auto;
   }
     
    .psText {
      font-size: 1vw !important;
    }
    #miscColumn span {
      font-size: 1vw !important;
    }
    #empHide, #unempHide {
      font-size: 1vw !important;
    }
  `);
})();