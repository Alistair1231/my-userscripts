// ==UserScript==
// @name         Widen Bing Search Results
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.1
// @description  Makes the place for the Bing search results wider
// @author       Alistair1231
// @match        https://www.bing.com/search*
// @grant        GM_addStyle
// @downloadURL  https://github.com/Alistair1231/my-userscripts/raw/main/widen-bing-search-results.user.js
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    // Add your custom CSS
    const css = `
        #b_context {
            width: 300px !important;
        }
        
        @media (min-width: 1200px) {
            #b_results {
                width: calc(80% - 300px) !important; 
                max-width: 1200px !important; 
            }
        }

        @media (max-width: 1199px) and (min-width: 768px) {
            #b_results {
                width: calc(90% - 300px) !important; 
            }
        }

        @media (max-width: 767px) {
            #b_results {
                width: 100% !important; 
            }
        }
    `;

    GM_addStyle(css);
})();
