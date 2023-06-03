// ==UserScript==
// @name         Audiobookshelf Media Session Controls Tweak
// @namespace    https://github.com/Auncaughbove17/my-userscripts/
// @version      0.1
// @description  Maps next/previous track media session controls to the replay_10/forward_10 buttons on Audiobookshelf's player.
// @author       Alistair1231
// @match        http://*/*
// @match        https://*/*
// @icon         https://icons.duckduckgo.com/ip2/audiobookshelf.org.ico
// @license      MIT
// ==/UserScript==


(function() {
    'use strict';

    // Function to run the code
    function runCode() {
        var controlElements = [...document.querySelectorAll("div#streamContainer div[class*='cursor-pointer'] span[class*='material-icons']")];
        var forwardButton = controlElements.filter(x => x.innerText.includes("forward_10"))[0];
        var replayButton = controlElements.filter(x => x.innerText.includes("replay_10"))[0];

        // Function to trigger click event
        function triggerClickEvent(element) {
            if (element) {
                var clickEvent = new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true,
                    view: window
                });
                element.dispatchEvent(clickEvent);
            }
        }

        navigator.mediaSession.setActionHandler('previoustrack', () => triggerClickEvent(replayButton));
        navigator.mediaSession.setActionHandler('nexttrack', () => triggerClickEvent(forwardButton));
    }

    // Run the code initially
    runCode();

    // Set up the MutationObserver
    // const observer = new MutationObserver(mutations => {
    //     mutations.forEach(mutation => {
    //         if (mutation.target && mutation.target.id === "streamContainer") {
    //             // Run the code again when the div#streamContainer changes
    //             runCode();
    //         }
    //     });
    // });

    if ('mediaSession' in navigator) {
        navigator.mediaSession.setActionHandler('metadataupdated', function(metadata) {
          console.log('The metadata has changed!');
          console.log('The new title is:', metadata.title);
          runCode();
        });
      }
})();