// ==UserScript==
// @name         Old Reddit Side Bar toggle and max width
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.1.0
// @description  limits the width of the side bar to 20vw, adds a button to toggle the sidebar and auto-hides the sidebar if the window width is less than 1200px
// @downloadURL  https://github.com/Alistair1231/my-userscripts/raw/master/reddit-side-bar-max-width.user.js
// @author       Alistair1231
// @match        https://old.reddit.com/*
// @icon         https://icons.duckduckgo.com/ip2/github.com.ico
// @grant        GM.addStyle
// @license MIT
// ==/UserScript==
// https://github.com/Alistair1231/my-userscripts/raw/master/reddit-side-bar-max-width.user.js

(() => {
  GM.addStyle(`
    .side {
        max-width: 20vw;
    }
    body {
      margin: auto !important;
      max-width: 1200px;
    }
    `);

  // add display: none to sidebar if display width is less than 1000px
  if (window.innerWidth < 1200) {
    let sidebar = document.querySelector(".side");
    sidebar.style.display = "none";
  }

  // Create a button
  let sidebarToggle = document.createElement("a");
  sidebarToggle.href = "#";
  sidebarToggle.textContent = "sidebar";
  sidebarToggle.className = "pref-lang choice";

  // Add click event listener
  sidebarToggle.addEventListener("click", () => {
    let sidebar = document.querySelector(".side");
    if (sidebar.style.display === "none") {
      sidebar.style.display = "block";
    } else {
      sidebar.style.display = "none";
    }
  });

  // add button after last separator in div#header-bottom-right
  let headerBottomRight = document.querySelector("#header-bottom-right");
  let separators = headerBottomRight.querySelectorAll(".separator");
  let lastSeparator = separators[separators.length - 1];
  lastSeparator.after(sidebarToggle);
  // add new separator after button
  let newSeparator = document.createElement("span");
  newSeparator.textContent = "|";
  newSeparator.className = "separator";
  sidebarToggle.after(newSeparator);
})();
