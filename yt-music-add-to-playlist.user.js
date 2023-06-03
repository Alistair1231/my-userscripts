// ==UserScript==
// @name         yt-music add to playlist
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.1.1
// @description  Adds a button to add a song to a playlist on the yt-music website
// @author       Alistair1231
// @match        https://music.youtube.com/watch?v=*
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    function getClickyThing(text, parent) {
        return [...document.querySelectorAll("div#contentWrapper yt-formatted-string")].filter(x => x.innerHTML === text)[0].closest(parent);
    }
    
    function addToPlaylist(playlistName) {
        setTimeout(
            () => {
                // ... button
                var menu = document.querySelector(".ytmusic-player-bar yt-button-shape[aria-label='More actions'] button");
    
                menu.click();
                setTimeout(
                    () => {
                        getClickyThing("Add to playlist", "a").click();
                        setTimeout(
                            () => {
                                getClickyThing(playlistName, "div").click();
                            }, 500);
                    }, 500);
            }, 500);
    }
    
    
    function createButton(playlistName) {
        var myButton = document.createElement("yt-button-shape");
        myButton.id = "button-shape-add-to-reeeep2";
        myButton.setAttribute("aria-label", "Add to reeeep2");
        myButton.setAttribute("class", "like style-scope ytmusic-add-to-reeeep2-renderer");
        myButton.setAttribute("version", "modern");
        myButton.setAttribute("aria-pressed", "false");
         // append the button to the body
        document.querySelector("#layout > ytmusic-player-bar > div.middle-controls.style-scope.ytmusic-player-bar > div.middle-controls-buttons.style-scope.ytmusic-player-bar").appendChild(myButton);
        
        // set the text of the button
        myButton.innerHTML = `<yt-icon class="style-scope yt-button-renderer" button-renderer="" icon="ADD_TO_PLAYLIST"></yt-icon> reeeep2`;
        
        myButton.addEventListener("click", () => addToPlaylist(playlistName));
    }
    
    createButton("reeeep2");
    
})();
