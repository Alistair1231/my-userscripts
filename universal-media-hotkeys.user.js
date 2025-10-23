// ==UserScript==
// @name         Universal Media Hotkeys
// @namespace    https://github.com/Alistair1231/my-userscripts
// @version      0.1.0
// @license      AGPLv3
// @description  Instantly show all content on thisweekinvideogames.com by disabling animations
// @match        http*://*/*
// @downloadURL  https://github.com/Alistair1231/my-userscripts/raw/master/universal-media-hotkeys.user.js
// @updateURL    https://github.com/Alistair1231/my-userscripts/raw/master/universal-media-hotkeys.user.js
// ==/UserScript==

(function () {
  // Domains to exclude from hotkey interception
  const EXCLUDED_HOSTNAMES = ["youtube.com"];
  // Define the playback speed steps
  const SPEED_STEPS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  // Helper to get the next/previous speed
  function getNextSpeed(current) {
    const idx = SPEED_STEPS.indexOf(current);
    if (idx === -1 || idx === SPEED_STEPS.length - 1) {
      return SPEED_STEPS[0];
    }
    return SPEED_STEPS[idx + 1];
  }

  function getPrevSpeed(current) {
    const idx = SPEED_STEPS.indexOf(current);
    if (idx === -1 || idx === 0) {
      return SPEED_STEPS[SPEED_STEPS.length - 1];
    }
    return SPEED_STEPS[idx - 1];
  }

  // Function to show toast
  function showSpeedToast(speed) {
    // Remove existing toast if any
    const existingToast = document.querySelector("#speed-toast");
    if (existingToast) existingToast.remove();

    const toast = document.createElement("div");
    toast.id = "speed-toast";
    toast.textContent = `Playback speed: ${speed}x`;
    Object.assign(toast.style, {
      position: "fixed",
      top: "20px",
      right: "20px",
      zIndex: 2147483647,
      background: "rgba(0,0,0,0.85)",
      color: "#fff",
      padding: "12px 24px",
      borderRadius: "8px",
      fontSize: "18px",
      fontFamily: "sans-serif",
      boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
      transition: "opacity 0.5s",
    });

    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
    }, 1200);
    setTimeout(() => {
      toast.remove();
    }, 1700);
  }

  // Function to change speed
  function changeSpeed(direction) {
    let currentSpeed = null;
    let foundPlaying = false;
    document.querySelectorAll("audio, video").forEach((el) => {
      // Only change speed if media is playing
      if (!el.paused && !el.ended && el.currentTime > 0) {
        const newSpeed =
          direction === "increase"
            ? getNextSpeed(el.playbackRate)
            : getPrevSpeed(el.playbackRate);
        el.playbackRate = newSpeed;
        currentSpeed = newSpeed;
        foundPlaying = true;
      }
    });
    if (foundPlaying && currentSpeed !== null) {
      showSpeedToast(currentSpeed);
    }
  }

  // Add keyboard event listener (prevent duplicates)
  if (!window.speedControllerActive) {
    window.speedControllerActive = true;

    document.addEventListener("keydown", function (e) {
      // Exclude certain hostnames
      if (
        EXCLUDED_HOSTNAMES.some((domain) =>
          window.location.hostname.includes(domain)
        )
      )
        return;
      // Only trigger if no input/textarea is focused
      if (
        document.activeElement.tagName !== "INPUT" &&
        document.activeElement.tagName !== "TEXTAREA"
      ) {
        // Check if any audio or video is currently playing
        const isMediaPlaying = Array.from(
          document.querySelectorAll("audio, video")
        ).some((el) => !el.paused && !el.ended && el.currentTime > 0);
        if (isMediaPlaying) {
          if (e.key === ">") {
            e.preventDefault();
            changeSpeed("increase");
          } else if (e.key === "<") {
            e.preventDefault();
            changeSpeed("decrease");
          }
        }
        // If no media is playing, let browser handle the key
      }
    });
  }
})();
