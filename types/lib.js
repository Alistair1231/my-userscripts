/* eslint-disable no-unused-vars */
// @version v1.2.0
// @license GPL-3.0
// @author Alistair1231

//? Use like this:
// @grant GM.getValue
// @grant GM.setValue
// @grant GM.deleteValue
// @grant GM.listValues
// @require https://cdn.jsdelivr.net/gh/Alistair1231/my-userscripts@{commit_hash}/lib.js

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
   * Waits for a specific element to exist in the DOM before executing a callback.
   * @param {string} selector - CSS selector for the element to wait for.
   * @param {Function} callback - Function to execute when the element is found.
   * @param {boolean} [multiple=false] - If true, applies querySelectorAll instead of querySelector. Success if length is > 0.
   * @param {number} [interval=100] - Time in milliseconds to wait between checks. default is 100ms.
   * @param {number} [timeout=5000] - Maximum time in milliseconds to wait for the element. default is 5000ms.
   * Example:
   * lib.waitFor('#elementId', (element) => console.log('Element found:', element));
   */
  waitFor: async (
    selector,
    callback,
    multiple = false,
    interval = 100,
    timeout = 5000
  ) => {
    const startTime = Date.now()

    const check = () => {
      let element
      let recheck = false

      // Check if the element exists
      // If multiple is true, use querySelectorAll, otherwise use querySelector
      if (multiple) element = document.querySelectorAll(selector)
      else element = document.querySelector(selector)

      // If the element is not found, recheck after the interval
      // If multiple is true, check if the NodeList is empty
      if (multiple && element.length === 0) recheck = true
      // If not multiple, check if the element is null
      else if (!multiple && !element) recheck = true

      // If the element was not found and the timeout has not been reached, recheck
      if (recheck && Date.now() - startTime < timeout) {
        setTimeout(check, interval)
      }
      // If the element is found, execute the callback and pass the element(s)
      callback(element)
    }
    check()
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
