// ==UserScript==
// @name         MAM folder path
// @namespace    https://greasyfork.org/en/users/12725-alistair1231
// @version      0.4.4
// @description  Add Audiobook folder path to torrent info
// @author       Alistair1231
// @include      https://www.myanonamouse.net/t/*
// @downloadURL  https://github.com/Auncaughbove17/my-userscripts/raw/main/MAM-folder-path.user.js
// @grant        none
// ==/UserScript==


/////////////////////////
// find book info and modify it

const cleanUpString = (val) => {
    const decodeHtml = (html) => {
        // make sure there is no &amp; or similiar in the string
        var txt = document.createElement("textarea");
        txt.innerHTML = html;
        return txt.value;
    }
    const replaceSymbols = (val) => val
        .replaceAll(':', ' -')
        .replaceAll('&', 'and')
        .replaceAll(',', '_')
        .replaceAll(/\u00a0/g, " "); // replace all &nbsp; with a space (https://stackoverflow.com/a/1496863)

    return replaceSymbols(decodeHtml(val));
};

var bookTitle = cleanUpString(document.getElementsByClassName("TorrentTitle")[0].innerHTML).trim();
var author = cleanUpString(document.getElementsByClassName("torDetRight torAuthors")[0].textContent).trim();
var series = "";
var bookOfSeries = "";

// if part of a series, add the series name and the book number to the folder path

const addLeadingZero = (bookOfSeries) => {
    // since you cannot add leading zeros without splitting the float into two integers, we have to do this
    let array = String(bookOfSeries).split('.')
    array[0] = array[0].padStart(2, '0')
    return array.join('.')
}

try {
    series = cleanUpString(document.getElementsByClassName("torDetRight torSeries")[0].firstChild.firstChild.text).trim();
    // extract number of book including subpart like 3.1 or 3.5 and add leading zero if needed
    bookOfSeries = addLeadingZero(document.getElementsByClassName("torDetRight torSeries")[0].firstChild.childNodes[1].data.match(/\d+\.?\d*/)).padStart(2, '0');}
catch (TypeError) { }

if (series != "") {
    var folderPath = `/_Audiobooks/${author} - ${series}/Book ${bookOfSeries} - ${bookTitle}`;
    var folderPath2 = `/_Audiobooks1/${author} - ${series}/Book ${bookOfSeries} - ${bookTitle}`;
    var folderPath3 = `Book ${bookOfSeries} - ${bookTitle}`;
} else {
    var folderPath = `/_Audiobooks/${author} - Loose Books/${bookTitle}`;
    var folderPath2 = `/_Audiobooks1/${author} - Loose Books/${bookTitle}`;
    var folderPath3 = `${bookTitle}`;
}

var narratorDiv = document.getElementById("Narrator").parentElement;
var folderText = document.createElement("div");


/////////////////////////
// create HTML to inject and inject it

const createFolderText = (idA, idP, folderPath) => `
    <div id="Folder" class="torDetRight torSeries">
            <span class="flex"><a id='${idA}'>${folderPath}</a>
            <p id='${idP}' style="font-size: 9px;margin-left: 10px;"></p></span>
    </div>
    `;

folderText.innerHTML = `
<div class="torDetRow">
    <div class="torDetLeft">Folder Path</div>
    ${createFolderText("folderPath", "textCopied", folderPath)}
    ${createFolderText("folderPath2", "textCopied2", folderPath2)}
    ${createFolderText("folderPath3", "textCopied3", folderPath3)}
</div>
`
narratorDiv.before(folderText);

/////////////////////////
// make click to copy

const createClickToCopy = (idA, idP, value) => {
    document.getElementById(idA).addEventListener("click", function () {
        navigator.clipboard.writeText(value);
        document.getElementById(idP).innerHTML = "Copied!";
        setTimeout(function () {
            document.getElementById(idP).innerHTML = '';
        }, 1000);
    });
}

createClickToCopy("folderPath", "textCopied", folderPath);
createClickToCopy("folderPath2", "textCopied2", folderPath2);
createClickToCopy("folderPath3", "textCopied3", folderPath3);

/////////////////////////