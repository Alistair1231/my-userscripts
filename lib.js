// @version v1.0.6
// @license GPL-3.0
// @author Alistair1231

//? Use like this:
// @require https://cdn.jsdelivr.net/gh/Alistair1231/my-userscripts@v1.0.6/lib.js
//! then in your script: `const lib = { ...libDefault };`

//? optionally, you can import libRequest and libValues as well, like so:
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_deleteValue
// @grant GM_listValues
// @require https://cdn.jsdelivr.net/gh/Alistair1231/my-userscripts@v1.0.6/libValues.js
//! then in your script: `const lib = { ...libDefault, ...libRequest, ...libValues };`

const libDefault = (() => {
  /**
   * Waits for a specific element to exist in the DOM before executing a callback.
   *
   * Example:
   * lib.waitFor('#elementId', (element) => console.log('Element found:', element));
   */
  const waitFor = (selector, callback, interval = 100, timeout = 5000) => {
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

  /**
   * Intercepts events on specific elements matching a selector.
   *
   * Example:
   * lib.intercept('click', '#buttonId', (event) => console.log('Button clicked:', event));
   */
  const intercept = (eventType, selector, handler) => {
    document.addEventListener(eventType, (event) => {
      if (event.target.matches(selector)) {
        handler(event)
      }
    })
  }

  /**
   * Logger
   * Provides logging functionality with different log levels.
   *
   * Examples:
   * lib.logger.info('This is an info message');
   * lib.logger.error('This is an error message');
   */
  const logger = {
    logLevel: 'info',
    levels: ['error', 'warn', 'info', 'debug'],

    log(level, message, ...args) {
      if (this.levels.indexOf(level) <= this.levels.indexOf(this.logLevel)) {
        console[level](message, ...args)
      }
    },
    error: (message, ...args) => logger.log('error', message, ...args),
    warn: (message, ...args) => logger.log('warn', message, ...args),
    info: (message, ...args) => logger.log('info', message, ...args),
    debug: (message, ...args) => logger.log('debug', message, ...args),
  }

  return {
    waitFor,
    intercept,
    logger,
  }
})()
