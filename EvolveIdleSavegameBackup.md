# Evolve Idle Cloud Save

I lost my save game 😞, so I created a quick backup solution using GitHub Gist to store save data. 

### Key Features:
- **Automatic Upload:** On first use, you'll be prompted to enter your Gist ID and Personal Access Token. These credentials are stored as plain text in the local storage. 
  - To create a token, you can use this link: https://github.com/settings/tokens/new?scopes=gist&description=EvolveIdleSavegameBackup
  - To create a Gist, use this link: https://gist.github.com/ (public/private doesn't matter for the script to work).
- **Export Settings:** Saves are exported to the filename specified in the settings.
- **Import Flexibility:** Import your save from any file in the Gist, making it easy to restore data after switching devices or PCs.
- **Backup Options:**
  - Automatic backups are performed every 15 minutes.
  - Manual backups can be triggered by clicking the "Save to" button.
- **Advanced Use:** The `evolveCloudSave` object is exposed to the window, allowing for manual interaction.

With this setup, your progress is secure, and you can easily transfer your saves between devices.

----
❗This script is incompatible with Greasemonkey. Greasemonkey does not support GM.addStyle, which is used for styling. Please use Tampermonkey or Violentmonkey instead. I personally use this on Firefox with Violentmonkey.

Settings window example with dummy data, also the new buttons are in the background:
![Settings](https://i.imgur.com/EUujcoO.png)

<!-- [imgur album](https://imgur.com/a/o791v3t) -->