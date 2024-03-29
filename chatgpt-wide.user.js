// ==UserScript==
// @name         ChatGPT use full window width for responses
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.1.1
// @description  ChatGPT use full window width for responses!
// @author       Alistair1231
// @match        https://chat.openai.com/*
// @icon         https://icons.duckduckgo.com/ip2/openai.com.ico
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';


    const setMaxWidth = (element) => {
        element.style.maxWidth = '95%';
    };

    const observer = new MutationObserver((mutationsList) => {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === Node.ELEMENT_NODE && node.matches('div.text-base')) {
                        setMaxWidth(node);
                    } else if (node.nodeType === Node.ELEMENT_NODE) {
                        const textBaseNodes = node.querySelectorAll('div.text-base');
                        textBaseNodes.forEach((textBaseNode) => {
                            setMaxWidth(textBaseNode);
                        });
                    }
                });
            }
        }
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });

    document.querySelectorAll('div.text-base').forEach((element) => {
        setMaxWidth(element);
    });
})();
