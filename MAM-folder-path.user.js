// ==UserScript==
// @name         MAM folder path
// @namespace    https://greasyfork.org/en/users/12725-alistair1231
// @version      0.1.2
// @description  Add Audiobook folder path to torrent info
// @author       Alistair1231
// @include      https://www.myanonamouse.net/t/*
// @downloadURL  https://github.com/Auncaughbove17/my-userscripts/raw/main/MAM-folder-path.user.js
// @grant        none
// ==/UserScript==

var bookTitle = document.getElementsByClassName("TorrentTitle")[0].innerHTML.trim();
var author = document.getElementsByClassName("torDetRight torAuthors")[0].textContent.trim();
var series = document.getElementsByClassName("torDetRight torSeries")[0].firstChild.firstChild.text.trim();
var bookOfSeries = document.getElementsByClassName("torDetRight torSeries")[0].firstChild.childNodes[1].data.match(/\d+/);
var folderPath = `/${author} - ${series}/Book ${bookOfSeries} - ${bookTitle}`

var seriesDiv  = document.getElementById("Series").parentElement;
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
seriesDiv.after(folderText);

// make click to copy
document.getElementById("folderPath").addEventListener("click", function() {
    navigator.clipboard.writeText(folderPath);
    document.getElementById("textCopied").innerHTML = "Copied!";
        setTimeout(function() {
            document.getElementById("textCopied").innerHTML = '';
        }, 1000);
  });
