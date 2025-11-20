# Userscripts

My personal must-have scripts are currently (2025-06-15) these:

[youtube-remove-timestamp.user.js](https://github.com/Alistair1231/my-userscripts/blob/master/youtube-remove-timestamp.user.js): This removes the timestamp from YouTube URLs (clicking on a history entry adds this), after loading. That way, you don't lose your place in a video, when you reload the page for some reason.


[youtube-music-high-quality-video.user.js](https://github.com/Alistair1231/my-userscripts/blob/master/youtube-music-high-quality-video.user.js): This forces the quality for Music Videos on YouTube Music to the highest quality available, which is usually 720p. 


[youtube-embed-quality.user.js](https://github.com/Alistair1231/my-userscripts/blob/master/youtube-embed-quality.user.js): This sets the default quality for YouTube embeds to 4k or maximum available quality.


[reddit-side-bar-max-width.user.js](https://github.com/Alistair1231/my-userscripts/blob/master/reddit-side-bar-max-width.user.js): This makes the sidebar be toggable on Reddit, also sets a max width for the sidebar to prevent it from being too wide. 


[html5-audio-ratio.user.js](https://github.com/Alistair1231/my-userscripts/blob/master/html5-audio-ratio.user.js): This makes the volume slider on HTML5 audio elements use a ratio instead of a linear scale, which allows for more precise volume control. I hate that this is not the default behavior.  
The credit for this script goes to the Marco Pfeiffer, I just added a different match URL to it.


[half-page-scroll.user.js](https://github.com/Alistair1231/my-userscripts/blob/master/half-page-scroll.user.js): This makes Page Up and Page Down scroll half a page instead of a full page, which is useful for reading long articles.

[universal-media-hotkeys.user.js](https://github.com/Alistair1231/my-userscripts/blob/master/universal-media-hotkeys.user.js): This currently only implements `<` and `>` for playback speed on all HTML5 players, similar to how it works on Youtube. Maybe more features in the future.

-----

As a tip, if you want to use one of these without a Userscript Manager, you can make a Bookmarklet out of it and run it on demand. I use this for the audio ratio script on some devices. I tend to use this bookmarklet maker: https://caiorss.github.io/bookmarklet-maker/

As Userscript Managers I currently recommend [Tampermonkey](https://www.tampermonkey.net/).  

I currently develop on Tampermonkey with Brave. But even with that, there are no guarantees. Websites change, and I don't always notice. Especially for older scripts which I may not use anymore.
