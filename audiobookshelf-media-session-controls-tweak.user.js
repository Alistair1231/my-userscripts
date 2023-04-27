// ==UserScript==
// @name         Audiobookshelf Media Session Controls Tweak
// @namespace    https://github.com/Auncaughbove17/my-userscripts/
// @version      0.1
// @description  Maps next/previous track media session controls to the replay_10/forward_10 buttons on Audiobookshelf's player.
// @author       Alistair1231
// @match        http://*/*
// @match        https://*/*
// @icon         https://icons.duckduckgo.com/ip2/audiobookshelf.org.ico
// @downloadURL  https://github.com/Alistair1231/my-userscripts/raw/main/audiobookshelf-media-session-controls-tweak.user.js
// @license GPL-3.0
// ==/UserScript==

// Define the default value for the list of domains
var defaultDomains = "example.com\nexample.org";

// Register a menu command to open the options menu
GM_registerMenuCommand("Set Domains", function () {
    GM_config.open();
});

// Define the options for the options menu
GM_config.init({
    id: "abs-domain-config",
    title: "Audiobookshelf Domains",
    fields: {
        domains: {
            label: "List of Domains",
            type: "textarea",
            default: GM_getValue("domains", defaultDomains)
        }
    },
    events: {
        save: function () {
            GM_setValue("domains", GM_config.get("domains"));
        }
    }
});

// Get the list of domains from the options menu
var domains = GM_getValue("domains", defaultDomains).split("\n");

// Check if the current domain matches any of the domains in the list
if (domains.indexOf(window.location.hostname) !== -1) {
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