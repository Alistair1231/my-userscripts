// ==UserScript==
// @name         This Week in Video Games Faster UX
// @namespace    https://github.com/Alistair1231/my-userscripts
// @version      0.1.0
// @license      AGPLv3
// @description  Instantly show all content on thisweekinvideogames.com by disabling animations
// @match        *://thisweekinvideogames.com/*
// @downloadURL  https://github.com/Alistair1231/my-userscripts/raw/master/thisweekinvideogames-fasterUX.user.js
// @updateURL    https://github.com/Alistair1231/my-userscripts/raw/master/thisweekinvideogames-fasterUX.user.js
// ==/UserScript==

(function() {
  function showAllContent() {
    // Complete all GSAP animations
    if (window.gsap) {
      try {
        window.gsap.globalTimeline.time(window.gsap.globalTimeline.duration(), false);
        window.gsap.globalTimeline.pause();
        window.gsap.globalTimeline.getChildren(true, true, true).forEach(tl => tl.progress(1, false));
      } catch (e) {}
    }
    
    // Disable ScrollTrigger animations
    if (window.ScrollTrigger && window.ScrollTrigger.getAll) {
      try {
        window.ScrollTrigger.getAll().forEach(t => t.disable(false, true));
      } catch (e) {}
    }
    
    // Show all elements by fixing animation-related styles
    document.querySelectorAll('[style]').forEach(el => {
      if (el.style.backgroundImage && !el.style.transform && !el.style.opacity) return;
      
      if (el.style.opacity !== '' && el.style.opacity !== '1') {
        el.style.opacity = '1';
      }
      if (el.style.visibility === 'hidden') {
        el.style.visibility = 'visible';
      }
      if (el.style.transform && (el.style.transform.includes('translateY') || el.style.transform.includes('scale(0)'))) {
        el.style.transform = '';
      }
      el.style.willChange = '';
      el.style.transition = '';
    });
    
    // Fix content masks used for reveal animations
    document.querySelectorAll('.content-mask').forEach(el => {
      if (!el.getAttribute('data-instant-processed')) {
        el.style.transform = '';
        el.style.opacity = '1';
        el.setAttribute('data-instant-processed', 'true');
      }
    });
    
    // Fix scaled elements
    document.querySelectorAll('[style*="scale(0"]').forEach(el => {
      if (!el.getAttribute('data-instant-processed')) {
        el.style.transform = el.style.transform.replace(/scale\([^)]*\)/g, 'scale(1)');
        el.setAttribute('data-instant-processed', 'true');
      }
    });
  }

  // Debounce function
  let timer;
  function debounce(func, delay) {
    return function() {
      clearTimeout(timer);
      timer = setTimeout(func, delay);
    };
  }

  // Run immediately
  showAllContent();
  
  // Override ScrollSmoother if it exists
  if (window.ScrollSmoother) {
    const originalCreate = window.ScrollSmoother.create;
    window.ScrollSmoother.create = function(...args) {
      const smoother = originalCreate.apply(this, args);
      try { smoother.kill(); } catch (e) {}
      return smoother;
    };
  }
  
  // Watch for new content
  const observer = new MutationObserver(debounce(showAllContent, 100));
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
})();