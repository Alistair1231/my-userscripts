// ==UserScript==
// @name         Mangadex larger latest updates pictures
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.1
// @description  adds anilist links to mal
// @author       Alistair1231
// @match        https://mangadex.org/
// @icon         https://icons.duckduckgo.com/ip2/myanimelist.net.ico
// @downloadURL  https://github.com/Alistair1231/my-userscripts/raw/main/mangadex-larger-latest-updates.user.js
// @grant        GM_addStyle
// @license MIT
// ==/UserScript==

(function () {

    GM_addStyle(`
.line-clamp-1 {
    -webkit-line-clamp: 2 !important;
}
`);

    const largerImages = () => {
        console.log("in largerImages()");
        
        // wider total container
        document.querySelectorAll("div.header")[1].parentElement.style.maxWidth="1920px";
        
        
        const coverImages = document.querySelectorAll("div.header")[1].querySelectorAll('img[alt="Cover image"]');
        console.log(coverImages);
        [...coverImages].map(x => x.closest("div")).forEach(y => {
            console.log(y);
            y.style['height'] = "160px";
            y.style['min-width'] = "112px";
            y.style['max-width'] = "";
            y.querySelector("img").style['object-fit'] = 'contain';
        });
    };

    const run = () => {
        largerImages();
    };

    window.onload = setTimeout(run,2000);

})();