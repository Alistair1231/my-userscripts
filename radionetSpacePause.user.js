// ==UserScript==
// @name         Radio.net space for toggle play/pause
// @namespace    https://greasyfork.org/en/users/12725-alistair1231
// @version      0.1.2
// @description  Makes it so spacebar toggles pause/play instead of scrolling down the page.
// @author       Alistair1231
// @match        https://www.radio.net/s/*
// @downloadURL  https://github.com/Auncaughbove17/my-userscripts/raw/main/radionetSpacePause.user.js
// @icon         https://icons.duckduckgo.com/ip2/radio.net.ico
// @grant        none
// @license GPL-3.0
// ==/UserScript==

(function() {
    'use strict';

function togglePlayingState(e){
    if(e.keyCode==32){
        e.preventDefault();
        let playButton = document.querySelector(".player__button.player__button--stopped.icon-play-circle")
        let stopButton = document.querySelector(".player__button.player__button--playing.icon-play-circle")

        let currentlyPlaying= playButton.style["display"]=='none' // play button hidden

        if(currentlyPlaying){
            console.log("stop")
            stopButton.click()
        }
        else{
            console.log("start")
            playButton.click()
        }
    }
}

document.addEventListener('keydown', togglePlayingState, false);


})();