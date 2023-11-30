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
        console.log('Button clicked:', event.site);
      } );
   
}



module.exports = {
    afficherDuplicatePassword
};