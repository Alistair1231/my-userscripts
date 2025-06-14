// @version v1.1.0
// @license GPL-3.0
// @author Alistair1231

//? Use like this:
// @grant GM.getValue
// @grant GM.setValue
// @grant GM.deleteValue
// @grant GM.listValues
// @require https://cdn.jsdelivr.net/gh/Alistair1231/my-userscripts@{commit_hash}/lib.js

const lib = (() => {
  /**
   * Waits for a specific element to exist in the DOM before executing a callback.
   *
   * Example:
   * lib.waitFor('#elementId', (element) => console.log('Element found:', element));
   */
  const waitFor = async (
    selector,
    callback,
    interval = 100,
    timeout = 5000
  ) => {
    const startTime = Date.now();

    const check = () => {
      const element = document.querySelector(selector);
      if (element) {
        callback(element);
      } else if (Date.now() - startTime < timeout) {
        setTimeout(check, interval);
      }
    };
    check();
  };

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
  const retry = async (fn, retries = 5, delay = 200) => {
    let lastError;
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        return await fn();
      } catch (err) {
        lastError = err;
        if (attempt < retries) {
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    }
    throw lastError;
  };

  /**
   * Intercepts events on specific elements matching a selector.
   *
   * Example:
   * lib.intercept('click', '#buttonId', (event) => console.log('Button clicked:', event));
   */
  const intercept = async (eventType, selector, handler) => {
    document.addEventListener(eventType, (event) => {
      if (event.target.matches(selector)) {
        handler(event);
      }
    });
  };

  const settings = new Proxy(
    {},
    {
      get: (target, key) => {
        const value = GM.getValue(key, null);
        try {
          return JSON.parse(value);
        } catch {
          return value;
        }
      },
      set: (target, key, value) => {
        const toStore =
          typeof value === "object" ? JSON.stringify(value) : value;
        GM.setValue(key, toStore);
        return true;
      },
      deleteProperty: (target, key) => {
        GM.deleteValue(key);
        return true;
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
          };
        }
        return undefined;
      },
    }
  );

  return {
    waitFor,
    intercept,
    settings,
  };
})();
