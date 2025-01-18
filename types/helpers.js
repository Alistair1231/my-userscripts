/**
 * Storage utility object for managing localStorage data
 */
const storage = (() => {
  const prefix = 'evolveCloudSave_'
  return {
    /**
     * Retrieves and parses a JSON value from localStorage
     * @async
     * @param {string} key - Storage key to retrieve
     * @returns {Promise<any>} Parsed JSON value
     */
    get: async (key) => {
      key = `${prefix}${key}`
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
      key = `${prefix}${key}`
      return (localStorage[key] = JSON.stringify(value))
    },

    /**
     * Lists all storage keys after splitting on underscore
     * @async
     * @returns {Promise<string[]>} Array of storage key second parts
     */
    list: async () => {
      let keys = Object.keys(localStorage)
      // filter out keys that don't start with `${prefix}`
      keys = keys.filter((key) => key.startsWith('${prefix}'))
      // remove the "${prefix}" prefix
      keys = keys.map((key) => key.replace('${prefix}', ''))
      return keys
    },

    /**
     * Removes an item from localStorage
     * @async
     * @param {string} key - Storage key to delete
     * @returns {Promise<void>}
     */
    delete: async (key) => {
      key = `${prefix}${key}`
      delete localStorage[key]
    },
  }
})()

//! v --- waitFor --- v
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
//? ^ --- waitFor --- ^

//! v --- FormatString --- v
/**
 * Adds a `format` method to the String prototype for template-based string interpolation.
 * @param {...*} args - Values to replace placeholders with.
 * @returns {string} Formatted string with placeholders replaced by argument values.
 * @example
 * const template = "Hello, {0}!";
 * const result = template.format("world"); // "Hello, world!"
 */
String.prototype.format = function (...args) {
  return this.replace(/{(\d+)}/g, (match, number) => {
    return typeof args[number] !== 'undefined' ? args[number] : match
  })
}
//? ^ --- FormatString --- ^

//! v --- Find by text --- v
/**
 * Searches for elements within the calling array or NodeList that contain the specified text.
 * @param {string|RegExp} text Text to search for.
 * @returns {Array} Array of elements that contain the specified text.
 * @example
 * const elements = document.querySelectorAll('div');
 * const results = elements.findByText('hello'); // Finds divs containing the word 'hello'
 */

function findByText(text) {
  let entries = new Set()

  this.forEach((element) => {
    if (textMatches(element.innerHTML, text)) {
      entries.add(element)
    }
  })

  return Array.from(entries)

  function textMatches(content, searchText) {
    return searchText instanceof RegExp
      ? searchText.test(content)
      : content.includes(searchText)
  }
}

Object.defineProperty(NodeList.prototype, 'findByText', {
  enumerable: false,
  writable: true,
  value: findByText,
})

Object.defineProperty(Array.prototype, 'findByText', {
  enumerable: false,
  writable: true,
  value: findByText,
})

/**
 * Searches for elements within the calling array or NodeList that contain the specified text.
 * @param {string|RegExp} query - Text or regular expression to search for.
 * @param {string} [attribute] - Optional attribute to search within.
 * @returns {Array} Array of element-children that contain the specified text.
 * @example
 * var regex = /(https:\/\/[^\.]+\.domain\.com\/samples\/[^\/]+\/[^_]+\_)s(_.....)/g;
 * document.querySelectorAll("div.message-body").searchChildren(regex).forEach((x) => {
 *   x.innerHTML = x.innerHTML.replaceAll(regex, "$1l$2");
 * });
 */
function findChildren(query) {
  const results = []
  const matcher =
    typeof query === 'string'
      ? (html) => html.includes(query)
      : (html) => query.test(html)

  const search = (elements) => {
    elements.forEach((element) => {
      if (element.nodeType === Node.ELEMENT_NODE) {
        const innerHTML = element.innerHTML || ''
        if (matcher(innerHTML)) {
          results.push(element)
        }

        // Recursively search children if the element has child nodes
        if (element.childNodes && element.childNodes.length > 0) {
          search(Array.from(element.childNodes))
        }
      }
    })
  }

  search(this)

  // Filter results to remove parent elements if their children are already in the results
  return results.filter(
    (element) =>
      !results.some((other) => other !== element && element.contains(other))
  )
}
Object.defineProperty(NodeList.prototype, 'findChildren', {
  enumerable: false,
  writable: true,
  value: findChildren,
})

Object.defineProperty(Array.prototype, 'findChildren', {
  enumerable: false,
  writable: true,
  value: findChildren,
})

//? ^ --- Find by text --- ^

//! v --- createObserver --- v
/**
 * Creates a mutation observer on the specified element and executes a callback when child elements are added or removed.
 * @param {Element} element - The DOM element to observe.
 * @param {function} callback - Function to execute when a mutation is observed.
 * @returns {MutationObserver} The created MutationObserver instance.
 * @example
 * const element = document.getElementById('myElement');
 * const observer = createObserver(element, (mutation) => {
 *   console.log('Child nodes changed:', mutation);
 * });
 */
function createObserver(element, callback) {
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (mutation.type === 'childList') {
        callback(mutation)
      }
    }
  })
  observer.observe(element, { childList: true, subtree: true })
  return observer
}
//? ^ --- createObserver --- ^
