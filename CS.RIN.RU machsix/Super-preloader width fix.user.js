// ==UserScript==
// @name         CS.RIN.RU machsix/Super-preloader width fix
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.1.2
// @description  fixes width when using machsix/Super-preloader to make topics infitely scrollable
// @author       Alistair1231
// @match        https://cs.rin.ru/forum/viewtopic.php*
// @icon         https://icons.duckduckgo.com/ip2/cs.rin.ru.ico
// @grant        none
// @require https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js
// @downloadURL https://github.com/Alistair1231/my-userscripts/raw/main/CS.RIN.RU%20machsix%2FSuper-preloader%20width%20fix.user.js
// @license GPL-3.0
// ==/UserScript==


var MutationObserver = window.MutationObserver ||
      window.WebKitMutationObserver || 
      window.MozMutationObserver;

var observer = new MutationObserver(function(mutation) {
        console.log('fixing width of posts')
        jQuery('td').css('max-width','700px')
        // images in posts
        jQuery('.attachcontent img').css('max-width','700px')
    })
    
    var observerConfig = {
        attributes: true,
        childList: true,
        characterData: true,
        subtree: true
    }
    
    const mainTable = jQuery('body>table')[0]
    
    observer.observe(mainTable, observerConfig);