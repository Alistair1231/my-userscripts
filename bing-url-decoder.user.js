// ==UserScript==
// @name         Bing URL Decoder
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.1.2
// @description  Decode the Bing URLs to get the direct result page URL
// @author       Alistair1231
// @downloadURL  https://github.com/Alistair1231/my-userscripts/raw/main/bing-url-decoder.user.js
// @icon         https://icons.duckduckgo.com/ip2/bing.com.ico
// @grant        none
// @match        https://www.bing.com/*
// @require      https://github.com/Alistair1231/my-userscripts/raw/887a767d853bb7e33b31bbe532f3b5f334c8815f/jQuery-and-common-function-shortcuts-everywhere.user.js
// @license GPL-3.0
// ==/UserScript==

(function () {
    'use strict';

    function decodeBingUrl(url) {
        const remove_alink = (x) => {
            if (!x.startsWith("https://bing.com/alink/")) {
                return x;
            }
            const urlStartIndex = x.indexOf("url=") + 4;
            const urlEndIndex = x.indexOf("&", urlStartIndex);
            if (urlEndIndex === -1) {
                return x.substring(urlStartIndex);
            }
            return x.substring(urlStartIndex, urlEndIndex);
        };
        
        // Remove the leading "a1" characters from the value of the "u" parameter
        const uParamValue = url.searchParams.get('u').substring(2);
        // Decode the URL-safe Base64-encoded value
        var base64DecodedValue = atob(uParamValue.replace(/_/g, '/').replace(/-/g, '+'))

        try {
            const decodedValue = decodeURIComponent(base64DecodedValue);
            return remove_alink(decodedValue);
        } catch (error) {
            if (error instanceof URIError) {
                return remove_alink(base64DecodedValue);
            }
        }
    }

    function decodeBingUrls(links) {
        links.forEach(link => {
            const decodedUrl = decodeBingUrl(new URL(link.href));
            link.href = decodedUrl;
        });
    }

    // Decode all "u" parameters in Bing URLs on the page
    const links = document.querySelectorAll('a[href*="bing.com"][href*="&u="]');
    decodeBingUrls(links);

    // Use MutationObserver to detect new links added to the page
    const observer = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            if (mutation.type === 'childList') {
                const newLinks = mutation.addedNodes;
                decodeBingUrls(newLinks);
            }
        });
    });

    // Observe changes in the main content area of the page
    const mainContent = document.querySelector('main');
    observer.observe(mainContent, { childList: true, subtree: true });

})();