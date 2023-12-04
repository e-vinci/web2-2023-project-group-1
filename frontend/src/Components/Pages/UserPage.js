/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */

import { getAuthenticatedUser } from "../../utils/auths";
import { decryption, encryption } from "../../utils/cryptPassword";
import Navigate from '../Router/Navigate';

// import  {showS eBar} from '../User/SideBarSite';
// import { afficherDuplicatePassword } from '../User/AfficherDuplicatePassword'; 

const defaultList= [
  {
      "id": 1,
      "url": "test01",
      "site": "testSite1",
      "login": "Useraname1",
      "mot_de_passe": "$2b$10$fe2S0.EVIParWe1jAoagE.oxCfWS95JUX0YtG.mOnHdEB5zfi4TUW"
  },
  {
      "id": 2,
      "url": "test01",
      "site": "testSite1",
      "login": "Useraname1",
      "mot_de_passe": "$2b$10$0rQmPNWcskf5Ce2/hKYRFu0mDELZpc4VSN406e3rogrIo6/165362"
  },
  {
      "id": 3,
      "url": "test01",
      "site": "testSite1",
      "login": "Useraname1",
      "mot_de_passe": "$2b$10$cWHPZkMaeGY2PSCXPHk6NOGDdsHipiSKCj0kYe9lC5Z/roMYDea6K"
  },
  {
      "id": 4,
      "url": "test01",
      "site": "testSite1",
      "login": "Useraname1",
      "mot_de_passe": "$2b$10$BrUjYe2DNaRXF3oRj0oZxu/MkfoBmBphPaEMTZ9HPYFsjXLkdmMbC"
  }
];

const sidebarToFill=`<!--Main Navigation-->
  <header>
  <div class="container">
  <div class="row">
    <div class="listSite">
    </div>
    <div id="right" class="leftSide">
      The other box
    </div>
    </div>
</div>`;

const addPasswordForm = `
  <form id="registrationForm" class="mt-3">
    <div class="mb-3">
      <label for="url" class="form-label">URL</label>
      <input type="url" class="form-control" id="url" required>
      <div id="messageErreurURL" class="form-text"></div>
    </div>
    <div class="mb-3">
      <label for="site" class="form-label">Site</label>
      <input type="text" class="form-control" id="site" required>
      <div id="messageErreurSite" class="form-text"></div>
    </div>
    <div class="mb-3">
      <label for="login" class="form-label">Login</label>
      <input type="text" class="form-control" id="login" required>
      <div id="messageErreurLogin" class="form-text"></div>
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Mot de passe</label>
      <input type="password" class="form-control" id="password" required>
      <div id="messageErreurPassword" class="form-text"></div>
    </div>
    <div class="mb-3">
      <label for="masterPassword" class="form-label">Mot de passe maitre</label>
      <input type="password" class="form-control" id="masterPassword" required>
      <div id="messageErreurMasterPassword" class="form-text"></div>
    </div>
    <button type="submit" id="submitPassword" class="btn btn-primary">Enregistrer</button>
    <p id="resultat" class="text-success"></p>
  </form>
`;

const UserPage = () => {
  const user = getAuthenticatedUser();
  const username = user.username;

  const main = document.querySelector('main');
  main.className = 'd-flex align-items-center justify-content-center';
  main.innerHTML = sidebarToFill;
  const sideBar=document.querySelector('.listSite');
  const buttonaddSit=document.createElement('button');
  buttonaddSit.innerHTML='<button id="addButton" type="button" class="btn btn-primary btn-lg btn-block">Ajouter un site</button>';
  sideBar.appendChild(buttonaddSit);

  defaultList.forEach((element)=>{
    const listelem=document.createElement('tr');
    const elem=document.createElement('button');
    elem.id = element.id;
    elem.innerHTML='type="button" class="btn btn-primary btn-lg btn-block"';
    listelem.appendChild(elem);
    sideBar.appendChild(listelem);
  });

  const addButton = document.querySelector('#addButton');
  const rightDiv = document.querySelector('#right');
  let submitPasswordButton;
  addButton.addEventListener('click', () => {
    rightDiv.innerHTML = "";
    rightDiv.innerHTML = addPasswordForm;
    submitPasswordButton = document.querySelector('#submitPassword');

    submitPasswordButton.addEventListener('click', async (e) => {
      e.preventDefault();
      const url = document.querySelector('#url').value;
      const site = document.querySelector('#site').value;
      const login = document.querySelector('#login').value;
      const passwordNeedToEcnrypt = document.querySelector('#password').value;
      const masterPassword = document.querySelector('#masterPassword').value;

      if (url === '') {
        const messageErreurURL = document.querySelector('#messageErreurURL');
        messageErreurURL.innerHTML = `Veuillez renseigner une URL`;
        messageErreurURL.display = 'block';
        return;
      }
      if (site === '') {
        const messageErreurSite = document.querySelector('#messageErreurSite');
        messageErreurSite.innerHTML = `Veuillez renseigner un nom de site`;
        messageErreurSite.display = 'block';
        return;
      }
      if (login === '') {
        const messageErreurLogin = document.querySelector('#messageErreurLogin');
        messageErreurLogin.innerHTML = `Veuillez renseigner un login`;
        messageErreurLogin.display = 'block';
        return;
      }
      if (passwordNeedToEcnrypt === '') {
        const messageErreurPassword = document.querySelector('#messageErreurPassword');
        messageErreurPassword.innerHTML = `Veuillez renseigner un mot de passe`;
        messageErreurPassword.display = 'block';
        return;
      } 
      if (masterPassword === '') {
        const messageErreurMasterPassword = document.querySelector('#messageErreurMasterPassword');
        messageErreurMasterPassword.innerHTML = `Veuillez renseigner votre mot de pass maitre`;
        messageErreurMasterPassword.display = 'block';
        return;
      } 


      const optionCompare = {
        method: 'POST',
        body: JSON.stringify({
          "username": username,
          "password": masterPassword
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      };
      
      const responseCompare = await fetch('/api/auths/comparePassword', optionCompare);
      const compareData = await responseCompare.json();
      if (compareData !== 1) {
        const messageErreurMasterPassword = document.querySelector('#messageErreurMasterPassword');
        messageErreurMasterPassword.innerHTML = `Mot de passe maitre incorrect`;
        messageErreurMasterPassword.display = 'block';
        return;
      }


      const option1 = {
        method: 'POST', 
        body: JSON.stringify({
          'username': username,
        }),
        headers: {
          'Content-Type': 'application/json',
        }
      };

      const response1 = await fetch('/api/auths/readUserFromUsername', option1)
      const userId = await response1.json();
      const pass=await encryption(passwordNeedToEcnrypt, masterPassword,userId);
      console.log(await encryption(passwordNeedToEcnrypt, masterPassword,userId));
      const res=await decryption(pass,masterPassword,userId)
      console.log(res);

      const option2 = {
        method: 'POST',
        body: JSON.stringify({
          "userId": userId,
          "urlSite": url,
          "siteName": site,
          "userNameSite": login,
          "passwordSite": await encryption(passwordNeedToEcnrypt, masterPassword,userId)
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      };

      const response2 = await fetch('/api/sites/addSite', option2);
      const resultat = document.querySelector('#resultat');
        if (!response2.ok) {
            resultat.className = 'text-danger';
            resultat.innerHTML = `Une erreur est survenue`;
        } else {
            resultat.innerHTML = `Enregistrement réussi`;
            Navigate('/user');
        }
    });
  });
};



export default UserPage;