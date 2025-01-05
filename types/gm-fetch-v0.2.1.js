/* eslint-disable no-redeclare */
/* eslint-disable no-unused-vars */
/**
 * Fetch implementation for UserScripts using `GM.xmlHttpRequest`.
 *
 * **Important:**
 * - Ensure you add `@grant GM.xmlHttpRequest` and `@connect` directives in your metadata.
 * - Due to the limitations of `GM.xmlHttpRequest`, it does not fully mimic the Fetch API, especially with regards to CORS restrictions and `AbortSignal` support.
 * - Allows setting HTTP headers not supported by the standard Fetch API.
 *
 * ## Example
 * Add the following script to your UserScript manager and visit https://example.com/:
 *
 * ```javascript
 * // ==UserScript==
 * // @name        new user script
 * // @version     0.0.1
 * // @match       https://example.com/*
 * // @grant       GM.xmlHttpRequest
 * // @require     https://cdn.jsdelivr.net/npm/@trim21/gm-fetch
 * // @run-at      document-end
 * // @connect     httpbin.org
 * // ==/UserScript==
 *
 * (async () => {
 *   const res = await GM_fetch("https://httpbin.org/headers", { method: "GET" });
 *   const data = await res.json();
 *   console.log(data);
 * })();
 * ```
 */

/**
 * Fetch API implementation using `GM.xmlHttpRequest`.
 *
 * This function provides a Fetch-like interface for making HTTP requests in UserScripts.
 * The returned `Response` object is Fetch API-compatible, allowing methods such as `.json()`, `.text()`, and `.blob()`.
 *
 * **Features:**
 * - Supports custom HTTP headers (e.g., Authorization headers).
 * - Provides Fetch API-like response methods.
 * - Handles HTTP status codes in the same way as Fetch.
 *
 * **Limitations:**
 * - Due to the nature of `GM.xmlHttpRequest`, certain features such as `AbortSignal` are not fully supported.
 * - CORS restrictions are not enforced.
 *
 * @param {RequestInfo} input - Request URL (string) or a `Request` object.
 * @param {RequestInit} [init] - Initialization options for the request, including method, headers, body, etc.
 * @returns {Promise<Response>} - A promise resolving to a Fetch-compatible `Response` object.
 *
 * @example
 * // Example usage with JSON response parsing
 * let files = await GM_fetch(`https://api.github.com/gists/${gistId}`, {
 *   method: 'GET',
 *   headers: { Authorization: `token ${token}` },
 * });
 * if (files.status === 200) {
 *   files = await files.json();
 *   return files.files;
 * } else {
 *   console.log(files);
 *   return {};
 * }
 */
async function GM_fetch(input, init) {}

/**
 * Parses raw HTTP headers string into a `Headers` object.
 *
 * @param {string} h - Raw headers string.
 * @returns {Headers} - Parsed Headers object.
 */
function parseRawHeaders(h) {}

/**
 * Parses a `GM.xmlHttpRequest` response into a Fetch API-compatible Response object.
 *
 * @param {Request} req - The original request object.
 * @param {GMResponse} res - The response object from `GM.xmlHttpRequest`.
 * @returns {ResImpl} - A Fetch API-compatible Response object.
 */
function parseGMResponse(req, res) {}

/**
 * Validate and return the HTTP method.
 *
 * @param {string} method - The HTTP method to validate.
 * @returns {string} - A validated HTTP method.
 * @throws {Error} - Throws an error if the method is unsupported.
 */
function gmXHRMethod(method) {}

/**
 * Custom Response implementation compatible with the Fetch API.
 */
class ResImpl {
  /**
   * @param {Blob} body - Response body as a Blob.
   * @param {Object} init - Initialization options.
   * @param {Headers} init.headers - Headers of the response.
   * @param {number} init.statusCode - HTTP status code of the response.
   * @param {string} init.statusText - HTTP status text.
   * @param {string} init.finalUrl - Final URL after redirects.
   * @param {boolean} init.redirected - Indicates whether the response was redirected.
   */
  constructor(body, init) {}

  /**
   * Checks if the response body has been used.
   * @returns {boolean} - `true` if the body has been used, `false` otherwise.
   */
  get bodyUsed() {
    return this.bodyUsed // Ensure this returns the correct internal value
  }

  /**
   * Checks if the response status is OK (2xx).
   * @returns {boolean} - `true` if status is 2xx, `false` otherwise.
   */
  get ok() {
    return this.status >= 200 && this.status < 300 // Standard check for HTTP 2xx status codes
  }
  /**
   * Reads the response body as an ArrayBuffer.
   * @returns {Promise<ArrayBuffer>} - A promise that resolves to an ArrayBuffer.
   */
  arrayBuffer() {}

  /**
   * Reads the response body as a Blob.
   * @returns {Promise<Blob>} - A promise that resolves to a Blob.
   */
  blob() {}

  /**
   * Reads the response body as JSON.
   * @returns {Promise<any>} - A promise that resolves to the parsed JSON.
   */
  json() {}

  /**
   * Reads the response body as text.
   * @returns {Promise<string>} - A promise that resolves to the text content.
   */
  text() {}

  /**
   * Reads the response body as FormData.
   * @returns {Promise<FormData>} - A promise that resolves to a FormData object.
   */
  formData() {}

  /**
   * Clones the response object.
   * @returns {ResImpl} - A clone of the response object.
   */
  clone() {}
}

/**
 * @typedef {Object} GMResponse
 * @property {Blob} response - Response body as a Blob.
 * @property {number} status - HTTP status code.
 * @property {string} statusText - HTTP status text.
 * @property {string} responseHeaders - Raw response headers.
 * @property {string} finalUrl - Final URL after redirects.
 */
