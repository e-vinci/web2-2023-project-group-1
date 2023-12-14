/* eslint-disable no-restricted-syntax */
/* eslint-disable no-self-compare */
import { decryption } from '../../utils/cryptPassword';
import { getAuthenticatedUser } from '../../utils/auths';

const checkDuplicatePassword = `
<section class="d-flex align-items-center justify-content-center">
  <table id="duplicatePassword" class="table table-striped table-hover">
    <thead>
    <td> Liste des sites doublé :</td>
        
    </thead>
    </tbody>
  </table>
</section>
`;
async function afficherDuplicatePassword(password) {
  const rightDiv = document.querySelector('.right');
  rightDiv.innerHTML = checkDuplicatePassword;
  const list = await getlist();
  console.log(list.length);

  let hasDuplicates = true;

  if (list.length !== 0) {
    try {
      await Promise.all(
        list.map(async (elem) => {
          const password1 = await decryption(elem.mot_de_passe, password);

          await Promise.all(
            list.map(async (element) => {
              const password2 = await decryption(element.mot_de_passe, password);

              if (elem.id > element.id && password1 === password2) {
                console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
                hasDuplicates = false;
                console.log(hasDuplicates);

                const line = document.querySelector('#duplicatePassword');
                const ligneDoublon = document.createElement('tr');
                ligneDoublon.innerHTML = `
              " ${elem.site} "=" ${element.site}" avec comme mot de passe : ${password1}
            `;
                line.appendChild(ligneDoublon);
              }
            }),
          );
        }),
      );
    } catch (error) {
      console.error(error);
    }
  }

  console.log('?????????????????????????????????????');
  console.log(hasDuplicates);

  if (hasDuplicates) {
    console.log('?????????????????????????????????????');
    console.log(hasDuplicates);

    const line = document.querySelector('#duplicatePassword');
    const ligneDoublon = document.createElement('td');
    ligneDoublon.innerHTML = `
      Aucun mot de passe en doublon.
    `;
    line.appendChild(ligneDoublon);
  }
}


async function getlist() {
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: getAuthenticatedUser().username }),
  };

  const response = await fetch(`${process.env.API_BASE_URL}/sites/orderBySiteName`, option);
  if (!response.ok) {
    console.log("Error can't access the list because response is not ok");
  }
  const list = await response.json();
  return list;
}

export default afficherDuplicatePassword;
