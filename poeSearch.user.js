// ==UserScript==
// @name         Path of Exile Trade always fuzzy search (tilde)
// @namespace    https://greasyfork.org/en/users/12725-alistair1231
// @version      0.2.1
// @description  always use fuzzy search, waits for active input bar and puts ~ (tilde) at the front
// @author       Alistair1231
// @match        https://www.pathofexile.com/trade*
// @downloadURL  https://gist.github.com/Auncaughbove17/1efc6138988425c938e6289736ada85d/raw/poeSearch.user.js
// @icon         https://www.google.com/s2/favicons?domain=pathofexile.com
// @grant        none
// @license GPL-3.0
// ==/UserScript==

(function() {
    'use strict';
    setInterval(() => {
        let searchbox = document.querySelectorAll(".multiselect--active .multiselect__input");
        Array.from(searchbox).map(x => {
            if ((x != null) && (x.value.match(/^~.*$/)==null))
                x.value= "~"+x.value;
        })
    }, 1000);
})();