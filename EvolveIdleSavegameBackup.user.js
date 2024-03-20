// ==UserScript==
// @name         Automatic Evolve Save Upload to Gist
// @namespace    https://github.com/Alistair1231/my-userscripts/
// @version      0.1.0
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

async function getSecrets() {
  var secrets = {
    gistId: await GM.getValue('gistId', ''),
    token: await GM.getValue('token', '')
  };
  return secrets;
}

async function askForSecrets() {
  // Explain to the user what's happening
  alert('You will need a GistID and a Personal Access Token to use this. They will be saved as cleartext in the Userscipt storage!\n\nCreate a gist, the description does not matter, in it make a file called "save.txt" and add some random content so github doesn\'t complain, you can do that here:\nhttps://gist.github.com\nthen you can find the GistID in the URL: \nhttps://gist.github.com/{{Username}}/{{GistID}}\n\nThe Personal Access Token you have to create here: \nhttps://github.com/settings/tokens\n you only need the gist scope.\n\nIf you make a mistake you should be asked again, alternatively you can manually set these values in the Userscript storage.');
  const gistId = prompt('Enter your Gist ID');
  const token = prompt('Enter your GitHub Personal Access Token');
  await GM.setValue('gistId', gistId);
  await GM.setValue('token', token);
  return await getSecrets();
}
async function tryGetSecrets() {
  const secrets = await getSecrets();
  if (!secrets.gistId || !secrets.token) {
    return askForSecrets();
  }
  return secrets;
}

function makeRequest(url, payload, secrets) {

  GM.xmlhttpRequest({
    method: 'PATCH',
    url: url,
    data: payload,
    headers: {
      'Authorization': `token ${secrets.token}`,
      'Content-Type': 'application/json',
      'Accept': 'application/vnd.github.v3+json',
      'X-GitHub-Api-Version': '2022-11-28'
    },
    onload: function (response) {
      console.log('PATCH request successful:', response.responseText);
      // if "message": "Bad credentials", then ask for secrets again
      if (response.responseText.includes('Bad credentials')) {
        askForSecrets();
      }
    },
    onerror: function (error) {
      console.error('Error making PATCH request:', error);
    }
  });
}

(async function () {
  'use strict';

  var saveString = unsafeWindow.exportGame();

  // Define the payload for the PATCH request
  const payload = JSON.stringify({
    files: {
      'save.md': {
        content: saveString
      }
    }
  });

  tryGetSecrets().then((secrets) => {
    // Define the URL for the PATCH request
    const url = `https://api.github.com/gists/${secrets.gistId}`;

    // run once at the start and then every 10 minutes
    makeRequest(url, payload, secrets);
    setInterval(makeRequest(url, payload, secrets), 600000);
  });
})();
