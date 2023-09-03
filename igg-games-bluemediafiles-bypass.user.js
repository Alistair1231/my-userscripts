// ==UserScript==
// @name         IGG Games / bluemediafiles bypass
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      1.0.10
// @description  Skip count down and redirect to actual download page.
// @homepage     https://greasyfork.org/scripts/423435
// @author       ting / Alistair1231
// @match        http*://*/*
// @grant        none
// @license      MIT
// ==/UserScript==

/*
MIT License

Copyright (c) 2022 ting / 2023 Alistair1231

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

(function () {
    "use strict";
    if (window.location.href.match(/.*bluemedia.*url-generator-?\d+?.php/)) {
      function _bluemediafiles_decodeKey(encoded) {
        var key = "";
        for (var i = encoded.length / 2 - 5; i >= 0; i = i - 2) {
          key += encoded[i];
        }
        for (i = encoded.length / 2 + 4; i < encoded.length; i = i + 2) {
          key += encoded[i];
        }
        return key;
      }
      [].forEach.call(document.getElementsByTagName("script"), function (s) {
        var m = s.innerText.match(
          /Goroi_n_Create_Button[(]\"(?<encoded>.+?)\"[)];/
        );
        if (m && m.length > 1) {
          window.location = "/get-url.php?url=" + _bluemediafiles_decodeKey(m[1]);
        }
      });
    }
  })();
  