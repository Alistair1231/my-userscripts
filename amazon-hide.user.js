// ==UserScript==
// @name          Amazon Hide
// @namespace     https://github.com/Alistair1231/my-userscripts/
// @version       0.1.0
// @description   Hide Amazon products with less than 4.5 stars.
// @downloadURL   https://github.com/Alistair1231/my-userscripts/raw/master/amazon-hide.user.js
// @updateURL     https://github.com/Alistair1231/my-userscripts/raw/master/amazon-hide.user.js
// @author        Alistair1231
// @match         https://www.amazon.de/s?*
// @match         https://www.amazon.com/s?*
// @match         https://www.amazon.co.uk/s?*
// @match         https://www.amazon.nl/s?*
// @icon          https://icons.duckduckgo.com/ip2/amazon.de.ico
// @license       GPL-3.0
// ==/UserScript==
// https://github.com/Alistair1231/my-userscripts/raw/master/amazon-hide.user.js
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

Object.defineProperty(Array.prototype, 'findByText', {
  enumerable: false,
  writable: true,
  value: findByText,
})
Object.defineProperty(NodeList.prototype, 'findByText', {
  enumerable: false,
  writable: true,
  value: findByText,
})
//? ^ --- Find by text --- ^

const items = document.querySelectorAll('div.template\\=SEARCH_RESULTS')
const validItems = [
  ...items.findByText(
    /<span aria-hidden="true" class="a-size-small a-color-base">4[,.][5-9]<\/span>/
  ),
]
console.log(validItems)
items.forEach((item) => {
  if (!validItems.includes(item)) {
    item.parentElement.parentElement.style.display = 'none'
  }
})
