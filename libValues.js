// @version v1.0.5Hotfix1
// @license GPL-3.0
// @author Alistair1231

//? Use like this:
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_deleteValue
// @grant GM_listValues
// @require https://cdn.jsdelivr.net/gh/Alistair1231/my-userscripts@v1.0.5Hotfix1/libValues.js
//! then in your script: `const lib = { ...libValues };`

const libValues = (() => {
  /**
   * Storage Management
   * Provides methods to interact with userscript storage.
   *
   * Examples:
   * lib.settings.key = 'value';
   * const value = lib.settings.key;
   */
  const settings = new Proxy(
    {},
    {
      get: (target, key) => {
        const value = GM_getValue(key, null);
        try {
          return JSON.parse(value);
        } catch {
          return value;
        }
      },
      set: (target, key, value) => {
        const toStore =
          typeof value === "object" ? JSON.stringify(value) : value;
        GM_setValue(key, toStore);
        return true;
      },
      deleteProperty: (target, key) => {
        GM_deleteValue(key);
        return true;
      },
      ownKeys: () => GM_listValues(),
      has: (target, key) => GM_listValues().includes(key),
      getOwnPropertyDescriptor: (target, key) => {
        if (GM_listValues().includes(key)) {
          return {
            configurable: true,
            enumerable: true,
            value: GM_getValue(key, null),
            writable: true,
          };
        }
        return undefined;
      },
    },
  );

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
