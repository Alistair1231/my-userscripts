// Version: 1.0
// Framework for common userscript tasks
// @require https://cdn.jsdelivr.net/gh/Alistair/my-userscripts@{commit}/lib.js
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_deleteValue
// @grant GM_listValues
// @grant GM_xmlhttpRequest
const lib = (() => {
    /**
     * Storage Management
     * Provides methods to interact with userscript storage.
     * 
     * Examples:
     * lib.settings.key = 'value';
     * const value = lib.settings.key;
     */
    const settings = new Proxy({}, {
        get: (target, key) => {
            const value = GM_getValue(key, null);
            try {
                return JSON.parse(value);
            } catch {
                return value;
            }
        },
        set: (target, key, value) => {
            const toStore = typeof value === 'object' ? JSON.stringify(value) : value;
            GM_setValue(key, toStore);
            return true;
        },
        deleteProperty: (target, key) => {
            GM_deleteValue(key);
            return true;
        },
        ownKeys: () => GM_listValues(),
        has: (target, key) => GM_listValues().includes(key),
    });

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
                    method: options.method || 'GET',
                    headers,
                    data: options.body || null,
                    onload: (response) => resolve(response),
                    onerror: (error) => reject(error),
                });
            });
        }

        get(endpoint, options = {}) {
            return this.request(endpoint, { ...options, method: 'GET' });
        }

        post(endpoint, body, options = {}) {
            return this.request(endpoint, { ...options, method: 'POST', body });
        }

        put(endpoint, body, options = {}) {
            return this.request(endpoint, { ...options, method: 'PUT', body });
        }

        patch(endpoint, body, options = {}) {
            return this.request(endpoint, { ...options, method: 'PATCH', body });
        }

        delete(endpoint, options = {}) {
            return this.request(endpoint, { ...options, method: 'DELETE' });
        }
    }

    /**
     * DOM Utilities
     * Provides methods to create and manipulate DOM elements, including adding event listeners.
     * 
     * Functions:
     * - `lib.dom.createElement(tag, attributes = {}, children = [])`
     *    - Creates a DOM element with specified attributes and children.
     *    - Automatically attaches event listeners for attributes starting with `on`.
     * 
     *    Example:
     *    ```javascript
     *    const button = lib.dom.createElement('button', {
     *        id: 'btn',
     *        class: 'btn-class',
     *        onClick: () => alert('Button clicked')
     *    }, ['Click Me']);
     *    ```
     * 
     * - `lib.dom.appendTo(parent, child)`
     *    - Appends a child element to a parent.
     *    - The parent can be a selector string or a DOM node.
     * 
     *    Example:
     *    ```javascript
     *    lib.dom.appendTo('body', button);
     *    ```
     */
    const dom = {
        createElement: (tag, attributes = {}, children = []) => {
            const element = document.createElement(tag);
            Object.entries(attributes).forEach(([key, value]) => {
                if (key.startsWith('on')) {
                    element.addEventListener(key.slice(2), value);
                } else {
                    element.setAttribute(key, value);
                }
            });
            children.forEach((child) => {
                if (typeof child === 'string') {
                    element.appendChild(document.createTextNode(child));
                } else {
                    element.appendChild(child);
                }
            });
            return element;
        },
        appendTo: (parent, child) => {
            const parentNode = typeof parent === 'string' ? document.querySelector(parent) : parent;
            parentNode.appendChild(child);
        },
    };

    /**
     * Waits for a specific element to exist in the DOM before executing a callback.
     * 
     * Example:
     * lib.waitFor('#elementId', (element) => console.log('Element found:', element));
     */
    const waitFor = (selector, callback, interval = 100, timeout = 5000) => {
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
     * Intercepts events on specific elements matching a selector.
     * 
     * Example:
     * lib.intercept('click', '#buttonId', (event) => console.log('Button clicked:', event));
     */
    const intercept = (eventType, selector, handler) => {
        document.addEventListener(eventType, (event) => {
            if (event.target.matches(selector)) {
                handler(event);
            }
        });
    };

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
                console[level](message, ...args);
            }
        },
        error: (message, ...args) => logger.log('error', message, ...args),
        warn: (message, ...args) => logger.log('warn', message, ...args),
        info: (message, ...args) => logger.log('info', message, ...args),
        debug: (message, ...args) => logger.log('debug', message, ...args),
    };

    return {
        settings,
        Request,
        dom,
        waitFor,
        intercept,
        logger,
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
