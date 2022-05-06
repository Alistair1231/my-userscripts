// ==UserScript==
// @name         DAV simple file list of videos at the top
// @namespace    https://greasyfork.org/en/users/12725-alistair1231
// @version      0.1
// @description
// @author       Alistair1231
// @match        https://*.seedbox.io/dav/*
// @icon         https://icons.duckduckgo.com/ip2/seedbox.io.ico

// @grant        none
// @license GPL-3.0
// ==/UserScript==

(function () {
    'use strict';

    //remove info buttons
    // document.querySelectorAll(".nodeTable tr").forEach(x=>x.children[5].remove())

    //p field in which all the links will be added
    let links = document.createElement("p");
    // node table is original content
    document.getElementsByTagName("nav")[0].append(links);
    // these are the rows which contain the links
    document.querySelectorAll(".nodeTable tr").forEach(x => {
        // the  actual a element with the link to the file
        let aElement = x.firstChild.firstChild;
        // file or collection
        let elementType= x.children[1].innerText
        if(elementType=="File" && aElement.innerText.match(/^.*(\.mp4|\.mkv)$/g)){
            let link = document.createElement("a");
            // break is needed for new line between links
            let br = document.createElement("br");
            link.href = aElement.href;
            link.innerHTML = aElement.innerText;
            links.appendChild(link);
            links.appendChild(br);
        }
    })
})();