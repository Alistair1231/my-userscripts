// ==UserScript==
// @name         Bing URL Decoder
// @namespace    https://github.com/Auncaughbove17/my-userscripts/
// @version      0.1
// @description  Decode the Bing URLs to get the direct result page URL
// @author       Alistair1231
// @downloadURL  https://github.com/Auncaughbove17/my-userscripts/raw/main/bing-url-decoder.user.js
// @icon         https://icons.duckduckgo.com/ip2/bing.com.ico
// @grant        none
// @match        https://www.bing.com/*
// @license GPL-3.0
// ==/UserScript==

(function() {
    'use strict';

    function decodeBingUrl(url) {
        // Remove the leading "a1" characters from the value of the "u" parameter
        const uParamValue = url.searchParams.get('u').substring(2);
        // Decode the URL-safe Base64-encoded value
        const decodedValue = decodeURIComponent(
            atob(uParamValue.replace(/_/g, '/').replace(/-/g, '+'))
        );
        return decodedValue;
    }

    function decodeBingUrls(links) {
        links.forEach(link => {
            const decodedUrl = decodeBingUrl(new URL(link.href));
            link.href = decodedUrl;
        });
    }

    // Decode all "u" parameters in Bing URLs on the page
    const links = document.querySelectorAll('main a[href*="bing.com"][href*="&u="]');
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