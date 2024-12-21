// ==UserScript==
// @name         Evolve Idle Cloud Save
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.3.0
// @description  Automatically upload your evolve save to a gist
// @downloadURL  https://github.com/Alistair1231/my-userscripts/raw/master/EvolveIdleSavegameBackup.user.js
// @author       Alistair1231
// @match        https://pmotschmann.github.io/Evolve/
// @icon         https://icons.duckduckgo.com/ip2/github.io.ico
// @grant        GM.xmlhttpRequest
// @grant        GM.setValue
// @grant        GM.getValue
// @license GPL-3.0
// ==/UserScript==
// https://greasyfork.org/en/scripts/490376-automatic-evolve-save-upload-to-gist
// https://github.com/Alistair1231/my-userscripts/raw/master/EvolveIdleSavegameBackup.user.js

/*
## Why This?
I lost my save game 😞. To prevent this from happening again, I implemented a quick backup, that 
uses GitHub Gist to store the save data. 
 
## What does it do?
It makes a backup every 30 minutes (adjustable at the bottom of the script). The save game will 
be written to a gist, that is defined by the user. By using a gist, you also get the benefit of 
versioning. So you can roll back to earlier saves. 😉 
 
I recommend using a separate file for each PC, otherwise your savegame might get overwritten by 
another PC, which has the tab open in the background. Also, only have one tab open at a time, 
otherwise the save might get overwritten by the other tab. This is easily recoverable, using the 
revision history of the gist, but it is worth mentioning. 😅
 
## How to use?
On first setup you will need to manually create a GitHub API key and a Gist and then input them 
for the script to use.
This is only tested on [Violentmonkey](https://violentmonkey.github.io/get-it/). Some other 
Userscript managers might handle the GM functions differently. If something does not work, 
try to use Violentmonkey. 😊
Also, I export the `makeBackup` function to the global scope, so you can manually trigger a 
backup by typing `makeBackup()` in the dev console of your browser (`Ctrl/CMD + Shift + J` to open).
 
## Setup instructions 
 
You will need a GistID and a Personal Access Token with `Gist` scope to use this.
 
Create a gist, the description does not matter, in this Gist, create a file e.g. called "save.txt", 
add some random content and save. You can do that here (You will need a GitHub account): 
https://gist.github.com
Afterwards, you can find the GistID in the URL: https://gist.github.com/{Username}/{GistID}
 
The Personal Access Token you have to create here: https://github.com/settings/tokens you only 
need the gist scope.
 
If you make a mistake you should be asked again, alternatively you can manually set these values 
in the Userscript storage. In Violentmonkey you can access this by clicking on the extension icon,
then right-clicking on the script and selecting `Values`. There we want values like this (these are 
random examples I didn't leak my credentials 😉):
```
{
filename: "save.txt",
gistId: "856ce06ecda1234e095c156da8fd44d7",
token: "ghp_k928znRUu7ZI0tySv9gP2A2x9VdvVLrmrXCD"
}
```
 
## How does it work? (technical)
The script makes use of `GM.xmlhttpRequest` for the request and `GM.setValue`/`GM.getValue` 
for storing/retrieving the secrets. The timing is done with `setInterval`. For saving the Data 
the GitHub API is used. The save game is exported using the `exportGame` function, which is exposed 
by the game. The save game is then sent to the GitHub API using a PATCH request. 
 
I hope I can prevent some people from loosing their save games, and allow for more easy 
switching between devices. 😊
*/

// To help the linter out
// const GM = {
//   setValue: async function GM_setValue(key, value) {
//     return new Promise((resolve) => {
//     });
//   },
//   getValue: async function GM_getValue(key, defaultValue) {
//     return new Promise((resolve) => {
//     });
//   },
//   xmlhttpRequest: function GM_xmlhttpRequest(details) {
//     return new Promise((resolve) => {
//     });
//   }
// };
// const unsafeWindow = {
//   exportGame: function () {
//     return "";
//   },
//   importGame: function (a, i) {
//   }
// };

const makeRequest = async (method, url, data, token, onload, onerror) => {
  let headerVal;
  if (token === null) {
    headerVal = {};
  } else {
    headerVal = {
      Authorization: `token ${token}`,
      "Content-Type": "application/json",
      Accept: "application/vnd.github.v3+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
  }
  return GM.xmlhttpRequest({
    method: method,
    url: url,
    data: data,
    headers: headerVal,
    onload: onload,
    onerror: onerror,
  });
};

const getSecrets = async () => {
  return {
    gistId: await GM.getValue("gistId", ""),
    token: await GM.getValue("token", ""),
    fileName: await GM.getValue("filename", "save.txt"),
  };
};

// Create an overlay to collect secrets from the user
const createSecretsOverlay = () => {
  const overlay = document.createElement('div');
  overlay.style.position = 'fixed';
  overlay.style.top = '0';
  overlay.style.left = '0';
  overlay.style.width = '100%';
  overlay.style.height = '100%';
  overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  overlay.style.display = 'flex';
  overlay.style.alignItems = 'center';
  overlay.style.justifyContent = 'center';
  overlay.style.zIndex = '1000';

  const modal = document.createElement('div');
  modal.style.backgroundColor = 'white';
  modal.style.padding = '20px';
  modal.style.borderRadius = '8px';
  modal.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.2)';
  modal.style.width = '400px';

  const guideText = document.createElement('p');
  guideText.textContent = `You will need a GistID and a Personal Access Token to use 
  this cloud-save script. They will be saved as cleartext in the Userscript storage!
  \n\n
  Create a gist at https://gist.github.com and make note of the GistID in the URL (e.g., 
  https://gist.github.com/{{Username}}/{{GistID}}). The script doesn't handle creating files,
  so create a file in the gist with the filename you wish to use and add some random content.
  \n\n
  Create a Personal Access Token at 
  https://github.com/settings/tokens with the "gist" scope.`;
  guideText.style.fontSize = '14px';
  guideText.style.marginBottom = '10px';

  const form = document.createElement('form');
  form.style.display = 'flex';
  form.style.flexDirection = 'column';

  const createInput = (labelText, placeholderText) => {
    const label = document.createElement('label');
    label.textContent = labelText;
    label.style.marginTop = '10px';
    label.style.fontSize = '14px';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = placeholderText;
    input.style.marginTop = '5px';
    input.style.padding = '8px';
    input.style.fontSize = '14px';

    form.appendChild(label);
    form.appendChild(input);
    return input;
  };

  const gistIdInput = createInput('Gist ID', 'Enter your Gist ID');
  const tokenInput = createInput('GitHub Personal Access Token', 'Enter your Token');
  const fileNameInput = createInput('Filename', 'Enter filename (default: save.txt)');

  const button = document.createElement('button');
  button.textContent = 'Save';
  button.style.marginTop = '15px';
  button.style.padding = '10px';
  button.style.fontSize = '14px';
  button.style.cursor = 'pointer';

  button.addEventListener('click', (e) => {
    e.preventDefault();
    const gistId = gistIdInput.value.trim();
    const token = tokenInput.value.trim();
    const fileName = fileNameInput.value.trim() || 'save.txt';

    if (!gistId || !token) {
      alert('Gist ID and Token are required!');
      return;
    }

    GM.setValue('gistId', gistId);
    GM.setValue('token', token);
    GM.setValue('filename', fileName);

    document.body.removeChild(overlay);
  });

  form.appendChild(button);
  modal.appendChild(guideText);
  modal.appendChild(form);
  overlay.appendChild(modal);
  document.body.appendChild(overlay);
};

const askForSecrets = () => {
  createSecretsOverlay();
};

const tryGetSecrets = async () => {
  const secrets = await getSecrets();
  if (!secrets.gistId || !secrets.token) {
    askForSecrets();
    return await getSecrets();
  }
  return secrets;
};

const makeBackup = () => {
  tryGetSecrets().then((secrets) => {
    const url = `https://api.github.com/gists/${secrets.gistId}`;
    const saveString = unsafeWindow.exportGame();
    const payload = JSON.stringify({
      files: {[secrets.fileName]: {content: saveString}},
    });
    const requestSuccess = (response) => {
      console.log("Update request successful" + response.responseText);
      if (response.responseText.includes("Bad credentials"))
        askForSecrets();
    };
    const requestError = (error) => console.error("Error updating gist: " + error);

    makeRequest("PATCH", url, payload, secrets.token, requestSuccess, requestError);
  });
};

const getBackup = () => {
  const requestSuccess = (response) => {
    console.log("GetBackup request successful" + response.responseText);
    if (response.responseText.includes("Bad credentials"))
      askForSecrets();

    document.querySelector("textarea#importExport").value = response.responseText;
  };
  const requestError = (error) => console.error("Error making GET request: " + error);

  tryGetSecrets().then((secrets) => {
    const url = `https://gist.githubusercontent.com/Alistair1231/d702d33809dcafc8598f196073674047/raw/${secrets.fileName}`;
    makeRequest("GET", url, null, null, requestSuccess, requestError);
  });
}

const addButtons = () => {
  const addButton = (name, id, onclick) => {
    const button = document.createElement("button");
    button.id = id;
    button.classList.add("button");
    button.textContent = name;
    button.onclick = onclick;
    button.style.marginTop = ".75rem";
    return button;
  }
  const div = document.querySelectorAll("div.importExport")[1];
  div.appendChild(document.createElement("br"));

  let importButton = addButton("Import Gist", "importGistButton", () => {
    getBackup();
  })
  div.appendChild(importButton);
  importButton.after(document.createTextNode(" "));

  let exportButton = addButton("Save in Gist", "exportGistButton", () => {
    makeBackup();
    document.querySelector("textarea#importExport").value = "";
  })
  div.appendChild(exportButton);
  exportButton.before(document.createTextNode(" "));

}

(function () {
  "use strict";
  // ensure on page load, that the secrets are set.
  tryGetSecrets();

  // run every 30 minutes
  setInterval(makeBackup, 1000 * 60 * 30);

  // export makeBackup for manual use
  unsafeWindow.makeBackup = makeBackup;
  unsafeWindow.getBackup = getBackup;
  unsafeWindow.addButtons = addButtons;
  // add buttons to the UI
  addButtons();
})();
