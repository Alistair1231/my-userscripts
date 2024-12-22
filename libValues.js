// Version: 1.0
// Framework for common userscript tasks
// @require https://cdn.jsdelivr.net/gh/Alistair/my-userscripts@${commit_id}/lib.js
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_deleteValue
// @grant GM_listValues


const libValues = (() => {
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


    return {
        settings,
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
