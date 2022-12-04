// ==UserScript==
// @name         igg-games/bluemediafiles auto continue after wait
// @namespace    https://github.com/Auncaughbove17/my-userscripts/
// @version      0.4.2
// @description  waits for cooldown and clicks continue
// @author       Alistair1231
// @match        http*://bluemediafiles.com/url-generator.php?url=*
// @match        http*://bluemediafiles.net/url-generator.php?url=*
// @match        http*://bluemediafiles.eu/url-generator.php?url=*
// @match        http*://bluemediafiles.homes/url-generator.php?url=*
// @match        http*://bluemediafiles.sbs/url-generator.php?url=*
// @downloadURL  https://github.com/Auncaughbove17/my-userscripts/raw/main/iggAutoContinue.user.js
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
        clickButton = document.getElementById("nut");
        count++;
        console.log("Waited "+count+" seconds");
        console.log("image is: "+clickButton.src);
        if(clickButton.src!==""){
            //clicking
            clickButton.parentElement.submit();
            clearInterval(interval);
        }
    }, 1000);
})();
