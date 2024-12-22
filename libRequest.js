// @version v1.0.5
// @license GPL-3.0
// @author Alistair1231

//? Use like this:
// @grant GM_xmlhttpRequest
// @require https://cdn.jsdelivr.net/gh/Alistair1231/my-userscripts@v1.0.5/libRequest.js
//! then in your script: `const lib = { ...libRequest };`

const libRequest = (() => {
  /**
   * Request Management
   * Provides an object-oriented approach to making requests.
   *
   * Examples:
   * const api = new lib.Request('https://api.example.com', { 'Authorization': 'Bearer token' });
   * api.get('/endpoint').then(response => console.log(response));
   */
  class Request {
    constructor(baseURL = "", defaultHeaders = {}) {
      this.baseURL = baseURL;
      this.defaultHeaders = defaultHeaders;
    }

    async request(endpoint, options = {}) {
      const url = this.baseURL + endpoint;
      const headers = { ...this.defaultHeaders, ...options.headers };

      return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
          url,
          method: options.method || "GET",
          headers,
          data: options.body || null,
          onload: (response) => resolve(response),
          onerror: (error) => reject(error),
        });
      });
    }
    get(endpoint = "", options = {}) {
      return this.request(endpoint, { ...options, method: "GET" });
    }

    post(endpoint = "", body, options = {}) {
      return this.request(endpoint, { ...options, method: "POST", body });
    }

    put(endpoint = "", body, options = {}) {
      return this.request(endpoint, { ...options, method: "PUT", body });
    }

    patch(endpoint = "", body, options = {}) {
      return this.request(endpoint, { ...options, method: "PATCH", body });
    }

    delete(endpoint = "", options = {}) {
      return this.request(endpoint, { ...options, method: "DELETE" });
    }
  }

  return {
    Request,
  };
})();

/**
 * Initializing and Using the Framework
 * To use this framework, import the desired parts by destructuring it from `lib`.
 *
 * Examples:
 * const { settings, Request, dom, waitFor, intercept, logger } = lib;
 *
 * Example: Add a button to the page
 * const button = lib.dom.createElement('button', { id: 'myButton', class: 'btn' }, ['Click me']);
 * lib.dom.appendTo('body', button);
 *
 * Example: Log a message
 * lib.logger.info('Userscript framework initialized.');
 */
