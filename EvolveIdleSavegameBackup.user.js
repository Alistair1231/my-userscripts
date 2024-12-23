// ==UserScript==
// @name         Evolve Idle Cloud Save
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      1.0.0
// @description  Automatically upload your evolve save to a gist
// @downloadURL  https://github.com/Alistair1231/my-userscripts/raw/master/EvolveIdleSavegameBackup.user.js
// @author       Alistair1231
// @match        https://pmotschmann.github.io/Evolve/
// @icon         https://icons.duckduckgo.com/ip2/github.io.ico
// @grant        GM.xmlhttpRequest
// @grant        GM.setValue
// @grant        GM.getValue
// @license GPL-3.0
// @require https://cdn.jsdelivr.net/gh/Alistair1231/my-userscripts@v1.0.6/lib.js

// @grant GM_getValue
// @grant GM_setValue
// @grant GM_deleteValue
// @grant GM_listValues
// @require https://cdn.jsdelivr.net/gh/Alistair1231/my-userscripts@v1.0.6/libValues.js

// @grant GM_xmlhttpRequest
// @require https://cdn.jsdelivr.net/gh/Alistair1231/my-userscripts@v1.0.6/libRequest.js
// ==/UserScript==
// https://greasyfork.org/en/scripts/490376-automatic-evolve-save-upload-to-gist
// https://github.com/Alistair1231/my-userscripts/raw/master/EvolveIdleSavegameBackup.user.js

/*
# Evolve Idle Cloud Save
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
 
### Setup instructions 
 
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

### I installed, what now?
Now, every 30 minutes your save game will be saved to the gist. You can also manually trigger a
backup by clicking the "Save in Gist" button in the game UI. You can also import the save 
game from the gist by clicking the "Import Gist" button in the game UI. After "Import Gist", 
you still have to click the "Import Game" button for the save to be loaded. "Import Gist" only 
fills the textarea.

## How does it work? (technical)
The script makes use of `GM.xmlhttpRequest` for the request and `GM.setValue`/`GM.getValue` 
for storing/retrieving the lib.settings. The timing is done with `setInterval`. For saving the Data 
the GitHub API is used. The save game is exported using the `exportGame` function, which is exposed 
by the game. The save game is then sent to the GitHub API using a PATCH request. 
 
I hope I can prevent some people from loosing their save games, and allow for more easy 
switching between devices. 😊
*/

(async function () {
  "use strict";
  const lib = { ...libDefault, ...libRequest, ...libValues };

  const evolveCloudSave = {
    // Create an overlay to collect secrets from the user
    openSettings: () => {
      const saveSettings = () => {
        const gistId = document.getElementById("gist_id").value.trim();
        const token = document.getElementById("gist_token").value.trim();
        const fileName =
          document.getElementById("file_name").value.trim() || "save.txt";
        if (!gistId || !token) {
          alert("Gist ID and Token are required!");
          return;
        }
        lib.settings.gistId = gistId;
        lib.settings.token = token;
        lib.settings.fileName = fileName;
        document.body.removeChild(overlay);
      };

      const fillCurrentSettings = () => {
        document.getElementById("gist_id").value = lib.settings.gistId || "";
        document.getElementById("gist_token").value = lib.settings.token || "";
        document.getElementById("file_name").value =
          lib.settings.fileName || "save.txt";
      };

      let overlay = document.createElement("div");
      overlay.innerHTML = `
    <div id='settings_overlay'
        style='position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); display: flex; align-items: center; justify-content: center; z-index: 1000'>
        <div id='settings_modal'
            style='background-color: white; padding: 20px; border-radius: 8px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); width: 400px'>
            <span style='font-size: 14px; margin-bottom: 10px'>
                You will need a GistID and a Personal Access Token to use this cloud-save script. They will be saved as
                cleartext in the Userscript storage!
            </span>
            <form id='settings_form'>
                <input id='gist_id' type='text' placeholder='Enter your Gist ID'
                    style='margin-top: 5px; padding: 8px; font-size: 14px'>
                <input id='gist_token' type='text' placeholder='Enter your Token'
                    style='margin-top: 5px; padding: 8px; font-size: 14px'>
                <input id='file_name' type='text' placeholder='Enter your Filename'
                    style='margin-top: 5px; padding: 8px; font-size: 14px'>
                <button id='save_button'
                    style='margin-top: 15px; padding: 10px; font-size: 14px; cursor: pointer'>Save</button>
            </form>
        </div>
    </div>
    `;

      document.body.appendChild(overlay);
      //   clicking on overlay and esc handling
      overlay.addEventListener("click", (e) => {
        if (e.target.id === "settings_overlay") {
          document.body.removeChild(overlay);
        }
      });
      document.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
          if (document.getElementById("settings_overlay")) {
            document.body.removeChild(overlay);
          }
        }
      });

      document.getElementById("save_button").addEventListener("click", (e) => {
        e.preventDefault();
        saveSettings();
      });

      fillCurrentSettings();
    },

    getFiles: async (request) => {
      const files = await request.get("");
      return JSON.parse(files).files;
    },
    createOrUpdateFile: async (request, filename, content) => {
      const files = await evolveCloudSave.getFiles(request);
      if (files[filename] === undefined) {
        return request.post("", { files: { [filename]: { content } } });
      } else {
        return request.patch("", { files: { [filename]: { content } } });
      }
    },

    makeBackup: async (request) => {
      const saveString = unsafeWindow.exportGame();
      const response = await evolveCloudSave.createOrUpdateFile(
        request,
        lib.settings.filename,
        saveString,
      );
      return response;
    },

    getBackup: async (request) => {
      const files = await evolveCloudSave.getFiles(request);
      const filename = document.getElementById("cloudsave_fileSelect").value;
      const content = files[filename].content;
      document.querySelector("textarea#importExport").value = content;
    },

    addButtons: async (request) => {
      const buttons = document.createElement("div");
      let files = await evolveCloudSave.getFiles(request);
      console.log(files); // files is undefined?
      const filenames = Object.keys(files);
      console.log(filenames);

      buttons.innerHTML = `
    <div class='importExport' style='display: flex; justify-content: center; margin-top: 1rem'>
      <select id='cloudsave_fileSelect' style='margin-top: .75rem'>
        ${filenames.map((file) => `<option value='${file}'>${file}</option>`)}
      </select>
      <button id='cloudsave_importGistButton' class='button' style='margin-top: .75rem'>Import selected</button>
      <button id='cloudsave_exportGistButton' class='button' style='margin-top: .75rem'>Save to "${lib.settings.filename}"</button>
      <button id='cloudsave_settingsButton' class='button' style='margin-top: .75rem'>Settings</button>
    </div>
    <div id='success_message' style='display: none; position: fixed; top: 20px; right: 20px; background-color: green; color: white; padding: 10px; border-radius: 5px;'>Backup successful!</div>
    `;
      const div = document.querySelectorAll("div.importExport")[1];
      div.appendChild(buttons);
      document
        .getElementById("cloudsave_importGistButton")
        .addEventListener("click", () => {
          evolveCloudSave.getBackup(request);
        });
      document
        .getElementById("cloudsave_exportGistButton")
        .addEventListener("click", async () => {
          await evolveCloudSave.makeBackup(request);
          const successMessage = document.getElementById("success_message");
          successMessage.style.display = "block";
          setTimeout(() => {
            successMessage.style.transition = "opacity 1s";
            successMessage.style.opacity = "0";
            setTimeout(() => {
              successMessage.style.display = "none";
              successMessage.style.opacity = "1";
            }, 1000);
          }, 2000);
        });
      document
        .getElementById("cloudsave_settingsButton")
        .addEventListener("click", () => {
          evolveCloudSave.openSettings(request);
        });
    },

    init: async () => {
      const request = new lib.Request(
        `https://api.github.com/gists/${lib.settings.gistId}`,
        {
          Authorization: `token ${lib.settings.token}`,
        },
      );
      evolveCloudSave.addButtons(request);
    },
  };

  lib.waitFor("div#main", () => {
    if (lib.settings.gistId === undefined || lib.settings.token === undefined) {
      evolveCloudSave.openSettings();
      return;
    } else {
      evolveCloudSave.init();

      // run every 30 minutes
      setInterval(evolveCloudSave.makeBackup, 1000 * 60 * 30);

      // export for manual use
      unsafeWindow.evolveCloudSave = evolveCloudSave;
      unsafeWindow.evolveCloudSave.settings = lib.settings;
    }
  });
})();
