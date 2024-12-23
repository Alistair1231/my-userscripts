// ==UserScript==
// @name          Evolve Idle Cloud Save
// @namespace     https://github.com/Alistair1231/my-userscripts/
// @version       1.1.2
// @description   Automatically upload your evolve save to a gist
// @downloadURL   https://github.com/Alistair1231/my-userscripts/raw/master/EvolveIdleSavegameBackup.user.js
// @author        Alistair1231
// @match         https://pmotschmann.github.io/Evolve/
// @icon          https://icons.duckduckgo.com/ip2/github.io.ico
// @license       GPL-3.0
// @grant         GM.getValue
// @grant         GM.setValue
// @grant         GM.deleteValue
// @grant         GM.listValues
// @grant         GM.xmlHttpRequest
// @require       https://cdn.jsdelivr.net/gh/Alistair1231/my-userscripts@5b9e5e7ee0169de3181ceab0332b390dab39c4d8/lib.js
// @require       https://cdn.jsdelivr.net/npm/@trim21/gm-fetch@0.2.1
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

;(async function () {
  'use strict'
  const lib = { ...libDefault, ...libValues }

  const evolveCloudSave = {
    // Create an overlay to collect secrets from the user
    openSettings: () => {
      const saveSettings = () => {
        const gistId = document.getElementById('gist_id').value.trim()
        const token = document.getElementById('gist_token').value.trim()
        const filename =
          document.getElementById('file_name').value.trim() || 'save.txt'
        if (!gistId || !token) {
          alert('Gist ID and Token are required!')
          return
        }
        lib.settings.gistId = gistId
        lib.settings.token = token
        lib.settings.filename = filename
        document.body.removeChild(overlay)
      }

      const fillCurrentSettings = () => {
        document.getElementById('gist_id').value = lib.settings.gistId || ''
        document.getElementById('gist_token').value = lib.settings.token || ''
        document.getElementById('file_name').value =
          lib.settings.filename || 'save.txt'
      }

      let overlay = document.createElement('div')
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
    `

      document.body.appendChild(overlay)
      //   clicking on overlay and esc handling
      overlay.addEventListener('click', (e) => {
        if (e.target.id === 'settings_overlay') {
          document.body.removeChild(overlay)
        }
      })
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          if (document.getElementById('settings_overlay')) {
            document.body.removeChild(overlay)
          }
        }
      })

      document.getElementById('save_button').addEventListener('click', (e) => {
        e.preventDefault()
        saveSettings()
        // force refresh
        location.reload()
      })

      fillCurrentSettings()
    },

    getFiles: async () => {
      let files = await GM_fetch(
        `https://api.github.com/gists/${lib.settings.gistId}`,
        {
          method: 'GET',
          headers: { Authorization: `token ${lib.settings.token}` },
        }
      )
      files = await files.json()
      return files.files
    },
    createOrUpdateFile: async (filename, content) => {
      const files = await evolveCloudSave.getFiles()
      if (files[filename] === undefined) {
        let response = await GM_fetch(
          `https://api.github.com/gists/${lib.settings.gistId}`,
          {
            method: 'POST',
            headers: { Authorization: `token ${lib.settings.token}` },
            body: `{ "files": { "${filename}": { "content": "${content}" } } }`,
          }
        )
        return await response
      } else {
        let response = await GM_fetch(
          `https://api.github.com/gists/${lib.settings.gistId}`,
          {
            method: 'PATCH',
            headers: { Authorization: `token ${lib.settings.token}` },
            body: `{ "files": { "${filename}": { "content": "${content}" } } }`,
          }
        )
        return await response
      }
    },

    makeBackup: async () => {
      const saveString = unsafeWindow.exportGame()
      const response = await evolveCloudSave.createOrUpdateFile(
        lib.settings.filename,
        saveString
      )
      return response
    },

    getBackup: async () => {
      const files = await evolveCloudSave.getFiles()
      const filename = document.getElementById('cloudsave_fileSelect').value
      const content = files[filename].content
      document.querySelector('textarea#importExport').value = content
    },

    addButtons: async () => {
      const buttons = document.createElement('div')
      let files = await evolveCloudSave.getFiles()
      const filenames = Object.keys(files)

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
    `
      const div = document.querySelectorAll('div.importExport')[1]
      div.appendChild(buttons)
      document
        .getElementById('cloudsave_importGistButton')
        .addEventListener('click', () => {
          evolveCloudSave.getBackup()
        })
      document
        .getElementById('cloudsave_exportGistButton')
        .addEventListener('click', async () => {
          const response = await evolveCloudSave.makeBackup()
          if (response.status === 200) {
            const successMessage = document.getElementById('success_message')
            successMessage.style.display = 'block'
            setTimeout(() => {
              successMessage.style.transition = 'opacity 1s'
              successMessage.style.opacity = '0'
              setTimeout(() => {
                successMessage.style.display = 'none'
                successMessage.style.opacity = '1'
              }, 1000)
            }, 2000)
          }
          console.log(response)
        })
      document
        .getElementById('cloudsave_settingsButton')
        .addEventListener('click', () => {
          evolveCloudSave.openSettings()
        })
    },
  }

  lib.waitFor('div#main', () => {
    if (lib.settings.gistId === null || lib.settings.token === null) {
      evolveCloudSave.openSettings()
      return
    } else {
      evolveCloudSave.addButtons()

      // run every 15 minutes
      setInterval(evolveCloudSave.makeBackup, 1000 * 60 * 15)

      // export for manual use
      unsafeWindow.evolveCloudSave = evolveCloudSave
      unsafeWindow.evolveCloudSave.settings = lib.settings
    }
  })
})()
