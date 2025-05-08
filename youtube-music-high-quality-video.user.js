// ==UserScript==
// @name         Youtube Music High Quality Video
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.1.1
// @description  Sets the video quality to 1440p on Youtube Music
// @author       Alistair1231
// @match        https://music.youtube.com/watch*
// @icon         https://icons.duckduckgo.com/ip2/youtube.com.ico
// @license      MIT
// ==/UserScript==
// https://greasyfork.org/en/scripts/535348-youtube-music-high-quality-video
// https://github.com/Alistair1231/my-userscripts/blob/master/youtube-music-high-quality-video.user.js

(function () {
  "use strict";
  /**
   *
   * @param {string} quality - The quality to set the video to. Can be one of the following:
   * auto / highres / hd2880 / hd2160 / hd1440 / hd1080 / hd720 / large / medium / small / tiny
   * If a quality is unavailable, it will be set to the next best quality.
   * @returns
   */
  const setQuality = (quality) =>
    document.getElementById("movie_player").setPlaybackQualityRange(quality);

  const checkElement = () => {
    const element = document.getElementById("movie_player");
    if (!element) setTimeout(checkElement, 500);
    else {
      setQuality("hd1440");
    }
  };

  checkElement();
})();
