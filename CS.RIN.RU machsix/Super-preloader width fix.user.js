// ==UserScript==
// @name         CS.RIN.RU machsix/Super-preloader width fix
// @namespace    https://greasyfork.org/en/users/12725-alistair1231
// @version      0.1.0
// @description  fixes width when using machsix/Super-preloader to make topics infitely scrollable
// @author       Alistair1231
// @match        https://cs.rin.ru/forum/viewtopic.php*
// @icon         https://icons.duckduckgo.com/ip2/fitgirl-repacks.site.ico
// @grant        none
// @require https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @downloadURL https://github.com/Auncaughbove17/my-userscripts/raw/main/
// @license GPL-3.0
// ==/UserScript==


var MutationObserver = window.MutationObserver ||
      window.WebKitMutationObserver || 
      window.MozMutationObserver;

var observer = new MutationObserver(function(mutation) {
        console.log('fixing width of posts')
        jQuery('td').css('max-width','700px')
    })
    
    var observerConfig = {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
    }
    
    const mainTable = jQuery('body>table')[0]
    
    observer.observe(mainTable, observerConfig);