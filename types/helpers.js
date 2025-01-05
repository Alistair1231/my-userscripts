const storage = {
  /**
   * Retrieves and parses a JSON value from localStorage
   * @async
   * @param {string} key - Storage key to retrieve
   * @returns {Promise<any>} Parsed JSON value
   */
  get: async (key) => {
    key = `evolveCloudSave_${key}`
    const value = localStorage[key]
    return value === undefined ? null : JSON.parse(value)
  },

  /**
   * Stringifies and stores a value in localStorage
   * @async
   * @param {string} key - Storage key to set
   * @param {any} value - Value to stringify and store
   * @returns {Promise<string>} Stringified value that was stored
   */
  set: async (key, value) => {
    key = `evolveCloudSave_${key}`
    return (localStorage[key] = JSON.stringify(value))
  },

  /**
   * Lists all storage keys after splitting on underscore
   * @async
   * @returns {Promise<string[]>} Array of storage key second parts
   */
  list: async () => {
    let keys = Object.keys(localStorage)
    // filter out keys that don't start with "evolveCloudSave_"
    keys = keys.filter((key) => key.startsWith('evolveCloudSave_'))
    // remove the "evolveCloudSave_" prefix
    keys = keys.map((key) => key.replace('evolveCloudSave_', ''))
    return keys
  },

  /**
   * Removes an item from localStorage
   * @async
   * @param {string} key - Storage key to delete
   * @returns {Promise<void>}
   */
  delete: async (key) => {
    key = `evolveCloudSave_${key}`
    delete localStorage[key]
  },
}

/**
 * Waits for an element matching the selector to appear in the DOM
 * @param {string} selector - CSS selector to match element
 * @param {function} callback - Function to execute when element is found
 * @param {number} [interval=100] - Time in ms between checks for element
 * @param {number} [timeout=5000] - Maximum time in ms to wait before giving up
 */
function waitFor(selector, callback, interval = 100, timeout = 5000) {
  const startTime = Date.now()
  const check = () => {
    const element = document.querySelector(selector)
    if (element) {
      callback(element)
    } else if (Date.now() - startTime < timeout) {
      setTimeout(check, interval)
    }
  }
  check()
}
