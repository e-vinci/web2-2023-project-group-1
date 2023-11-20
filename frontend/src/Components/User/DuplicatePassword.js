


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


async function afficherDupliatePassword() {
    const tab = document.querySelector('.leftSide');
    const checker = document.querySelector('#duplicatePassword');
    checker.innerHTML = checkDuplicatePassword;
    tab.appendChild(checker);
}



module.exports = {
    afficherDupliatePassword
};