// Version: 1.0
// Framework for common userscript tasks
// @require https://cdn.jsdelivr.net/gh/Alistair1231/my-userscripts@{commit_id}/lib.js


const libDefault = (() => {
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
        dom,
        waitFor,
        intercept,
        logger,
    };
})();
