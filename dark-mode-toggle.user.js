// ==UserScript==
// @name          Dark Mode Toggle
// @namespace     https://github.com/Alistair1231/my-userscripts/
// @version       0.1.1
// @description   Customizable dark mode with partial inversion and smart UI
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
// https://github.com/Alistair1231/my-userscripts/raw/master/dark-mode-toggle.user.js

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
          z-index: 9999;
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
        } else if (window.localStorage.darkMode === "false") {
          window.localStorage.darkMode = true;
        } else {
          window.localStorage.darkMode = true;
        }
        toggleDarkMode();
      });
      document.body.appendChild(btn);
    }
  }

  function toggleDarkMode() {
    const style = document.getElementById("dark-mode-toggle-style");
    if (style) {
      style.remove();
      isActive = false;
    } else {
      const newStyle = document.createElement("style");
      newStyle.id = "dark-mode-toggle-style";
      newStyle.textContent = `
          html {
              -webkit-filter: invert(${CONFIG.inversionPercent}%);
              filter: invert(${CONFIG.inversionPercent}%);
          }
          img, video, picture, iframe, object, embed, canvas {
              -webkit-filter: invert(${CONFIG.mediaInversionPercent}%);
              filter: invert(${CONFIG.mediaInversionPercent}%);
          }
      `;
      // Insert style before any existing styles
      const firstStyle = document.querySelector("style");
      if (firstStyle) {
        document.head.insertBefore(newStyle, firstStyle);
      } else {
        document.head.appendChild(newStyle);
      }
      isActive = true;
    }
  }

  function handleEscPress() {
    const now = Date.now();
    if (now - lastEscPress < CONFIG.doublePressDelay) {
      showToggleUI();
    }
    lastEscPress = now;
  }

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

  // Initial setup that can run immediately
  function init() {
    // Add keydown listener for Escape and Alt+Shift+D
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") handleEscPress();
      if (e.altKey && e.shiftKey && e.key.toLowerCase() === "d")
        toggleDarkMode();
      // macos
      if (e.metaKey && e.shiftKey && e.key.toLowerCase() === "d")
        toggleDarkMode();
    });

    // Check localStorage and apply dark mode if needed
    if (window.localStorage.darkMode === "true") {
      toggleDarkMode();
    }
  }

  // Wait for DOM to be ready before creating the button
  document.addEventListener("DOMContentLoaded", () => {
    createButton();
  });

  // Run initial setup
  init();
})();
