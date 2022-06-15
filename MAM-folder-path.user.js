// ==UserScript==
// @name         MAM folder path
// @namespace    https://greasyfork.org/en/users/12725-alistair1231
// @version      0.1.0
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
var folderPath = `${author} - ${series}/Book ${bookOfSeries} - ${bookTitle}`

var seriesDiv  = document.getElementById("Series").parentElement;
var folderText = document.createElement("div");
folderText.innerHTML = `
<div class="torDetRow">
    <div class="torDetLeft">Folder Path</div>
    <div id="Folder" class="torDetRight torSeries">
        <span class="flex"><a id='folderPath'>/${folderPath}</a></span>
    </div>
</div>
`
.next().text('text copied');

        setTimeout(function(){$(elem).next().text('');}, 2000);
seriesDiv.after(folderText);

// make click to copy
document.getElementById("folderPath").addEventListener("click", function() {
    navigator.clipboard.writeText(folderPath);
  });

  // add copied popup
    document.getElementById("folderPath").addEventListener("mouseup", function(e) {
    if (e.button === 2) {
        document.getElementById("folderPath").innerHTML = "Copied!";
        setTimeout(function() {
            document.getElementById("folderPath").innerHTML = folderPath;
        }, 1000);
    }
});