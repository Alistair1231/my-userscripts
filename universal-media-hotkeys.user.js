// ==UserScript==
// @name         Universal Media Hotkeys
// @namespace    https://github.com/Alistair1231/my-userscripts
// @version      0.3.1
// @license      AGPLv3
// @description  Speed Hotkeys
// @match        http*://*/*
// @downloadURL  https://github.com/Alistair1231/my-userscripts/raw/master/universal-media-hotkeys.user.js
// @updateURL    https://github.com/Alistair1231/my-userscripts/raw/master/universal-media-hotkeys.user.js
// ==/UserScript==

(function () {
  // Domains to exclude from hotkey interception
  const EXCLUDED_HOSTNAMES = ["youtube.com"];
  // Define the playback speed steps
  const SPEED_STEPS = [0.25, 0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];

  // Store target speed per video element (WeakMap so it doesn't leak memory)
  const targetSpeeds = new WeakMap();

  // Helper to find the closest speed in SPEED_STEPS
  function findClosestSpeedIndex(current) {
    let closestIdx = 0;
    let minDiff = Math.abs(SPEED_STEPS[0] - current);

    for (let i = 1; i < SPEED_STEPS.length; i++) {
      const diff = Math.abs(SPEED_STEPS[i] - current);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = i;
      }
    }
    return closestIdx;
  }

  // Helper to get the next/previous speed
  function getNextSpeed(current) {
    const idx = findClosestSpeedIndex(current);
    if (idx === SPEED_STEPS.length - 1) {
      // stay at max
      return SPEED_STEPS[idx];
    }
    return SPEED_STEPS[idx + 1];
  }

  function getPrevSpeed(current) {
    const idx = findClosestSpeedIndex(current);
    if (idx === 0) {
      // stay at min
      return SPEED_STEPS[idx];
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

  // Function to get current target speed for an element
  function getCurrentSpeed(el) {
    // Use stored target speed if available, otherwise use actual playbackRate
    return targetSpeeds.has(el) ? targetSpeeds.get(el) : el.playbackRate;
  }

  // Function to enforce speed on an element
  function enforceSpeed(el, speed) {
    targetSpeeds.set(el, speed);
    el.playbackRate = speed;
    console.log(`[Media Hotkeys] Set speed to ${speed} (actual: ${el.playbackRate})`);
  }

  // Function to change speed
  function changeSpeed(direction) {
    let currentSpeed = null;
    let foundPlaying = false;
    document.querySelectorAll("audio, video").forEach((el) => {
      // Only change speed if media is playing
      if (!el.paused && !el.ended && el.currentTime > 0) {
        const oldSpeed = getCurrentSpeed(el);
        const newSpeed =
          direction === "increase"
            ? getNextSpeed(oldSpeed)
            : getPrevSpeed(oldSpeed);
        console.log(`[Media Hotkeys] Speed change: ${oldSpeed} -> ${newSpeed} (${direction})`);
        enforceSpeed(el, newSpeed);
        currentSpeed = newSpeed;
        foundPlaying = true;
      }
    });
    if (foundPlaying && currentSpeed !== null) {
      showSpeedToast(currentSpeed);
    }
  }

  // Continuously enforce target speeds (some sites reset playbackRate)
  setInterval(() => {
    document.querySelectorAll("audio, video").forEach((el) => {
      if (targetSpeeds.has(el) && !el.paused && !el.ended && el.currentTime > 0) {
        const targetSpeed = targetSpeeds.get(el);
        // Only update if the site has reset it
        if (Math.abs(el.playbackRate - targetSpeed) > 0.01) {
          console.log(`[Media Hotkeys] Enforcing speed: ${el.playbackRate} -> ${targetSpeed}`);
          el.playbackRate = targetSpeed;
        }
      }
    });
  }, 500); // Check every 500ms

  // Add keyboard event listener (prevent duplicates)
  if (!window.speedControllerActive) {
    window.speedControllerActive = true;

    document.addEventListener("keydown", function (e) {
      // DEBUG: Log all key presses
      console.log("[Media Hotkeys] Key pressed:", {
        key: e.key,
        code: e.code,
        shiftKey: e.shiftKey,
        hostname: window.location.hostname
      });

      // Exclude certain hostnames
      if (
        EXCLUDED_HOSTNAMES.some((domain) =>
          window.location.hostname.includes(domain)
        )
      ) {
        console.log("[Media Hotkeys] Skipping - excluded hostname");
        return;
      }

      // Only trigger if no input/textarea is focused
      const activeTag = document.activeElement.tagName;
      console.log("[Media Hotkeys] Active element:", activeTag);

      if (
        activeTag !== "INPUT" &&
        activeTag !== "TEXTAREA" &&
        !document.activeElement.isContentEditable
      ) {
        // Check if any audio or video is currently playing
        const mediaElements = Array.from(document.querySelectorAll("audio, video"));
        console.log("[Media Hotkeys] Found media elements:", mediaElements.length);

        const isMediaPlaying = mediaElements.some((el) => {
          const playing = !el.paused && !el.ended && el.currentTime > 0;
          console.log("[Media Hotkeys] Media status:", {
            element: el.tagName,
            paused: el.paused,
            ended: el.ended,
            currentTime: el.currentTime,
            playing: playing
          });
          return playing;
        });

        console.log("[Media Hotkeys] Is media playing:", isMediaPlaying);

        if (isMediaPlaying) {
          if (e.key === ">" || (e.shiftKey && e.code === "Period")) {
            console.log("[Media Hotkeys] Increasing speed");
            e.preventDefault();
            changeSpeed("increase");
          } else if (e.key === "<" || (e.shiftKey && e.code === "Comma")) {
            console.log("[Media Hotkeys] Decreasing speed");
            e.preventDefault();
            changeSpeed("decrease");
          }
        }
        // If no media is playing, let browser handle the key
      } else {
        console.log("[Media Hotkeys] Skipping - input/textarea focused or contentEditable");
      }
    });
  }
})();
