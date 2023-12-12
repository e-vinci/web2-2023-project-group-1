import { decryption } from '../../utils/cryptPassword';
import Navigate from '../Router/Navigate';

async function afficherSite(userId, idSite, password) {
  let option = {
    method: 'POST',
    body: JSON.stringify({
      userId,
      siteId: idSite,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
  let response = await fetch('/api/sites/getSiteById', option);
  if (!response.ok) {
    console.log("Error can't get the site because response is not ok");
  }
  const site = await response.json();

  const mdp = await decryption(site.mot_de_passe, password);

  const rightSide = document.querySelector('.right');
  rightSide.innerHTML = `
    <div> <h1>Site Information</h1>  
            <div> <h2>voici l url de votre site : </h2> 
            <a> ${site.url} </a> 
            </div> 
            <div> <h2>voici le nom de votre site : </h2>
             <p>${site.site} </p> 
             </div> 
             <div> <h2>voici le login de votre site : </h2> 
             <p>${site.login} </p> 
             </div> 
             <div> <h2>voici le mot de passe de votre site : </h2> 
             <p>${mdp} </p> 
             </div>
     <button id="deleteButton" class="btn btn-secondary btn-lg btn-block">
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
Supprimer les informations de ce site.
    </div>`;

  const deleteButton = document.querySelector('#deleteButton');
  deleteButton.addEventListener('click', async (e) => {
    e.preventDefault();

    option = {
      method: 'DELETE',
      body: JSON.stringify({
        userId,
        siteId: idSite,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    response = await fetch('/api/sites/deleteSite', option);
    if (!response) {
      console.log("Error can't delete the site because response is not ok");
    } else {
      Navigate('/');
    }
  });
}

export default afficherSite;
