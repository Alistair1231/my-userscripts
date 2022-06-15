// ==UserScript==
// @name         MAM folder path
// @namespace    https://greasyfork.org/en/users/12725-alistair1231
// @version      0.1.0
// @description  Add Audiobook folder path to torrent info
// @author       Alistair1231
// @include      https://www.myanonamouse.net/t/*
// @grant        none
// ==/UserScript==

var bookTitle = document.getElementsByClassName("TorrentTitle")[0].innerHTML.trim();
var author = document.getElementsByClassName("torDetRight torAuthors")[0].textContent.trim();
var series = document.getElementsByClassName("torDetRight torSeries")[0].firstChild.firstChild.text.trim();
var bookOfSeries = document.getElementsByClassName("torDetRight torSeries")[0].firstChild.childNodes[1].data.match(/\d+/);
var folderName = `${author} - ${series}/Book ${bookOfSeries} - ${bookTitle}`

var seriesDiv  = document.getElementById("Series").parentElement;
var folderText = document.createElement("div");
folderText.innerHTML = `
<div class="torDetRow">
    <div class="torDetLeft">Folder Path</div>
    <div id="Folder" class="torDetRight torSeries">
        <span class="flex">/${author} - ${series}/Book ${bookOfSeries} - ${bookTitle}</span>
    </div>
</div>
`

seriesDiv.after(folderText);

