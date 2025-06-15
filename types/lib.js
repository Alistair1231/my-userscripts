/* eslint-disable no-unused-vars */
// @version v1.3.0
// @license GPL-3.0
// @author Alistair1231

//? Use like this:
// In metadata block of your userscript, add:
//  @require https://cdn.jsdelivr.net/gh/Alistair1231/my-userscripts@{commit_hash}/types/lib.js

// The following @grant permissions are used, just start without them and add them as needed:
//  GM.getValue, GM.setValue, GM.deleteValue, GM.listValues

// Then define a userscript like this:
//  (async () => {
//    /*global lib */
//    /**
//     * @typedef {import('./types/lib.js').Lib} Lib
//     * @type {Lib}
//     */
//    YOUR CODE HERE
//  })(lib);

/**
 * A library of utility functions for userscripts.
 * Provides functions to wait for elements, intercept events, and manage settings.
 * @module lib
 * @requires GM.getValue
 * @requires GM.setValue
 * @requires GM.deleteValue
 * @requires GM.listValues
 */
const lib = {
  /**
   * Waits for an element to appear in the DOM and executes a callback when found.
   * @param {string} selector - CSS selector for the element to wait for.
   * @param {Function} callback - Function to execute when the element is found.
   * @param {boolean} [multiple=false] - If true, applies querySelectorAll instead of querySelector. Success if length is > 0.
   * @param {number} [interval=100] - Time in milliseconds to wait between checks. default is 100ms.
   * @param {number} [timeout=5000] - Maximum time in milliseconds to wait for the element. default is 5000ms.
   * Example:
   *  const btn = await lib.waitFor('.ytp-settings-button')
   *  btn.click()
   */
  waitFor: (selector, multiple = false, interval = 100, timeout = 5000) => {
    return new Promise((resolve, reject) => {
      const startTime = Date.now()
      const check = () => {
        let element = multiple
          ? document.querySelectorAll(selector)
          : document.querySelector(selector)
        let found = multiple ? element.length > 0 : !!element
        if (found) {
          resolve(element)
        } else if (Date.now() - startTime < timeout) {
          setTimeout(check, interval)
        } else {
          reject(new Error('Timeout waiting for ' + selector))
        }
      }
      check()
    })
  },
  waitForText: (selector, text, interval = 100, timeout = 5000) => {
    return new Promise((resolve, reject) => {
      const startTime = Date.now()
      const check = () => {
        const elements = document.querySelectorAll(selector)
        for (const el of elements) {
          if (el.textContent.includes(text)) {
            resolve(el)
            return
          }
        }
        if (Date.now() - startTime < timeout) {
          setTimeout(check, interval)
        } else {
          reject(
            new Error(`Timeout waiting for ${selector} with text "${text}"`)
          )
        }
      }
      check()
    })
  },

  /**
   * Retries an async function until it succeeds or max retries are reached.
   * @param {Function} fn - The async function to retry. Should return a Promise.
   * @param {number} retries - Number of times to retry.
   * @param {number} delay - Delay between retries in ms.
   * @returns {Promise<*>} - Resolves with the function's result or rejects after all retries.
   * example:
   * lib.retry(() => async () => {
   *  const foo = document.querySelector('#foo');
   *  if (!foo) throw new Error('Element not found');
   *  return foo;
   * }, 5, 200)
   */
  retry: async (fn, retries = 5, delay = 200) => {
    let lastError
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await fn()
      } catch (err) {
        lastError = err
        if (attempt < retries) {
          await new Promise((resolve) => setTimeout(resolve, delay))
        }
      }
    }
    throw lastError
  },
  /**
   * Intercepts events on specific elements matching a selector.
   *
   * Example:
   * lib.intercept('click', '#buttonId', (event) => console.log('Button clicked:', event));
   */
  intercept: async (eventType, selector, handler) => {
    document.addEventListener(eventType, (event) => {
      if (event.target.matches(selector)) {
        handler(event)
      }
    })
  },

  settings: new Proxy(
    {},
    {
      get: (target, key) => {
        const value = GM.getValue(key, null)
        try {
          return JSON.parse(value)
        } catch {
          return value
        }
      },
      set: (target, key, value) => {
        const toStore =
          typeof value === 'object' ? JSON.stringify(value) : value
        GM.setValue(key, toStore)
        return true
      },
      deleteProperty: (target, key) => {
        GM.deleteValue(key)
        return true
      },
      ownKeys: () => GM.listValues(),
      has: (target, key) => GM.listValues().includes(key),
      getOwnPropertyDescriptor: (target, key) => {
        if (GM.listValues().includes(key)) {
          return {
            configurable: true,
            enumerable: true,
            value: GM.getValue(key, null),
            writable: true,
          }
        }
        return undefined
      },
    }
  ),
}
