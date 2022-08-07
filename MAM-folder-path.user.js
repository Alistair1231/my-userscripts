// ==UserScript==
// @name         MAM folder path
// @namespace    https://greasyfork.org/en/users/12725-alistair1231
// @version      0.3.0
// @description  Add Audiobook folder path to torrent info
// @author       Alistair1231
// @include      https://www.myanonamouse.net/t/*
// @downloadURL  https://github.com/Auncaughbove17/my-userscripts/raw/main/MAM-folder-path.user.js
// @grant        none
// ==/UserScript==

function decodeHtml(html) {
    // make sure there is no &amp; or similiar in the string
    var txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
}

function replaceSymbols(val){
    return val.replaceAll(':',' -').replaceAll('&','and').replaceAll(',','_');
}

var bookTitle = replaceSymbols(decodeHtml(document.getElementsByClassName("TorrentTitle")[0].innerHTML)).trim();
var author = replaceSymbols(decodeHtml(document.getElementsByClassName("torDetRight torAuthors")[0].textContent)).trim();
var series = "";
var bookOfSeries= "";


try {
    series = replaceSymbols(decodeHtml(document.getElementsByClassName("torDetRight torSeries")[0].firstChild.firstChild.text)).trim();
    bookOfSeries = String(document.getElementsByClassName("torDetRight torSeries")[0].firstChild.childNodes[1].data.match(/\d+/)).padStart(2, '0');
} catch (TypeError) {
}
    
if(series != "") {
var folderPath = `/_Audiobooks/${author} - ${series}/Book ${bookOfSeries} - ${bookTitle}`
var folderPath2 = `/_Audiobooks1/${author} - ${series}/Book ${bookOfSeries} - ${bookTitle}`
} else {
var folderPath = `/_Audiobooks/${author} - Loose Books/${bookTitle}`
var folderPath2 = `/_Audiobooks1/${author} - Loose Books/${bookTitle}`
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
    <div id="Folder2" class="torDetRight torSeries">
        <span class="flex"><a id='folderPath2'>${folderPath2}</a>
        <p id='textCopied2' style="font-size: 9px;margin-left: 10px;"></p></span>
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
document.getElementById("folderPath2").addEventListener("click", function() {
    navigator.clipboard.writeText(folderPath);
    document.getElementById("textCopied2").innerHTML = "Copied!";
        setTimeout(function() {
            document.getElementById("textCopied2").innerHTML = '';
        }, 1000);
  });
