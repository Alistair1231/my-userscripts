// ==UserScript==
// @name          Pokerogue Wiki: Links to Smogon
// @namespace     https://github.com/Alistair1231/my-userscripts/
// @version       0.1.0
// @description   Adds links to Smogon for Pokerogue Wiki
// @downloadURL   https://github.com/Alistair1231/my-userscripts/raw/master/pokerogue-links-to-smogon.user.js
// @updateURL     https://github.com/Alistair1231/my-userscripts/raw/master/pokerogue-links-to-smogon.user.js
// @author        Alistair1231
// @match        https://wiki.pokerogue.net/pokedex:*
// @icon          https://icons.duckduckgo.com/ip2/pokerogue.net.ico
// @license       GPL-3.0
// ==/UserScript==
// https://github.com/Alistair1231/my-userscripts/raw/master/pokerogue-links-to-smogon.user.js

;(function () {
  'use strict'
  /**
   * Creates a mutation observer on the specified element and executes a callback when child elements are added or removed.
   * @param {Element} element - The DOM element to observe.
   * @param {function} callback - Function to execute when a mutation is observed.
   * @returns {MutationObserver} The created MutationObserver instance.
   * @example
   * const element = document.getElementById('myElement');
   * const observer = createObserver(element, (mutation) => {
   *   console.log('Child nodes changed:', mutation);
   * });
   */
  function createObserver(element, callback) {
    const observer = new MutationObserver((mutationsList) => {
      for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
          callback(mutation)
        }
      }
    })
    observer.observe(element, { childList: true, subtree: true })
    return observer
  }
  /**
   * Waits for an element matching the selector to appear in the DOM
   * @param {string} selector - CSS selector to match element
   * @param {function} callback - Function to execute when element is found
   * @param {number} [interval=100] - Time in ms between checks for element
   * @param {number} [timeout=5000] - Maximum time in ms to wait before giving up
   */
  function waitFor(selector, callback, interval = 100, timeout = 5000) {
    const startTime = Date.now()
    const check = () => {
      const element = document.querySelector(selector)
      if (element) {
        callback(element)
      } else if (Date.now() - startTime < timeout) {
        setTimeout(check, interval)
      }
    }
    check()
  }

  function run() {
    const nameEl = document
      .querySelector('h2#general_info')
      .nextElementSibling.nextElementSibling.querySelector('th span')
    const url = `https://www.smogon.com/dex/sv/pokemon/${nameEl.textContent}/`

    nameEl.innerHTML = `<a href="${url}">${nameEl.innerHTML}</a>`
  }

  run()
  waitFor('h2#general_info', (element) => {
    createObserver(element, run)
  })
})()
