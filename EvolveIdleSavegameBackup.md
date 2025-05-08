# Evolve Idle Cloud Save

I lost my save game 😞, so I created a quick backup solution using GitHub Gist to store save data. 

### Key Features:
- **Configuration:** On first use, you'll be prompted to enter your Gist ID and Personal Access Token. These credentials are stored as plain text in the local storage. 
  - To create a token, you can use this link: https://github.com/settings/tokens/new?scopes=gist&description=EvolveIdleSavegameBackup
  - To create a Gist, use this link: https://gist.github.com/
- **Export Settings:** Saves are exported to the filename specified in the settings.
- **Import Flexibility:** Import your save from any file in the Gist, making it easy to restore data after switching devices or PCs.
- **Backup Options:**
  - Automatic backups are performed every 10 minutes (configurable).
  - Manual backups can be triggered by clicking the "Save to" button.
- **Advanced Use:** The `evolveCloudSave` object is exposed to the window, allowing for manual interaction.

----
❗This script is incompatible with Greasemonkey. Greasemonkey does not support GM.addStyle, which is used for styling. Please use Tampermonkey or Violentmonkey instead. I personally use this on Firefox with Violentmonkey.

Settings window example with dummy data, also the new buttons are in the background:
![Settings](https://i.imgur.com/EUujcoO.png)

<!-- [imgur album](https://imgur.com/a/o791v3t) -->