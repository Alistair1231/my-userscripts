// ==UserScript==
// @name         MAM folder path
// @namespace    https://greasyfork.org/en/users/12725-alistair1231
// @version      0.2.2
// @description  Add Audiobook folder path to torrent info
// @author       Alistair1231
// @include      https://www.myanonamouse.net/t/*
// @downloadURL  https://github.com/Auncaughbove17/my-userscripts/raw/main/MAM-folder-path.user.js
// @grant        none
// ==/UserScript==

function decodeHtml(html) {
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

var bookTitle = decodeHtml(document.getElementsByClassName("TorrentTitle")[0].innerHTML).replaceAll(':',' -').replaceAll('&','and').replaceAll(',','_').trim();
var author = decodeHtml(document.getElementsByClassName("torDetRight torAuthors")[0].textContent).replaceAll(':',' -').replaceAll('&','and').replaceAll(',','_').trim();
var series = "";
var bookOfSeries= "";


try {
    series = decodeHtml(document.getElementsByClassName("torDetRight torSeries")[0].firstChild.firstChild.text).replaceAll(':',' -').replaceAll('&','and').replaceAll(',','_').trim();
    bookOfSeries = decodeHtml(document.getElementsByClassName("torDetRight torSeries")[0].firstChild.childNodes[1].data).match(/\d+/);    
} catch (TypeError) {
}
    
if(series != "") {
var folderPath = `/${author} - ${series}/Book ${bookOfSeries} - ${bookTitle}`
} else {
var folderPath = `/${author} - Loose Books/${bookTitle}`
}

var narratorDiv  = document.getElementById("Narrator").parentElement;
var folderText = document.createElement("div");
folderText.innerHTML = `
<div class="torDetRow">
    <div class="torDetLeft">Folder Path</div>
    <div id="Folder" class="torDetRight torSeries">
        <span class="flex"><a id='folderPath'>${folderPath}</a>
        <p id='textCopied' style="font-size: 9px;margin-left: 10px;"></p></span>
    </div>
</div>
`
narratorDiv.before(folderText);

// make click to copy
document.getElementById("folderPath").addEventListener("click", function() {
    navigator.clipboard.writeText(folderPath);
    document.getElementById("textCopied").innerHTML = "Copied!";
        setTimeout(function() {
            document.getElementById("textCopied").innerHTML = '';
        }, 1000);
  });
