/* eslint-disable no-restricted-syntax */
/* eslint-disable no-self-compare */
import { decryption } from '../../utils/cryptPassword';
import { getAuthenticatedUser } from '../../utils/auths';
import Navigate from '../Router/Navigate';

// Fonction pour créer et afficher la liste des doublons de mots de passe
async function afficherDuplicatePassword(password) {
  const rightDiv = document.querySelector('.right');
  
  // Structure HTML pour la liste des doublons de mots de passe
  const checkDuplicatePassword = `
    <section class="d-flex align-items-center justify-content-center">
      <table id="duplicatePassword" class="table table-striped table-hover">
        <thead>
          <tr>
            <th>Site 1</th>
            <th>Site 2</th>
            <th>Mot de passe</th>
          </tr>
        </thead>
        <tbody>
        </tbody>
      </table>
    </section>
  `;
  
  // Remplacer le contenu de '.right' par la structure HTML
  rightDiv.innerHTML = checkDuplicatePassword;

  try {
    const list = await getlist();
    let hasDuplicates = false;

    await Promise.all(list.map(async (elem) => {
      const password1 = await decryption(elem.mot_de_passe, password);

      await Promise.all(list.map(async (element) => {
        const password2 = await decryption(element.mot_de_passe, password);

        if (elem.id > element.id && password1 === password2) {
          hasDuplicates = true;

          const tableBody = document.querySelector('#duplicatePassword tbody');
          const ligneDoublon = document.createElement('tr');
          ligneDoublon.innerHTML = `
            <td>${elem.site}</td>
            <td>${element.site}</td>
            <td>${password1}</td>
          `;
          tableBody.appendChild(ligneDoublon);
        }
      }));
    }));

    if (!hasDuplicates) {
      const tableBody = document.querySelector('#duplicatePassword tbody');
      const ligneDoublon = document.createElement('tr');
      ligneDoublon.innerHTML = `
        <td colspan="3">Aucun mot de passe en doublon.</td>
      `;
      tableBody.appendChild(ligneDoublon);
    }
  } catch (error) {
    Navigate('/500');
  }
}

// Fonction pour récupérer la liste des sites
async function getlist() {
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: getAuthenticatedUser().username }),
  };

  const response = await fetch(`${process.env.API_BASE_URL}/sites/orderBySiteName`, option);

  // Vérifier si la requête a réussi, sinon rediriger vers la page d'erreur 500
  if (!response.ok) {
    Navigate('/500');
  }

  // Convertir la réponse en format JSON et la renvoyer
  const list = await response.json();
  return list;
}

export default afficherDuplicatePassword;
