// ==UserScript==
// @name          Dark Mode Toggle
// @namespace     https://github.com/Alistair1231/my-userscripts/
// @version       0.1.2
// @description   Dark mode with partial inversion, double-hit Esc for toggle button
// @downloadURL   https://github.com/Alistair1231/my-userscripts/raw/master/dark-mode-toggle.user.js
// @updateURL     https://github.com/Alistair1231/my-userscripts/raw/master/dark-mode-toggle.user.js
// @author        Alistair1231
// @license       GPL-3.0
// @match         *://*/*
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         GM_registerMenuCommand
// @run-at        document-start
// ==/UserScript==

(function () {
  "use strict";

  const CONFIG = {
    inversionPercent: 90,
    mediaInversionPercent: 100,
    uiTimeout: 3000,
    doublePressDelay: 500,
  };

  let isActive = false;
  let lastEscPress = 0;
  let uiTimeout;
  let btn = null;

  // Function to create the toggle button
  function createButton() {
    if (!btn) {
      btn = document.createElement("button");
      btn.textContent = "🌓 Toggle Dark Mode";
      btn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 2147483647 !important;
        padding: 8px 12px;
        cursor: pointer;
        border-radius: 4px;
        background: #fff;
        color: #333;
        box-shadow: 0 2px 5px rgba(0,0,0,0.2);
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s ease;
      `;
      btn.addEventListener("click", () => {
        if (window.localStorage.darkMode === "true") {
          window.localStorage.darkMode = false;
        } else {
          window.localStorage.darkMode = true;
        }
        toggleDarkMode();
      });
      document.body.appendChild(btn);
    }
  }

  function toggleDarkMode() {
    const styleId = "dark-mode-toggle-style";
    const existingStyle = document.getElementById(styleId);
    if (existingStyle) {
      existingStyle.remove();
      isActive = false;
    } else {
      const newStyle = document.createElement("style");
      newStyle.id = styleId;
      newStyle.textContent = `
        /* Invert the whole document */
        html {
          -webkit-filter: invert(${CONFIG.inversionPercent}%);
          filter: invert(${CONFIG.inversionPercent}%);
        }
        /* Re-invert common media elements so that images, videos,
           inline SVGs, etc. appear in the correct colors. */
        img,
        video,
        picture,
        iframe,
        object,
        embed,
        canvas,
        svg {
          -webkit-filter: invert(${CONFIG.mediaInversionPercent}%);
          filter: invert(${CONFIG.mediaInversionPercent}%);
        }
        /* Re-invert elements that use inline styles with URL-based images. */
        [style*="url("] {
          -webkit-filter: invert(${CONFIG.mediaInversionPercent}%);
          filter: invert(${CONFIG.mediaInversionPercent}%);
        }
      `;

      // Insert the style element as soon as document.head is available.
      const insertStyle = () => {
        const firstStyle = document.querySelector("style");
        if (firstStyle) {
          document.head.insertBefore(newStyle, firstStyle);
        } else {
          document.head.appendChild(newStyle);
        }
      };

      if (document.head) {
        insertStyle();
      } else {
        document.addEventListener(
          "DOMContentLoaded",
          () => {
            insertStyle();
          },
          { once: true }
        );
      }

      isActive = true;
    }
  }

  function handleEscPress() 

  function showToggleUI() {
    clearTimeout(uiTimeout);
    if (btn) {
      btn.style.visibility = "visible";
      btn.style.opacity = "1";
    }
    uiTimeout = setTimeout(() => {
      if (btn) {
        btn.style.opacity = "0";
        setTimeout(() => {
          btn.style.visibility = "hidden";
        }, 300);
      }
    }, CONFIG.uiTimeout);
  }

  // Initial setup
  function init() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape")
          {
    const now = Date.now();
    if (now - lastEscPress < CONFIG.doublePressDelay) {
      showToggleUI();
    }
    lastEscPress = now;
  }
      if (e.altKey && e.shiftKey && e.key.toLowerCase() === "d") {
        toggleDarkMode();
      }
    });

    if (window.localStorage.darkMode === "true") {
      toggleDarkMode();
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    createButton();
  });

  init();
})();
