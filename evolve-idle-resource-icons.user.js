// ==UserScript==
// @name          Evolve Idle Resouce Icons
// @namespace     https://github.com/Alistair1231/my-userscripts/
// @version       0.1.3
// @description   Adds icons to costs and storage for easier identification
// @downloadURL   https://github.com/Alistair1231/my-userscripts/raw/master/EvolveIdleSavegameBackup.user.js
// @author        Alistair1231
// @match         https://pmotschmann.github.io/Evolve/*
// @icon          https://icons.duckduckgo.com/ip2/github.io.ico
// @license       GPL-3.0
// @grant         GM.addStyle
// ==/UserScript==
// https://github.com/Alistair1231/my-userscripts/raw/master/evolve-idle-resource-icons.user.js
// https://greasyfork.org/en/scripts/522627-evolve-idle-resouce-icons

;(function () {
  'use strict'

  const resources = {
    Knowledge: 'res-icon--knowledge',
    Furs: 'res-icon--furs',
    Food: 'res-icon--food',
    Lumber: 'res-icon--lumber',
    Copper: 'res-icon--copper',
    Aluminium: 'res-icon--aluminium',
    Iron: 'res-icon--iron',
    Steel: 'res-icon--steel',
    Alloy: 'res-icon--alloy',
    Polymer: 'res-icon--polymer',
    Cement: 'res-icon--cement',
    Brick: 'res-icon--brick',
    Wrought_Iron: 'res-icon--wrought-iron',
    Sheet_Metal: 'res-icon--sheet-metal',
    Stone: 'res-icon--stone',
    Coal: 'res-icon--coal',
    Oil: 'res-icon--oil',
    Uranium: 'res-icon--uranium',
    Titanium: 'res-icon--titanium',
    Iridium: 'res-icon--iridium',
    Neutronium: 'res-icon--neutronium',
    Helium_3: 'res-icon--helium-3',
    Genes: 'res-icon--genes',
    Mythril: 'res-icon--mythril',
  }
  GM.addStyle(`
    /* 
    this is where the icons are from:
    https://icon-sets.iconify.design/game-icons
    
    for recoloring, the metal bars use these icons:
        ingot: https://icon-sets.iconify.design/game-icons/?icon-filter=metal+bar
        special-ingot: https://icon-sets.iconify.design/game-icons/?icon-filter=black+bar
    */
    .res-icon--common {
        display: inline-block;
        width: 1.2em !important;
        height: 1.2em !important;
    }

    .res-icon--furs {
        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23000' d='M76.28 21.688c-26.378 9.306-43.39 25.92-51.374 49.53c33.78 22.83 81.775 69.988 100.875 114.813c7.62 17.88 13.92 38.086 17.97 59.126c5.308-2.97 33.706 40.776 25.5 33.156c-1.905-1.766-22.602-12.653-22.125-5.53c1.39 20.77 2.154 36.28-1.22 56.28c-8.794 52.14-56.968 122.188-56.968 122.188c22.368 21.103 35.882 27.827 74.876 35.78l77-100.405c28.983 22.87 5.424 64 28.218 62.47c21.462-1.442 2.15-41.235 18.44-61.845c16.95 22.598 36.356 41.26 55.717 57.125c2.09 2.124 1.477-61.477 5.75-47.594c4.162 13.52 13.724 52.06 18.47 65.25c12.987 13.292 22.495 24.418 38.437 27.595c36.918 7.356 33.552-2.188 69.28-22.094c0 0-62.02-74.034-76.468-118.874c-14.824-46.01-21.362-98.512-7.5-144.812c15.787-52.74 97.78-133.094 97.78-133.094c-4.763-5.607-8.447-9.992-11.686-13.688c-3.5-3.993-35.27 15.448-38.594 12.438c-3.296-2.988 21.852-28.457 17.094-31.75c-5.434-3.76-12.353-8.134-21.97-14.063c-32.09 39.05-59.294 63.115-112.624 96.376c-4.038-23.52-1.745-37.2-19.344-53.938c-17.6-16.74-55.628-29.337-89.187-.594c-14.822 12.696-11.758 33.168-19.47 51.532c-24.79-42.81-90.31-87.444-116.874-95.374zM273.157 141.03c3.632 9.382 1.912 19.278-1.5 28.626s-8.772 18.586-14.625 27.375c-3.624 5.446-7.432 10.64-11.155 15.595c10.79-3.762 22.226-7.236 33.5-2.594l10.688 4.407l-6.875 9.282c-3.87 5.213-7.125 9.803-9.97 14c3.6-1.794 7.416-3.395 11.532-4.564c3.455-.98 9.48 1.043 11.625 4s2.316 5.218 2.53 7.28c.432 4.128.016 8.136-.53 12.69c-1.093 9.104-3.05 19.868-3.5 26.062l-17.97-1.313c.597-8.223 2.62-18.754 3.595-26.875c.026-.218.007-.254.03-.47c-8.836 4.995-18.517 12.7-30.56 17.75L224.437 283l14.343-23.688c5.164-8.52 10.192-17.848 19.22-31.218c-3.025.674-6.163 1.506-9.344 2.625c-5.286 1.858-10.545 4.006-15.094 5.843s-7.876 3.33-11.78 4.156l-21.032 4.468l11.594-18.125c5.86-9.155 18.906-23.762 29.72-40c5.405-8.12 10.077-16.445 12.686-23.594s2.883-12.69 1.625-15.94l16.78-6.5z'/%3E%3C/svg%3E");
        background-color: currentColor;
        -webkit-mask-image: var(--svg);
        mask-image: var(--svg);
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: 100% 100%;
        mask-size: 100% 100%;
    }
    .res-icon--copper {
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%235e3300' d='M322.248 85.684L61.432 224.717l-41.145 109.94l7.233 3.85l153.673 81.8l308.495-164.215l-37.752-99.903zm119.035 95.187l25.11 66.45l-102.56 54.594L430.39 186.64l10.893-5.77zm-89.576 47.417L284.957 343.9l-41.67 22.182l72.195-118.62l36.225-19.175zM72.38 248.78l28.21 14.933l-54.012 54.012zm210.827 15.767L211.19 382.87l.26.16l-17.208 9.16l5.795-83.618zm-165.334 8.312l16.963 8.98l-60.445 60.445l-16.93-9.012zM181.42 306.9l-6.174 89.07l-54.1-28.798z'/%3E%3C/svg%3E");
    } 
    .res-icon--knowledge {
        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23000' d='M104 37.25V215.1c3.6 9.9 10 14.1 20.9 17c11.4 2.9 27.1 3.1 43.9 3.1s34.6-.1 51.4 3.6c9.5 2.1 18.7 5.7 26.8 11.2V55.43c-7.2-9.9-15.9-13.69-27.3-15.09c-12.2-1.49-27.3.55-42.9 2.83c-15.7 2.28-31.9 4.81-47.7 2.88c-8.7-1.07-17.3-3.87-25.1-8.8m304 0c-7.8 4.93-16.4 7.73-25.1 8.8c-15.8 1.93-32-.6-47.7-2.88c-15.6-2.28-30.7-4.32-42.9-2.83c-11.4 1.4-20.1 5.19-27.3 15.09V250c8.1-5.5 17.3-9.1 26.8-11.2c16.8-3.7 34.6-3.6 51.4-3.6s32.5-.2 43.9-3.1c10.9-2.9 17.3-7.1 20.9-17zM130.8 80.03h89.4v18h-89.4zm161 0h89.4v18h-89.4zm-161 44.47h89.4v18h-89.4zm161 0h89.4v18h-89.4zm-161 46.8h89.4v18h-89.4zm161 0h89.4v18h-89.4zM96 249c-17.3 0-29.19 7.3-37.77 18.9C49.66 279.4 45 295.7 45 312s4.66 32.6 13.23 44.1C66.81 367.7 78.7 375 96 375c22 0 35.7-7.1 44.4-14c8.6-6.9 11.5-13 11.5-13l2.5-5h203.2l2.5 5s2.9 6.1 11.5 13c8.7 6.9 22.4 14 44.4 14c17.3 0 29.2-7.3 37.8-18.9c8.5-11.5 13.2-27.8 13.2-44.1s-4.7-32.6-13.2-44.1c-8.6-11.6-20.5-18.9-37.8-18.9c-22 0-35.7 7.1-44.4 14c-8.6 6.9-11.5 13-11.5 13l-2.5 5H154.4l-2.5-5s-2.9-6.1-11.5-13c-8.7-6.9-22.4-14-44.4-14m4.6 21.9c.9 0 1.9 0 2.9.1c13.5 1.2 28.2 8.9 44.1 24h216.8c15.9-15.1 30.6-22.8 44.1-24c14.2-1.2 26.6 5.8 33.1 16.2c13.1 20.9 7 53.9-20.6 72.3l-10-15c20.4-13.6 22.3-36.6 15.4-47.7c-3.5-5.6-8.1-8.6-16.4-7.8c-8.2.7-20.6 6.3-35.6 21.4l-2.7 2.6H140.3l-2.7-2.6c-15-15.1-27.4-20.7-35.6-21.4c-8.26-.8-12.9 2.2-16.37 7.8c-6.92 11.1-4.99 34.1 15.37 47.7l-9.99 15c-27.65-18.4-33.72-51.4-20.64-72.3c5.72-9.1 15.9-15.6 27.92-16.3zM169 361v126h30V361zm48 0v126h30V361zm48 0v126h30V361zm48 0v126h30V361z'/%3E%3C/svg%3E");
        background-color: currentColor;
        -webkit-mask-image: var(--svg);
        mask-image: var(--svg);
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: 100% 100%;
        mask-size: 100% 100%;
    }   
    .res-icon--food {
        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23000' d='M440.156 98.063c-4.05-.11-8.044 1.117-11.656 4c-1.542 1.23-3.1 2.884-4.47 4.75c-22.9 31.22-48.278 57.33-75.186 81c-8.76 14.692 10.695 44.406 25.594 44.406c34.144-12.928 69.617-22.516 106.75-26.314c42.628-4.358 17.688-68.134-26.25-45.47c30.3-22.666 7.094-61.79-14.782-62.374zM310.47 108.156c-6.167-.108-12.215 1.172-17.595 4.28a31 31 0 0 0-4.406 3.095c-.038-.056-.09-.13-.126-.186c-79.912 66.402-116.334 73.468-158.22 86.844c-6.886 2.2-12.27 7.18-16.5 15.5s-6.892 19.843-7.343 33.125c-.9 26.563 6.935 59.927 23.72 89.03c16.72 28.99 43.37 53.946 67.656 67.126c12.143 6.59 23.682 10.167 32.375 10.436s13.915-1.95 17.782-7.375c30.986-43.45 89.343-69.052 156.157-92.25c-.005-.006.003-.023 0-.03a31 31 0 0 0 5.842-2.594c8.2-4.738 13.535-12.897 16.282-22.125s3.22-19.75 2.03-31.25c-.953-9.233-3.033-19.127-6.155-29.374c-5.916 1.366-11.628 3.157-17.908 5.47c2.835 9.25 4.69 17.978 5.5 25.81c1.007 9.74.403 18.06-1.375 24.033c-1.777 5.972-4.412 9.338-7.718 11.25c-3.308 1.91-7.543 2.505-13.595 1.06c-6.052-1.443-13.55-5.07-21.47-10.81c-15.838-11.482-33.334-31.223-47.624-56c-14.29-24.78-22.61-49.838-24.624-69.314c-1.006-9.738-.403-18.027 1.375-24c1.78-5.973 4.414-9.37 7.72-11.28c1.653-.957 3.52-1.58 5.75-1.782c.557-.05 1.147-.067 1.75-.063c1.81.014 3.824.272 6.094.814c6.05 1.444 13.518 5.04 21.437 10.78c8.218 5.957 16.884 14.166 25.314 24.126c5.07-4.055 9.34-8.25 13.406-13.188c-8.97-10.46-18.366-19.26-27.75-26.062c-9.354-6.78-18.733-11.61-28.094-13.844a46 46 0 0 0-7.03-1.125a44 44 0 0 0-2.657-.124zm7.967 34.188c-.438.024-.86.063-1.28.125c-17.327 2.54-14.97 36.035 5.03 74.56c20 38.528 50.52 67.576 67.844 65.032c5.995-.88 9.263-5.687 10.658-12.875c-1.67 2.187-3.847 3.484-6.72 3.907c-15.316 2.248-42.316-23.093-60-57.156c-17.682-34.064-19.254-63.91-3.937-66.157c3.638-.53 7.69.417 12.345 2.782c-8.68-6.8-17.353-10.583-23.938-10.218zM102 325.124c-16.555 1.844-35.304 3.26-57.063 4.376c-49.128 2.523-25.555 71.576 30.094 52.22c-49.365 29.9 3.86 86.927 26.97 46.75c10.362-18.016 21.88-33.79 34.375-47.814c-8.42-9.644-16.078-20.224-22.563-31.47a201 201 0 0 1-11.812-24.06z'/%3E%3C/svg%3E");
        background-color: currentColor;
        -webkit-mask-image: var(--svg);
        mask-image: var(--svg);
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: 100% 100%;
        mask-size: 100% 100%;
    }
    .res-icon--lumber {
        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23000' d='M353.86 48.45c-10.626-.16-20.45 3.456-29.14 13.253l-.193.217l-50.586 50.098l.628.703a9.002 9.002 0 1 1-13.435 11.979l-5.985-6.712a36 36 0 0 1-2.544 3.178c-5.116 5.68-11.746 9.448-18.688 11.023l5.438 20.302c2.54 8.98-8.582 15.417-15.102 8.738l-41.2 40.803a73 73 0 0 1 4.26-.135c40.63 0 73.616 33.616 73.616 74.672c0 .803-.036 1.598-.06 2.395l141.94-153.74c8.252-10.316 9.687-20.888 6.985-31.832C407.08 82.4 399.6 71.29 389.653 62.967a68 68 0 0 0-9.835-6.854L258.56 182.725c-3.418 3.685-9.193 3.856-12.824.38c-3.63-3.478-3.71-9.255-.175-12.83l115.932-121.05a46 46 0 0 0-5.494-.694a48 48 0 0 0-2.137-.08zM232.31 85.597c-4.224-.048-8.876 1.842-12.583 5.96c-6.327 7.024-5.918 16.11-.913 20.62c5.006 4.508 14.088 3.968 20.415-3.057c6.325-7.024 5.917-16.112.91-20.62c-1.877-1.69-4.328-2.672-6.992-2.867q-.416-.03-.837-.035zm-27.95 63.94c-7.19-.12-13.63 2.222-19.577 8.925l-.19.217l-99.734 98.77c10.89.53 20.967 4.222 29.386 10.167a74.9 74.9 0 0 1 11.785-32.332l.44-.67l6.39-8.21a75 75 0 0 1 6.11-6.05l70.907-70.224a31 31 0 0 0-4.07-.534q-.728-.046-1.448-.057zm193.3 14.415a46 46 0 0 0-6.588.52L245.744 321.88a75 75 0 0 1-9.976 10.806l-5.715 6.19a80.1 80.1 0 0 1 27.34 11.628c-.004-.254-.02-.505-.02-.76c0-12.38 4.545-23.756 12.03-32.496l-.087-.086l1.358-1.344a50 50 0 0 1 3.16-3.13L381.01 206.545c8.52-9.363 20.055-13.314 30.816-12.662c10.908.66 21.093 5.423 29.33 12.316c8.238 6.892 14.684 16.035 17.278 26.538a37.8 37.8 0 0 1 1.078 9.922c4.62-9.422 4.9-19.095 2.242-28.918c-3.484-12.87-12.614-25.674-24.47-34.967v.002c-11.194-8.77-24.658-14.314-37.27-14.79q-1.184-.042-2.354-.034m11.926 47.852c-5.712-.106-10.696 1.69-15.463 7.064l-.193.216l-82.07 81.28c22.277 2.517 40.072 20.28 43.12 42.585l82.31-89.153c4.454-5.58 5.124-10.833 3.665-16.742c-1.468-5.945-5.675-12.3-11.35-17.05c-5.678-4.75-12.668-7.778-18.867-8.153q-.58-.036-1.152-.047m-222.274 8.097c-4.898 0-9.644.647-14.167 1.85a45 45 0 0 1 5.994-.41c24.715 0 45.067 19.99 45.067 44.566s-20.355 44.567-45.068 44.567c-24.718 0-45.07-19.992-45.07-44.567c0-2.83.282-5.593.797-8.277a57.9 57.9 0 0 0-3.166 18.94c0 31.482 24.873 56.668 55.613 56.668s55.61-25.185 55.61-56.668c0-31.482-24.87-56.668-55.61-56.668zm-8.173 19.44c-15.12 0-27.07 11.857-27.07 26.566c0 14.71 11.945 26.567 27.07 26.567c15.117 0 27.067-11.858 27.067-26.567c0-14.71-11.944-26.566-27.068-26.566zm-3.388 7.357c8.742 0 16.023 7.276 16.023 16.02s-7.285 16.02-16.023 16.02c-8.742 0-16.025-7.275-16.025-16.02c0-8.743 7.287-16.02 16.025-16.02m-93.61 28.68c-21.25 0-38.427 17.364-38.427 39.2c0 21.835 17.177 39.2 38.426 39.2s38.426-17.364 38.426-39.2c0-3.01-.338-5.933-.957-8.74a74 74 0 0 1-3.08-8.838c-6.297-12.877-19.314-21.623-34.39-21.623zm-.36 11.016c15.59 0 27.085 14.1 27.085 29.823s-11.498 29.82-27.086 29.82c-15.59 0-27.087-14.098-27.087-29.82c0-15.727 11.5-29.824 27.088-29.824zm372.58.325c-6.907-.118-13.068 2.118-18.79 8.567l-.193.22l-96.345 95.415c27.285 1.628 49.25 23.576 51.547 50.926l96.64-104.672c5.384-6.735 6.24-13.283 4.48-20.42a29 29 0 0 0-.868-2.844l-63.383 66.342c-3.41 3.703-9.196 3.888-12.837.41c-3.64-3.48-3.72-9.267-.175-12.844l65.103-68.144a9 9 0 0 1 1.122-1.018a46 46 0 0 0-2.447-2.203c-6.715-5.62-14.988-9.227-22.463-9.68q-.7-.042-1.39-.054zm-372.9 14.73c-7.59 0-13.74 7.046-13.74 15.738c0 8.69 6.15 15.736 13.74 15.736s13.743-7.045 13.743-15.736c0-8.69-6.152-15.737-13.742-15.737zm224.952 16.6c-17.17 0-31.04 14.004-31.04 31.694s13.87 31.695 31.04 31.695s31.04-14.006 31.04-31.696s-13.87-31.693-31.04-31.693m-2.285 11.155c11.398 0 19.28 10.28 19.28 21.092c0 10.814-7.884 21.09-19.28 21.09c-11.4 0-19.282-10.277-19.282-21.09s7.883-21.092 19.28-21.092zm-163.378 5.13l-14.027 15.192a57.7 57.7 0 0 1-7.235 7.838l-3.986 4.317c9.624 5.793 17.842 13.746 24.006 23.185c6.715-14.72 17.602-27.106 31.113-35.588c-11.134-2.634-21.307-7.826-29.87-14.946zm72.31 20.704c-34.83 0-63.015 28.553-63.015 64.192c0 35.64 28.186 64.194 63.016 64.194s63.017-28.554 63.017-64.194c0-35.638-28.188-64.193-63.017-64.193zM68.68 370.114C42.442 374.65 22.5 397.775 22.5 425.96c0 14.03 4.95 26.802 13.146 36.66a48.17 48.17 0 0 1-8.064-26.725v-.004c-.005-26.31 21.188-47.994 47.29-47.994c26.105 0 47.298 21.684 47.292 47.996c.005 20.913-13.386 38.89-31.986 45.393c22.622-5.065 40.05-24.075 43.076-47.908a83.3 83.3 0 0 1-1.207-14.145q.001-3.106.226-6.16c-4.7-20.763-20.513-37.028-40.71-42.11c-3.065.528-6.21.817-9.422.817c-4.64 0-9.146-.586-13.462-1.665zm140.48.643c27.187 0 49.2 22.702 49.2 50.203c0 27.503-22.016 50.204-49.2 50.204c-27.187 0-49.2-22.702-49.2-50.203c0-27.5 22.017-50.202 49.2-50.202zm0 17.998c-17.21 0-31.2 14.195-31.2 32.205c0 18.012 13.983 32.206 31.2 32.206c17.212 0 31.2-14.195 31.2-32.205s-13.982-32.204-31.2-32.204zm81.856 8.148a82.6 82.6 0 0 1 2.642 13.912a55.9 55.9 0 0 1 12.852-11.38l-.094.003c-5.38 0-10.554-.9-15.4-2.536zm-216.14 8.992c-16.2 0-29.295 13.238-29.29 29.995v.005c-.005 16.756 13.09 29.994 29.29 29.994c16.197 0 29.295-13.24 29.29-29.995v-.004c.005-16.756-13.093-29.994-29.29-29.994zm133.706.256c8.967 0 14.96 7.945 14.96 15.953c0 8.01-5.993 15.952-14.96 15.952c-8.966 0-14.96-7.943-14.96-15.952c0-8.008 5.994-15.953 14.96-15.953m127.203 2.664c-20.47 0-37.013 16.723-37.013 37.766s16.544 37.766 37.013 37.766c20.47 0 37.012-16.723 37.012-37.766s-16.543-37.766-37.012-37.766M71.833 422.39c8.965 0 14.958 7.943 14.958 15.952s-5.992 15.953-14.958 15.953s-14.96-7.944-14.96-15.953s5.994-15.953 14.96-15.953zm267.923 1.423c14.727 0 26.683 12.307 26.683 27.037s-11.958 27.037-26.684 27.037c-14.728 0-26.682-12.308-26.682-27.037c0-14.73 11.955-27.038 26.682-27.038zm0 18c-4.802 0-8.682 3.845-8.682 9.037s3.877 9.037 8.682 9.037c4.8 0 8.683-3.846 8.683-9.037c0-5.193-3.88-9.038-8.684-9.038z'/%3E%3C/svg%3E");
        background-color: currentColor;
        -webkit-mask-image: var(--svg);
        mask-image: var(--svg);
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: 100% 100%;
        mask-size: 100% 100%;
    }
    .res-icon--aluminium {
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23c8d8fb' d='M322.248 85.684L61.432 224.717l-41.145 109.94l7.233 3.85l153.673 81.8l308.495-164.215l-37.752-99.903zm119.035 95.187l25.11 66.45l-102.56 54.594L430.39 186.64l10.893-5.77zm-89.576 47.417L284.957 343.9l-41.67 22.182l72.195-118.62l36.225-19.175zM72.38 248.78l28.21 14.933l-54.012 54.012zm210.827 15.767L211.19 382.87l.26.16l-17.208 9.16l5.795-83.618zm-165.334 8.312l16.963 8.98l-60.445 60.445l-16.93-9.012zM181.42 306.9l-6.174 89.07l-54.1-28.798z'/%3E%3C/svg%3E");
    }
    .res-icon--iron {
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23e2cdb7' d='M322.248 85.684L61.432 224.717l-41.145 109.94l7.233 3.85l153.673 81.8l308.495-164.215l-37.752-99.903zm119.035 95.187l25.11 66.45l-102.56 54.594L430.39 186.64l10.893-5.77zm-89.576 47.417L284.957 343.9l-41.67 22.182l72.195-118.62l36.225-19.175zM72.38 248.78l28.21 14.933l-54.012 54.012zm210.827 15.767L211.19 382.87l.26.16l-17.208 9.16l5.795-83.618zm-165.334 8.312l16.963 8.98l-60.445 60.445l-16.93-9.012zM181.42 306.9l-6.174 89.07l-54.1-28.798z'/%3E%3C/svg%3E");
    }
    .res-icon--steel {
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%236a719a' d='M322.248 85.684L61.432 224.717l-41.145 109.94l7.233 3.85l153.673 81.8l308.495-164.215l-37.752-99.903zm119.035 95.187l25.11 66.45l-102.56 54.594L430.39 186.64l10.893-5.77zm-89.576 47.417L284.957 343.9l-41.67 22.182l72.195-118.62l36.225-19.175zM72.38 248.78l28.21 14.933l-54.012 54.012zm210.827 15.767L211.19 382.87l.26.16l-17.208 9.16l5.795-83.618zm-165.334 8.312l16.963 8.98l-60.445 60.445l-16.93-9.012zM181.42 306.9l-6.174 89.07l-54.1-28.798z'/%3E%3C/svg%3E");
    }
    .res-icon--alloy {
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23a45da9' d='M322.248 85.684L61.432 224.717l-41.145 109.94l7.233 3.85l153.673 81.8l308.495-164.215l-37.752-99.903zm119.035 95.187l25.11 66.45l-102.56 54.594L430.39 186.64l10.893-5.77zm-89.576 47.417L284.957 343.9l-41.67 22.182l72.195-118.62l36.225-19.175zM72.38 248.78l28.21 14.933l-54.012 54.012zm210.827 15.767L211.19 382.87l.26.16l-17.208 9.16l5.795-83.618zm-165.334 8.312l16.963 8.98l-60.445 60.445l-16.93-9.012zM181.42 306.9l-6.174 89.07l-54.1-28.798z'/%3E%3C/svg%3E");
    }
    .res-icon--polymer {
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%237a5da9' d='M322.248 85.684L61.432 224.717l-41.145 109.94l7.233 3.85l153.673 81.8l308.495-164.215l-37.752-99.903zm119.035 95.187l25.11 66.45l-102.56 54.594L430.39 186.64l10.893-5.77zm-89.576 47.417L284.957 343.9l-41.67 22.182l72.195-118.62l36.225-19.175zM72.38 248.78l28.21 14.933l-54.012 54.012zm210.827 15.767L211.19 382.87l.26.16l-17.208 9.16l5.795-83.618zm-165.334 8.312l16.963 8.98l-60.445 60.445l-16.93-9.012zM181.42 306.9l-6.174 89.07l-54.1-28.798z'/%3E%3C/svg%3E");
    }
    .res-icon--cement {
        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23000' d='M172.416 41.021c-39.47.351-78.748 5.972-114.732 14.827c10.094 15.264 27.17 26.95 46.898 34.865c23.65 9.488 50.72 13.333 70.959 12.299c20.826-1.065 47.765-9.524 68.764-21.008c10.5-5.742 19.542-12.245 25.652-18.5c3.24-3.317 5.517-6.486 6.99-9.316c-30.874-8.778-63.696-12.865-96.635-13.167a438 438 0 0 0-7.896 0m111.541 33.877c-.372.396-.743.793-1.125 1.184c-7.888 8.075-18.231 15.34-29.889 21.715c-23.314 12.75-51.772 21.928-76.484 23.191c-23.227 1.188-52.158-2.967-78.58-13.568c-18.094-7.26-35.189-17.651-47.762-31.873C33.802 206.86 19.325 353.169 39.992 473.012c19.598 6.163 40.992 10.825 63.008 13.95V423h64v-64h109.957c-.024-3.013.152-6.295.486-9.97c.96-10.546 3.217-24.018 6.338-39.007c5.408-25.967 13.412-56.318 21.948-82.152c-4.95-49.133-12.133-100.876-21.772-152.973m152.682.59c-.909.002-1.93.107-2.87.137l-56.949 71.28c7.692 2.471 14.598 7.387 19.639 14.052l55.268-66.045c.901-2.06.935-7.813-2.174-12.293c-2.433-3.505-5.967-6.446-12.051-7.092q-.407-.041-.863-.039m-69.506 87.742a32 32 0 0 0-4.278 6.745c-3.85 8.26-4.52 17.07-3.816 24.61l.022.224l3.507 24.408a201 201 0 0 0-5.46.586c-11.149 1.362-23.392 3.885-31.805 6.601c-9.124 26.31-18.124 59.552-23.9 87.29c-3.034 14.562-5.182 27.607-6.034 36.966c-.268 2.945-.188 4.657-.203 6.729c2.338-1.204 5.048-2.731 8.326-4.871c9.674-6.317 22.502-16.22 36.13-27.565c25.535-21.259 53.706-47.399 71.997-65.816c-2.982-7.624-8.213-16.243-13.951-23.516c-6.682-8.469-14.49-15.144-16.53-16.408c-.057.008-.262-.026-.392-.04l-3.783-26.323c-.448-4.91.237-11.044 2.207-15.27c.975-2.092 2.012-3.727 3.46-4.951c-3.847-5.382-9.725-8.894-15.497-9.399M377 313v46h110v-46zm-192 64v46h110v-46zm128 0v46h110v-46zm128 0v46h46v-46zm-320 64v46h110v-46zm128 0v46h110v-46zm128 0v46h110v-46z'/%3E%3C/svg%3E");
        background-color: currentColor;
        -webkit-mask-image: var(--svg);
        mask-image: var(--svg);
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: 100% 100%;
        mask-size: 100% 100%;
    }
    .res-icon--brick {
        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23000' d='m233.986 85.262l-63.37 21.11L334.32 160.9l63.373-21.11l-163.707-54.53zm-82.85 33.593v58.088l174.184 58.02v-58.086l-174.183-58.022zm-18 50.215l-53.71 17.89l162.63 54.175l22.417-7.467l-125.18-41.7a9 9 0 0 1-6.156-8.536zm-73.19 30.375v58.088l122.286 40.733v-30.71a9 9 0 0 1 .018-.357l.01-.192a9 9 0 0 1 .07-.697l.03-.205a9 9 0 0 1 .134-.66l.06-.236a9 9 0 0 1 .19-.616l.092-.248a9 9 0 0 1 .238-.567a9 9 0 0 1 .135-.282a9 9 0 0 1 .265-.488a9 9 0 0 1 .197-.32a9 9 0 0 1 .28-.41a9 9 0 0 1 .26-.342a9 9 0 0 1 .288-.344a9 9 0 0 1 .318-.342a9 9 0 0 1 .3-.29a9 9 0 0 1 .374-.33a9 9 0 0 1 .3-.237a9 9 0 0 1 .438-.315a9 9 0 0 1 .286-.182a9 9 0 0 1 .502-.29a9 9 0 0 1 .26-.133a9 9 0 0 1 .59-.262l.21-.082a9 9 0 0 1 .317-.122l25.18-8.387zm364.847 27.352l-87.63 29.19l-.247.07a9 9 0 0 1-.355.1a9 9 0 0 1-.443.1a9 9 0 0 1-.47.085a9 9 0 0 1-.4.05a9 9 0 0 1-.49.038a9 9 0 0 1-.423.007a9 9 0 0 1-.48-.01a9 9 0 0 1-.397-.03a9 9 0 0 1-.504-.06a9 9 0 0 1-.38-.07a9 9 0 0 1-.52-.117a9 9 0 0 1-.31-.087a9 9 0 0 1-.268-.077l-38.526-12.834l-73.23 24.395l63.368 21.11l163.707-54.532zm-224.56 53.242v58.085l73.85 24.602v-36.225l.005.002V304.63l-2.752-.915l-.014.004l-71.09-23.68zm-85.174 14.82L58.57 313.68l63.373 21.11l56.485-18.817l-63.37-21.11zM39.095 326.17v58.088l73.85 24.6V350.77zm390.207 9.816l-63.375 21.112l36.283 12.086l63.374-21.112l-36.28-12.086zM219.03 363.36v21.86l174.183 58.022v-58.088L337.45 366.58l-51.516 17.162l-.19.053a9 9 0 0 1-.467.133a9 9 0 0 1-.332.074a9 9 0 0 1-.588.107l-.253.03a9 9 0 0 1-.674.053l-.196.004a9 9 0 0 1-.693-.013l-.206-.016a9 9 0 0 1-.723-.09l-.122-.02a9 9 0 0 1-.795-.18l-.025-.007a9 9 0 0 1-.432-.122l-61.207-20.39z'/%3E%3C/svg%3E");
        background-color: currentColor;
        -webkit-mask-image: var(--svg);
        mask-image: var(--svg);
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: 100% 100%;
        mask-size: 100% 100%;
    }
    .res-icon--wrought-iron {
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%235c5955' d='m329.3 99.64l-39.7 10.46c-30.2 26.1-62.7 50.9-96.7 75.1l-6.7 21l-34.1 7.3c-22.6 15.3-45.6 30.4-68.82 45.5l120.32 18.4l213.9-167.1c-27.7-3.8-56.9-7.5-88.2-10.66m103.4 21.56l-61.4 47.9l-43 53.1l-45 15.7l-65 50.7l20.8 115.1c65.6-54.6 127.6-109.4 187-163.1l-5.6-31.2l42.1-1.9c8.3-7.4 16.5-14.9 24.6-22.3zM61.58 277.6c-21.15 39.9-32.01 70.6-36.83 95.8c9.21 1.1 18.3 2.2 27.28 3.5l16.76-30.6l5.52 34c53.29 8.6 103.09 20.5 152.19 32.1l-26.9-117.6l-66-10.1z'/%3E%3C/svg%3E");
    }
    .res-icon--sheet-metal {
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23394654' d='M256.5 87.9L39.7 213.5l216.9 125.7l216.6-125.7zM31 227.4v71l218 125.7v-71zm450 .2L265 353.1V424l216-125.5z'/%3E%3C/svg%3E");
    }
    .res-icon--stone {
        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23000' d='m209.875 44.156l-182 106.47l119.625 54.31l148.344 11.72l41.97-24.312l17.342 11.562L309 230.656V379.53l53.563-14.624l-64.625 51.97l-110.875-59.626l-2.157-1.53l-71.28 6.56l75.936-31.967l100.75 52.125v-147.5l-145.906-11.5l-1.625-.125l-1.5-.688l-121.093-55V391.47L44 423.186l82 20.97l21.875-21.282l11.156 29.72l131.282 33.592V434l4.25 2.28l5.47 2.94l4.812-3.908L309 431.97v52.155L491.375 377.78v-96.405L466.78 269.47l24.595-38.75V125l-90.25 52.28l-1.094 34.095l-88-58.688l84.97 5.375L476.5 112L291.562 64.937l1.625.563l-64.406 5.78l5.345-20.936l-24.25-6.188z'/%3E%3C/svg%3E");
        background-color: currentColor;
        -webkit-mask-image: var(--svg);
        mask-image: var(--svg);
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: 100% 100%;
        mask-size: 100% 100%;
    }
    .res-icon--coal {
        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23000' d='m317.727 108.904l-95.192 96.592l-26.93 86.815l17.54 36.723l20.417 9.287l33.182-55.082l11.297-3.61l61.75 26.85l20.26-12.998l4.47-43.7l11.42 53.634l-10.622 14.162l3.772 1.64l5.238 6.5l6.832 34.343l55.977-66.775l13.98.23l22.397 28.575l-9.453-52.244L434.01 166.81l-116.28-57.906zM123.61 120.896L94.08 173l-4.603 27.62l25.98-8.442l11.704 7.377l.084.634l28.295 59.865l13.773-4.543l10.94 4.668l3.922 8.21l19.517-62.917l-1.074-33.336l-40.15-.522l-29.732-23.78l34.06 10.888l42.49-7.727l26.034 15.88l36.282-36.815a333 333 0 0 0-8.58-3.52l-79.58 10.126l-3.528-.25l-56.307-15.52zm249.33 36.422l47.058 66.02l2.107 62.51l-25.283-59.698l-65.322-60.404zm-262.2 55.32l-64.234 20.876l-16.71 78.552l50.794 5.582l.596-7.14l37.662-36.707l-8.108-61.16zm56.688 62.45l-36.44 12.016l-31.644 30.84l22.588 30.867l57.326 1.74l16.5-16.16zm110.666 24.19l-44.307 73.546l-.033 57.14l97.264 12.216l44.242-19.528l-17.666-88.806zM443.8 313.36l-46.843 55.876l.287 1.774l65.147 13.887l25.78-14.926l-44.37-56.613zm-138.382 15.89l39.23 22.842l13.41 50.658l-26.82 23.838l-45.015-2.553l38.562-28.242l2.483-39.23zm-238.37 53.838l-8.77 28.51l13.152 48.498l91.037-11.91l1.32-26.418l-62.582-31.995l-34.156-6.684z'/%3E%3C/svg%3E");
        background-color: currentColor;
        -webkit-mask-image: var(--svg);
        mask-image: var(--svg);
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: 100% 100%;
        mask-size: 100% 100%;
    }
    .res-icon--oil {
        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23000' d='M411 68.31v.7c0 25.9-53.6 46.99-155 46.99c-106.5 0-155-21.09-155-46.99v-1.2c0-15 16.7-26.9 49.7-35.3c28.2-7.2 65.6-11.1 105.3-11.1c39.6 0 77 3.9 105.3 11.1c33 8.4 49.7 20.3 49.7 35.3zm-177-.5c0-4.2-13.2-7.5-29.4-7.5c-16.3 0-29.5 3.3-29.5 7.5c0 4.1 13.2 7.5 29.5 7.5c16.2 0 29.4-3.4 29.4-7.5m167.6 97.89v-60.2c-8.7 6.6-21.9 12.2-39.6 16.7c-28.5 7.3-66.1 11.2-106 11.2s-77.5-4-106-11.2c-17.7-4.5-30.9-10-39.6-16.7v60.2c-6.3 5.3-9.4 11.2-9.4 17.7v1.1c0 25.9 48.5 46.9 155 46.9c101.4 0 155-21 155-46.9v-1.1c0-6.5-3.1-12.4-9.4-17.7m0 128.9v-73.5c-8.7 6.6-21.9 12.2-39.6 16.7c-28.5 7.2-66.1 11.2-106 11.2s-77.5-4-106-11.2c-17.7-4.5-30.9-10.1-39.6-16.7v73.5c-6.3 5.3-9.4 11.2-9.4 17.7v.9c0 25.9 48.5 46.9 155 46.9c101.4 0 155-21 155-46.9v-.9c0-6.6-3.1-12.5-9.4-17.7m8.9 145.4c-1.1-4.9-4-9.4-8.9-13.5V350c-8.7 6.6-21.9 12.2-39.6 16.7c-28.5 7.2-66.1 11.2-106 11.2s-77.5-4-106-11.2c-17.7-4.5-30.9-10.1-39.6-16.7v76.5c-4.9 4.1-7.8 8.6-8.9 13.5c-.3 1.2-.5 2.5-.5 3.7v.5c0 5.7 2.3 10.9 7 15.6c17 18 64.8 30.8 148 30.8c60.2 0 103.6-7.4 128.9-18.9c17.3-7.5 26.1-16.6 26.1-27.5v-.5c0-1.2-.2-2.5-.5-3.7'/%3E%3C/svg%3E");
        background-color: currentColor;
        -webkit-mask-image: var(--svg);
        mask-image: var(--svg);
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: 100% 100%;
        mask-size: 100% 100%;
    }
    .res-icon--uranium {
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23238f00' d='M341.28 22.813L254 123.843l-11.094 5.907l-113.094-83.125L154.22 177.03l-47.907 25.564l-89.72 24.22l36.938 19.624l-30.968 82.625l-2.843 7.687l7.218 3.844l79.406 42.25l-19.47 44.844L144 402.906l32.22 17.156l4.405 2.344l4.375-2.344l47.844-25.468L287.75 497.97l37.78-139.876l142.41 26.656l-60.907-82.875l74.814-39.844l7.25-3.842l-2.906-7.688l-20.625-54.594l26.218-22.625l-35.28-1.405l-3.906-10.344l-1.25-3.25l-3.03-1.655l-103.97-56.53l-3.063-77.282zM321.595 109l107.97 58.688l-237.47 125.718l-108.625-57.5L321.593 109zm42.78 44.563l-171.718 90.062l-41.562-22.188l-25.313 13.407l66.876 35.656l197.28-103.906l-25.56-13.03zm76.313 29.406l25.125 66.436L193.656 394.28l5.78-83.624l241.25-127.687zM71.813 250.874l109.032 57.75l-6.188 89.438L42.97 327.938l28.843-77.063z'/%3E%3C/svg%3E");
    }
    .res-icon--titanium{
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%2378afad' d='M341.28 22.813L254 123.843l-11.094 5.907l-113.094-83.125L154.22 177.03l-47.907 25.564l-89.72 24.22l36.938 19.624l-30.968 82.625l-2.843 7.687l7.218 3.844l79.406 42.25l-19.47 44.844L144 402.906l32.22 17.156l4.405 2.344l4.375-2.344l47.844-25.468L287.75 497.97l37.78-139.876l142.41 26.656l-60.907-82.875l74.814-39.844l7.25-3.842l-2.906-7.688l-20.625-54.594l26.218-22.625l-35.28-1.405l-3.906-10.344l-1.25-3.25l-3.03-1.655l-103.97-56.53l-3.063-77.282zM321.595 109l107.97 58.688l-237.47 125.718l-108.625-57.5L321.593 109zm42.78 44.563l-171.718 90.062l-41.562-22.188l-25.313 13.407l66.876 35.656l197.28-103.906l-25.56-13.03zm76.313 29.406l25.125 66.436L193.656 394.28l5.78-83.624l241.25-127.687zM71.813 250.874l109.032 57.75l-6.188 89.438L42.97 327.938l28.843-77.063z'/%3E%3C/svg%3E");
    }
    .res-icon--iridium {
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23af7887' d='M341.28 22.813L254 123.843l-11.094 5.907l-113.094-83.125L154.22 177.03l-47.907 25.564l-89.72 24.22l36.938 19.624l-30.968 82.625l-2.843 7.687l7.218 3.844l79.406 42.25l-19.47 44.844L144 402.906l32.22 17.156l4.405 2.344l4.375-2.344l47.844-25.468L287.75 497.97l37.78-139.876l142.41 26.656l-60.907-82.875l74.814-39.844l7.25-3.842l-2.906-7.688l-20.625-54.594l26.218-22.625l-35.28-1.405l-3.906-10.344l-1.25-3.25l-3.03-1.655l-103.97-56.53l-3.063-77.282zM321.595 109l107.97 58.688l-237.47 125.718l-108.625-57.5L321.593 109zm42.78 44.563l-171.718 90.062l-41.562-22.188l-25.313 13.407l66.876 35.656l197.28-103.906l-25.56-13.03zm76.313 29.406l25.125 66.436L193.656 394.28l5.78-83.624l241.25-127.687zM71.813 250.874l109.032 57.75l-6.188 89.438L42.97 327.938l28.843-77.063z'/%3E%3C/svg%3E");
    }
    .res-icon--neutronium {
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%230b0d32' d='M341.28 22.813L254 123.843l-11.094 5.907l-113.094-83.125L154.22 177.03l-47.907 25.564l-89.72 24.22l36.938 19.624l-30.968 82.625l-2.843 7.687l7.218 3.844l79.406 42.25l-19.47 44.844L144 402.906l32.22 17.156l4.405 2.344l4.375-2.344l47.844-25.468L287.75 497.97l37.78-139.876l142.41 26.656l-60.907-82.875l74.814-39.844l7.25-3.842l-2.906-7.688l-20.625-54.594l26.218-22.625l-35.28-1.405l-3.906-10.344l-1.25-3.25l-3.03-1.655l-103.97-56.53l-3.063-77.282zM321.595 109l107.97 58.688l-237.47 125.718l-108.625-57.5L321.593 109zm42.78 44.563l-171.718 90.062l-41.562-22.188l-25.313 13.407l66.876 35.656l197.28-103.906l-25.56-13.03zm76.313 29.406l25.125 66.436L193.656 394.28l5.78-83.624l241.25-127.687zM71.813 250.874l109.032 57.75l-6.188 89.438L42.97 327.938l28.843-77.063z'/%3E%3C/svg%3E");
    }
    .res-icon--helium-3 {
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23777ded' d='M225.438 18.156c-15.105.14-32.56 2.526-52.407 7.844c-35.26 9.45-65.035 28.973-88.374 54.844c-17.668 13.755-36.98 46.39-51.437 85.97c-16.415 55.046-16.447 120.304-2.157 188.155C34.84 372.91 44.14 385.08 57.5 392.093c13.36 7.01 31.353 8.776 52.688 3.062c13.473-3.608 23.028-12.44 28.812-22.75s7.226-22.05 5.313-29.187c-4.335-16.17-19.078-25.202-32.313-21.658c-9.02 2.417-13.433 10.27-13.5 16.97c-.034 3.35.976 6.065 2.75 7.968s4.493 3.497 10 3.594l-.344 18.687c-9.57-.168-17.87-3.693-23.312-9.53s-7.856-13.482-7.78-20.906c.148-14.85 10.064-30.185 27.342-34.813c24.03-6.434 48.515 9.84 55.22 34.845c3.605 13.45.802 29.11-7.095 43.188c-7.896 14.077-21.48 26.63-40.25 31.656a123 123 0 0 1-12.343 2.624c98.875 90.13 248.893 110.83 349.344 9.72c18.164-18.283 31.29-40.735 38.595-65.127c.02-.063.044-.124.063-.187c9.94-40.298 4.91-84.342-17.5-123.156c-44.153-76.474-142.198-106.276-193.094-78.28c-57.27 23.11-71.688 56.892-76.625 81.874c-21.635 61.008 4.65 135.55 67.686 156.375c43.724 14.443 97.45-5.348 111.656-51.25c9.364-30.262-4.29-66.992-35.437-75.532c-9.543-2.616-20.58-1.58-29.438 2.658s-15.41 11.2-17.78 21.093c-1.297 5.42-.55 11.935 1.906 16.814c2.455 4.88 5.99 8.01 11.25 8.97c1.883.342 4.31-.074 6.28-.845a10.3 10.3 0 0 1-4.343-2.345c-1.39-1.288-3.168-3.693-3.656-6.563c-.78-4.998 2.214-9.82 5.03-11.906c2.818-2.086 5.51-2.925 8.845-2.906c6.21.034 11.453 3.97 14.03 8.125s3.51 8.625 2.97 13.28v.033c-.982 8.283-6.386 14.75-12.533 18.187a29.77 29.77 0 0 1-19.968 3.313c-11.435-2.087-20.017-9.842-24.595-18.938s-5.78-19.644-3.406-29.563c3.774-15.756 14.824-27.336 27.905-33.593c13.08-6.257 28.324-7.683 42.438-3.813c42.675 11.702 60.497 59.787 48.343 99.064c-17.637 56.99-82.493 80.936-135.375 63.47c-68.184-22.526-99.163-97.1-84.28-163.44c-18.918-16.436-34.28-39.526-40.47-62.624c-14.74-55.014 32.67-114.382 82.19-130.563c42.26-13.775 79.575 5.404 60.124 39.094c33.446-28.243 15.37-79.8-57.406-79.124z'/%3E%3C/svg%3E");
    }
    .res-icon--genes {
        --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%23000' d='M121.844 18.22c-10.248 46.5-5.753 86.598 7.562 121c31.722 35.503 74.78 60.367 119.5 84.405c-15.144-14.727-29.5-29.294-41.97-44.188h72.94c5.318-6.197 10.267-12.425 14.812-18.687H192.5c-4.946-7.035-9.397-14.18-13.25-21.5a177 177 0 0 1-5.656-11.75h140.594c2.73-6.087 5.032-12.27 6.875-18.688h-154.22c-3.453-12.16-5.326-25.127-5.218-39.437h164.25c-.176-5.948-.708-12.168-1.656-18.72H162.843c1.202-10.093 3.29-20.866 6.437-32.436zm216.03 0c10.033 36.836 9.616 65.44 2.47 90.593h-.156c-3.215 13.34-8.158 25.723-14.375 37.53c-15.708 29.833-40.195 56.197-67.094 82.532c12.75 6.806 25.567 13.607 38.25 20.625c26.73-26.167 52.8-54.185 71.03-88.813c20.463-38.87 29.83-85.945 17.375-142.468zm-129 253.81c-20.338 21.212-39.452 44.344-53.936 71.69c-21.326 40.26-31.11 89.958-19.438 149.467h45.625c-5.036-22.15-6.48-42.845-5.03-62c.458-7.468 1.38-14.606 2.75-21.468H179a172 172 0 0 1 4.813-18.69c.024-.07.038-.145.062-.217a170.5 170.5 0 0 1 11.188-26.875c14.96-28.73 35.86-51.34 56.5-71.813c-14.107-6.74-28.446-13.326-42.688-20.094zm47.595 22.47c14.437 14.55 27.88 29.196 39.186 44.563h-61.812c-4.798 5.982-9.337 12.195-13.53 18.687h87.75c1.445 2.45 2.832 4.94 4.155 7.438c4.388 8.287 8.147 16.85 11.155 25.843H203.5c-2.184 5.98-4.007 12.218-5.47 18.69h130.314c2.428 12.173 3.525 25.21 2.937 39.436H194.19c.137 6.05.58 12.28 1.375 18.688h134.062c-1.072 8.062-2.65 16.496-4.75 25.344h46.813c9.533-48.618 4.736-90.682-8.97-126.407c-28.443-31.848-66.276-52.97-106.25-72.28z'/%3E%3C/svg%3E");
        background-color: currentColor;
        -webkit-mask-image: var(--svg);
        mask-image: var(--svg);
        -webkit-mask-repeat: no-repeat;
        mask-repeat: no-repeat;
        -webkit-mask-size: 100% 100%;
        mask-size: 100% 100%;
    }
    .res-icon--mythril {
        background-repeat: no-repeat;
        background-size: 100% 100%;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3Cpath fill='%237f74f5' d='M341.28 22.813L254 123.843l-11.094 5.907l-113.094-83.125L154.22 177.03l-47.907 25.564l-89.72 24.22l36.938 19.624l-30.968 82.625l-2.843 7.687l7.218 3.844l79.406 42.25l-19.47 44.844L144 402.906l32.22 17.156l4.405 2.344l4.375-2.344l47.844-25.468L287.75 497.97l37.78-139.876l142.41 26.656l-60.907-82.875l74.814-39.844l7.25-3.842l-2.906-7.688l-20.625-54.594l26.218-22.625l-35.28-1.405l-3.906-10.344l-1.25-3.25l-3.03-1.655l-103.97-56.53l-3.063-77.282zM321.595 109l107.97 58.688l-237.47 125.718l-108.625-57.5L321.593 109zm42.78 44.563l-171.718 90.062l-41.562-22.188l-25.313 13.407l66.876 35.656l197.28-103.906l-25.56-13.03zm76.313 29.406l25.125 66.436L193.656 394.28l5.78-83.624l241.25-127.687zM71.813 250.874l109.032 57.75l-6.188 89.438L42.97 327.938l28.843-77.063z'/%3E%3C/svg%3E");
    }
`)

  // add icons to costs as they are added
  const observer = new MutationObserver(() => {
    Object.entries(resources).forEach(([resource, iconClass]) => {
      document.querySelectorAll(`div.res-${resource}`).forEach((elem) => {
        if (!elem.querySelector(`.${iconClass}`)) {
          elem.innerHTML = `<span class='res-icon--common ${iconClass}'></span>${elem.innerHTML}`
        }
      })
    })
  })
  observer.observe(document.body, { childList: true, subtree: true })

  // add labels to resources sidebar once
  Object.entries(resources).forEach(([resource, iconClass]) => {
    const selector = `div.resources div#res${resource} h3`
    const element = document.querySelector(selector)
    if (element) {
      element.innerHTML = `<span class='res-icon--common ${iconClass}'></span> ${element.innerHTML}`
    }
  })
})()
