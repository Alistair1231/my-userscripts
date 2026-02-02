// ==UserScript==
// @name         IGG Games / bluemediafiles bypass
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      2.0.0
// @description  Skip count down and redirect to actual download page.
// @homepage     https://greasyfork.org/scripts/423435
// @author       Alistair1231
// @match        http*://*/*
// @grant        none
// @license      GPL3.0
// ==/UserScript==
// https://github.com/Alistair1231/my-userscripts/blob/master/igg-games-bluemediafiles-bypass.user.js
// https://greasyfork.org/en/scripts/425739-igg-games-bluemediafiles-auto-continue-after-wait

(function () {
  // since domain constantly changes, we match all sites, and then filter. 
  // This is needed for compliance with MV3, since we can't just regex filter
  // in the script metadata anymore
  if (/.*bluemedia.*url-generator(-\d+)?\.php/.test(window.location.href)) {
    let loop;

    function run() {
      const link = document.querySelector('#btn-download')?.href;
      if (link && link !== "") {
        clearInterval(loop);
        console.log(`Link decoding succeeded, ${link}`);
        window.location=link;
      }
    }

    function unlock() {
      try {
        window.generateDownloadUrl();
      } catch (e) {
        console.log("Link decoding failed, retrying");
      }
    }

    function unlockAndRun() {
      unlock();
      run();
    }

    setTimeout(() => {
      loop = setInterval(unlockAndRun, 1000);
    }, 200);

    //? /////////////////////
    //? fallback to simple waiting logic if they change the logic again
    function wait() {
      // waiting for countown
      var clickButton;
      var count = 0;
      var interval = setInterval(() => {
        clickButton = document.getElementById("btn-download");
        count++;
        console.log("Waited " + count + " seconds");
        if (clickButton.src !== "") {
          //clicking
          clickButton.parentElement.submit();
          clearInterval(interval);
        }
      }, 1000);
    }
    setTimeout(wait, 6000);

  }
})();