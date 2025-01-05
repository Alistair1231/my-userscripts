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

----
![UI changes](https://i.imgur.com/HIjgCpk.png)
## Settings window example with dummy data:
![Settings](https://i.imgur.com/EUujcoO.png)

<!-- [imgur album](https://imgur.com/a/o791v3t) -->