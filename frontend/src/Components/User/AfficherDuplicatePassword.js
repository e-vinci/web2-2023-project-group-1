const { decryption } = require("../../utils/cryptPassword");


const checkDuplicatePassword = `
<section class="w-75 p-3 mx-auto">
  <table id="duplicatePassword" class="table table-striped table-hover">
    <thead>
        <tr class="border border-dark">
            <th id="nomSite1">Nom du site 1 </th>
            <th id="password1">Mots de passe</th>
            <th id="nomSite2">Nom du site 2</th>
            <th id="password2">Mots de passe</th>

        </tr>
    </thead>
    <tbody id="duplicatePassword">
    </tbody>
  </table>
</section>
`;


function afficherDuplicatePassword() {
    const tab = document.querySelector('.leftSide');
    const block=document.createElement('div')
    const duplicata=document.createElement('button');
    duplicata.innerHTML='Afficher les mot de passe dupliquer';
    duplicata.setAttribute('type', 'button');
    duplicata.setAttribute('class', 'btn btn-secondary btn-lg btn-block');
    block.appendChild(duplicata);
    tab.appendChild(block);
    const checker = document.createElement('div');
       duplicata.addEventListener('click', async (event) => {
        block.innerHTML='';
         checker.innerHTML = checkDuplicatePassword;
        tab.appendChild(checker);
        const list=getlist();
        const password='patate';
        for (const elem of list){
          for(const elem1 of list){
if(elem.id < elem1.id ){
  if(decryption(elem.mot_de_passe)=== decryption(elem.mot_de_passe)){

  ligneDoublon=document.createElement('div');
  ligneDoublon.innerHTML='Site doublé:'+ elem1.site +' = '+elem.site
  }
}
          }

        }



        console.log('Button clicked:', event.site);
      } );
   
}



     async function  getlist(){
const option = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ username: getAuthenticatedUser().username }),
};

const response = await fetch('/api/sites/orderBySiteName', option);
  if (!response.ok) {
      console.log('Error can\'t access the list because response is not ok');
  }
  const list =await response.json();
  return list;
}


module.exports = {
    afficherDuplicatePassword
};