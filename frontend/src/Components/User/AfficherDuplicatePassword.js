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
const rightDiv=document.querySelector('.right');
rightDiv.innerHTML=checkDuplicatePassword;;
    const list = await getlist();
    console.log(list.length);
    if(list.length!==0){
      list.forEach(element => {
      console.log(element);
      duplicate(list,element,password)
      
    });}else{
           const line=document.querySelector('#duplicatePassword')
            const ligneDoublon = document.createElement('td');
            ligneDoublon.innerHTML = `
              Aucun mot de passe en doublon.
            `;
            line.appendChild(ligneDoublon);
    }
    
  };


async function getlist() {
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username: getAuthenticatedUser().username }),
  };

  const response = await fetch('/api/sites/orderBySiteName', option);
  if (!response.ok) {
    console.log("Error can't access the list because response is not ok");
  }
  const list = await response.json();
  return list;
}

async function duplicate(list, elem,password){  
    const password1=await decryption(elem.mot_de_passe,password);
    const password2=await decryption(elem.mot_de_passe,password)
  list.forEach(element => {
      if (elem.id>element.id && password1  === password2) {
         const line=document.querySelector('#duplicatePassword')
            const ligneDoublon = document.createElement('td');
            ligneDoublon.innerHTML = `
        " ${elem.site}  "="  ${element.site} "    avec comme mot de passe : ${password1}
            `;
            line.appendChild(ligneDoublon);
          }
  });



}


export default afficherDuplicatePassword ;
