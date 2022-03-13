// ==UserScript==
// @name         igg-games/bluemediafiles auto continue after wait
// @namespace    https://greasyfork.org/en/users/12725-alistair1231
// @version      0.2
// @description  waits for cooldown and clicks continue
// @author       Alistair1231
// @match        http*://bluemediafiles.com/url-generator.php?url=*
// @match        http*://bluemediafiles.net/url-generator.php?url=*
// @downloadURL  https://gist.github.com/Auncaughbove17/1efc6138988425c938e6289736ada85d/raw/iggAutoContinue.user.js
// @grant        none
// @license GPL-3.0
// ==/UserScript==


(function() {
    'use strict';
    // waiting for countown
    var clickButton;
    var count=0;
    var interval = setInterval(() =>
    {
        // countdown = document.getElementsByClassName("item")[0].children[0].innerHTML;
        clickButton = document.getElementById("nut").src;
        count++;
        console.log("Waited "+count+" seconds");
        console.log("image is: "+clickButton);
        if(clickButton!==""){
            //clicking
            document.getElementsByClassName("item")[0].nextElementSibling.submit();
            clearInterval(interval);
        }
    }, 1000);
})();
