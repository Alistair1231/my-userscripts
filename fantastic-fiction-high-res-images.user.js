// ==UserScript==
// @name         High res images on fantasticfiction.com
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.3.0
// @description  replaces low res images on hideoutshowcase with high res ones
// @author       Alistair1231
// @match        https://www.fantasticfiction.com/*
// @icon         https://icons.duckduckgo.com/ip2/fantasticfiction.com.ico
// @license      MIT
// ==/UserScript==
// https://github.com/Alistair1231/my-userscripts/raw/master/fantastic-fiction-high-res-images.user.js

(function () {
  // From:    https://m.media-amazon.com/images/I/516s5YwK2HL.SX316.SY480._SL500_.jpg
  // To:      https://m.media-amazon.com/images/I/516s5YwK2HL.jpg
  // https://regex101.com/r/yoj8UD/1
  const regex = /(?:[\._]+?S[XLY]\d+_?){3}(?=\.jpg)/gm;

  const isAlreadyProcessed = (src) => !regex.test(src);

  const replaceSrc = (img) => {
    const newSrc = img.src.replace(regex, "");
    if (img.src !== newSrc) {
      img.src = newSrc;
    }
  };

  const replaceAllImages = () => {
    document.querySelectorAll("img").forEach(replaceSrc);
  };

  const replaceMutation = (mutationList) => {
    mutationList.forEach((mutation) => {
      if (mutation.type === "attributes" && mutation.attributeName === "src") {
        const img = mutation.target;
        if (!isAlreadyProcessed(img.src)) {
          replaceSrc(img);
        }
      }
    });
  };

  const observer = new MutationObserver(replaceMutation);

  // Observe all src attribute changes
  observer.observe(document.body, {
    attributes: true,
    subtree: true,
    attributeFilter: ["src"],
  });

  // Run the function on initial load
  replaceAllImages();
})();
