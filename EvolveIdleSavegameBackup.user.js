// ==UserScript==
// @name         Evolve Idle Cloud Save
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.2.0
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
I lost my save game 😞. To prevent this from happening again, I implemented a quick and dirty cloud backup using a GitHub Gist. 

Only export is implemented currently, but I might add an import feature later. Don't hold your breath though. 🤷

## What does it do?
It makes a backup every 30 minutes (adjustable at the bottom of the script). The save game will be written to a gist, that is defined by the user. By using a gist, you also get the benefit of versioning. So you can roll back to earlier saves. 😉 
Currently, it dumbly overwrites the file with the same name, so be careful with that. I recommend using a separate file for each PC, otherwise your savegame might get overwritten by another PC, which has the tab open in the background. Also, only have one tab open at a time, otherwise the save might get overwritten by the other tab. This is easily recoverable, using the revision history of the gist, but it is worth mentioning. 😅

## Security Concerns
**The API token is saved as plaintext**, so be sure to only give it the gist scope and use a token for this purpose alone so you can revoke it if necessary. Better safe than sorry. If you are really paranoid, make a GitHub account only for this purpose. I don't want to implement encryption, that sounds like a hassle, and then you have the new issue of loosing that password as well as having to always enter it as saving the password next to the encrypted content pretty much defeats the purpose. 😁

## How to use?
On first setup you will need to manually create a GitHub API key and a Gist. That is described in an alert box when you first use the script, but since I think I remember Google having plans to remove those, I will put the description here as well.  
Be aware, I usually forget to update these descriptions, so if in doubt look at the code.  
Also, this is only tested on [Violentmonkey](https://violentmonkey.github.io/get-it/) and Firefox. The Browser should not matter, but some other Userscript managers might handle the GM functions differently. If something does not work, try to use Violentmonkey, or message me, if I have time I might try to help.  
Also, I export the `makeBackup` function to the global scope, so you can manually trigger a backup by typing `makeBackup()` in the console. This is useful if you want to make a backup before you close the tab, but don't want to wait for the next interval. In the future I might add a button to the UI. Maybe together with a button to import a save game. 🤔

## Setup instructions 

You will need a GistID and a Personal Access Token to use this.

Create a gist, the description does not matter, in it make a file e.g. called "save.txt" and add some random content so GitHub doesn't complain, you can do that here: https://gist.github.com
Afterwards, you can find the GistID in the URL: https://gist.github.com/{{Username}}/{{GistID}}

The Personal Access Token you have to create here: https://github.com/settings/tokens you only need the gist scope.

If you make a mistake you should be asked again, alternatively you can manually set these values in the Userscript storage.

## How does it work? (technical)
The script makes use of `GM.xmlhttpRequest` for the request and `GM.setValue`/`GM.getValue` for storing/retrieving the secrets. The timing is done with `setInterval`. For saving the Data the GitHub API is used. The save game is exported using the `exportGame` function, which is exposed by the game. The save game is then sent to the GitHub API using a PATCH request. 

I hope I can prevent some people from loosing their save games, and allow for more easy switching between devices. 😊
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

const askForSecrets = () => {
  // Explain to the user what's happening
  alert(`You will need a GistID and a Personal Access Token to use this. They will be saved as cleartext in the Userscipt storage!

Create a gist, the description does not matter, in it make a file and make note of the filename e.g. "save.txt" and add some random content so github doesn't complain, you can do that here:
https://gist.github.com
then you can find the GistID in the URL: 
https://gist.github.com/{{Username}}/{{GistID}}

The Personal Access Token you have to create here: 
https://github.com/settings/tokens
you only need the gist scope.

If you make a mistake you should be asked again, alternatively you can manually set these values in the Userscript storage.`);

  const gistId = prompt("Enter your Gist ID");
  const token = prompt("Enter your GitHub Personal Access Token");
  const fileName = prompt(`Enter the filename that should be used for the save game, or leave empty for 'save.txt'
I recommend using a separate file for each PC, otherwise your savegame might get overwritten by another PC, which has the tab open in the background.`
  );
  GM.setValue("gistId", gistId);
  GM.setValue("token", token);
  // if the user left the filename empty, use the default
  GM.setValue("filename", fileName || "save.txt");
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
