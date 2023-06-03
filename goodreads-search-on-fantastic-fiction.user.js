// ==UserScript==
// @name         goodreads search on fantastic fiction
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.2.3
// @description  adds button to goodreads for searching on fantastic fiction 
// @author       Alistair1231
// @match        https://www.goodreads.com/book/show/*
// @match        https://www.goodreads.com/series/*
// @require https://code.jquery.com/jquery-3.6.0.min.js
// @icon         https://icons.duckduckgo.com/ip2/goodreads.com.ico
// @downloadURL  https://github.com/Alistair1231/my-userscripts/raw/main/goodreads-search-on-fantastic-fiction.user.js
// @grant        none
// @license      MIT
// ==/UserScript==

// Inspired by Slengpung (https://greasyfork.org/en/users/78880) "Goodreads Plus" script

(function() {
    'use strict';

    function createEntry(text,link,isBookPage=true){
        var button = document.createElement("li");
        button.innerHTML = `<a href="${link}" target="_blank" class="buttonBar">${text}</a>`;
        button.className = "Button";
        return button;
    }
    
    function getButtonList(){
        var buttonBar = document.getElementById("buyButtonContainer");
        if (buttonBar === null || buttonBar == "null") {
            buttonBar = document.getElementById("asyncBuyButtonContainer");
        }
        return buttonBar.getElementsByTagName("ul");
    }
    

    // on book page?
    if (window.location.pathname.indexOf('/book/show') === 0) {
        var title = jQuery('#bookTitle').html().trim();
        var author = jQuery('.authorName span[itemprop="name"]').html().replaceAll('.', " ");
        var series='';
        try {
            series= jQuery('#bookSeries a')
                .html() // get text
                .trim() // remove whitespace
                .replace(/[\(\)]/g,'') // remove parentheses
                .replace(/ #\d+$/,''); // remove series number
        } catch (TypeError) {
            console.log("Book not part of series!");
        }
        

        var buttonUl = getButtonList();
        var ffButton1 = createEntry("Search FF (title)", `https://www.fantasticfiction.com/search/?searchfor=book&keywords=${title}+${author}`);
        buttonUl[0].appendChild(ffButton1);
        
        if(series!=''){
            var ffButton2 = createEntry("Search FF (series)", `https://www.fantasticfiction.com/search/?searchfor=series&keywords=${series}`);
            buttonUl[0].appendChild(ffButton2);
        }
    }
    //on series page?
    else if(window.location.pathname.indexOf('/series') === 0) {
        var series = jQuery(".responsiveSeriesHeader__title h1").html().replace(/ Series$/,'').trim();
        
        // get header with title
        var responsiveSeriesHeader = jQuery(".responsiveSeriesHeader").first();
        // create table, that is used to show series title left and search button right of it
        var table = document.createElement("table");
        table.innerHTML=`
        <tr>
        <td id='seriesTitle' style="width: 1%;white-space: nowrap;padding-right: 20px;"></td>            
        <td id='searchFF'><a href="https://www.fantasticfiction.com/search/?searchfor=series&keywords=${series}" target="_blank"><button>Search FF</button></a></td>
        `
        // pit new table at beginning of header
        responsiveSeriesHeader.prepend(table);
        // move title into table
        jQuery(".responsiveSeriesHeader__title").detach().appendTo("#seriesTitle")
    }

})();