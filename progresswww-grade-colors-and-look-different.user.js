// ==UserScript==
// @name         progresswww grade colors and look different
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.1.3
// @description  progress now shows colorful grades
// @author       Alistair1231
// @match        https://progresswww.nl/fontys/resultaten/overzicht.asp*
// @icon         https://icons.duckduckgo.com/ip2/progresswww.nl.ico
// @grant        none
// @require https://code.jquery.com/jquery-3.6.0.min.js
// @downloadURL  https://github.com/Alistair1231/my-userscripts/raw/main/progresswww-grade-colors-and-look-different.user.js
// @license      MIT
// ==/UserScript==

(function() {
    
    function colorLines() {
    jQuery("div.prg-box__content table tbody tr:has(td:not(.seperator))").each((i, x) => {
        var columnNo = 4;
        if (location.href == "https://progresswww.nl/fontys/resultaten/overzicht.asp?ov=1") {
            columnNo = 5;
        }
        //$(x).css({ 'background-color': '#2e3030' })
        jQuery("td:nth-of-type(" + columnNo + ")", x).each((j, y) => {
            if (y.innerText < 5.5 && y.innerText != "") {
                jQuery(y).css({ 'background-color': '#990000', 'color': '#ffffff' });
                //console.log(y.innerText);
            }
            else if (y.innerText >= 5.5 || y.innerText == "PA") {
                jQuery(y).css({ 'background-color': '#009900', 'color': '#ffffff' });

            }
            // else {
            //     jQuery(y).css('background-color', '#eaf0f4'); //eaf0f4
            // }
        });
    });

}

function colorRest() {
    $(".table > tbody > tr > td, .table > tbody > tr > th, .table > tfoot > tr > td, .table > tfoot > tr > th, .table > thead > tr > td, .table > thead > tr > th").css({ 'border-color': '#2e3030' })

    $('#wrapper').css({"background-color": "#303031","box-shadow": "0 0 0 1px #2e3030"});
    $(".page-title-box").css({"background": "#333"});
    $("body ").css({"color": "#dbdde0"});
    }
    // eaf0f4    // 2e3030
    // f0f4f8    // 303031

colorLines();
})();