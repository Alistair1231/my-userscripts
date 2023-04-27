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

// Select the target node
const streamContainer = document.querySelector('div#streamContainer');

// Function to set up media session handlers
function setupMediaSession() {
  const controlElements = [...streamContainer.querySelectorAll("div[class*='cursor-pointer'] span[class*='material-icons']")];
  const forwardButton = controlElements.filter(x => x.innerText.includes("forward_10"))[0];
  const replayButton = controlElements.filter(x => x.innerText.includes("replay_10"))[0];

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

  if (replayButton) {
    navigator.mediaSession.setActionHandler('previoustrack', () => triggerClickEvent(replayButton));
  }
  if (forwardButton) {
    navigator.mediaSession.setActionHandler('nexttrack', () => triggerClickEvent(forwardButton));
  }
}

// Create an observer instance
const observer = new MutationObserver(mutationsList => {
  for (let mutation of mutationsList) {
    if (mutation.type === 'childList' && mutation.target === streamContainer) {
      // Check if the mutation added or removed elements
      console.log('A child node has been added or removed.');
      setupMediaSession();

    } else if (mutation.type === 'attributes' && mutation.target === streamContainer) {
      // Check if the mutation changed an attribute of the div#streamContainer element
        console.log('The ' + mutation.attributeName + ' attribute was modified.');
      setupMediaSession();
    }
  }
});

// Start observing the target node for changes
observer.observe(streamContainer, { childList: true, subtree: true, attributes: true });
