// ==UserScript==
// @name         Evolve Idle Cloud Save
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      1.0.2
// @description  Automatically upload your evolve save to a gist
// @downloadURL  https://github.com/Alistair1231/my-userscripts/raw/master/EvolveIdleSavegameBackup.user.js
// @author       Alistair1231
// @match        https://pmotschmann.github.io/Evolve/
// @icon         https://icons.duckduckgo.com/ip2/github.io.ico
// @grant        GM.xmlhttpRequest
// @grant        GM.setValue
// @grant        GM.getValue
// @license GPL-3.0
// @require https://cdn.jsdelivr.net/gh/Alistair1231/my-userscripts@232b1d6f0a0a6eb47fcccb94e6346d8230562154/lib.js

// @grant GM_getValue
// @grant GM_setValue
// @grant GM_deleteValue
// @grant GM_listValues
// @require https://cdn.jsdelivr.net/gh/Alistair1231/my-userscripts@232b1d6f0a0a6eb47fcccb94e6346d8230562154/libValues.js

// @grant GM_xmlhttpRequest
// @require https://cdn.jsdelivr.net/gh/Alistair1231/my-userscripts@232b1d6f0a0a6eb47fcccb94e6346d8230562154/libRequest.js
// ==/UserScript==
// https://greasyfork.org/en/scripts/490376-automatic-evolve-save-upload-to-gist
// https://github.com/Alistair1231/my-userscripts/raw/master/EvolveIdleSavegameBackup.user.js

/*
# Evolve Idle Cloud Save

I lost my save game 😞, so I created a quick backup solution using GitHub Gist to store save data. 

### Key Features:
- **Automatic Upload:** On first use, you'll be prompted to enter your Gist ID and Personal Access Token. These credentials are stored as plain text in the Userscript storage. The token must have the `gist` scope.
- **Manual Setup:** You need to manually create the Gist and enter its ID in the settings. 
- **Export Settings:** Saves are exported to the filename specified in the settings.
- **Import Flexibility:** Import your save from any file in the Gist, making it easy to restore data after switching devices or PCs.
- **Backup Options:**
  - Automatic backups are performed every 15 minutes.
  - Manual backups can be triggered by clicking the "Save to" button.
- **Advanced Use:** The `evolveCloudSave` object is exposed to the window, allowing for manual interaction.

With this setup, your progress is secure, and you can easily transfer your saves between devices.

![UI changes](https://i.imgur.com/2rxSxb3.png)
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
      const filenames = Object.keys(files);

      buttons.innerHTML = `
    <div class='importExport' style='display: flex; margin-top: 1rem'>
      <button id='cloudsave_importGistButton' class='button' style='margin-top: .75rem;marging-right=1em'>Import selected</button>
      <select id='cloudsave_fileSelect' style='margin-top: .75rem'>
        ${filenames.map((file) => `<option value='${file}'>${file}</option>`)}
      </select>
      </div>
      <button id='cloudsave_exportGistButton' class='button' style='margin-top: .75rem'>Save to "${lib.settings.filename}"</button>
      <br>
      <button id='cloudsave_settingsButton' class='button' style='margin-top: .75rem'>Settings</button>
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

      // run every 15 minutes
      setInterval(evolveCloudSave.makeBackup, 1000 * 60 * 15);

      // export for manual use
      unsafeWindow.evolveCloudSave = evolveCloudSave;
      unsafeWindow.evolveCloudSave.settings = lib.settings;
    }
  });
})();
