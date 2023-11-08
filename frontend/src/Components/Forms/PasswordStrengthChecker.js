/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
const { passwordStrength } = require('check-password-strength');

const checkerForm = `
<h1 class="text-center m-5">Vérificateur de mot de passe</h1>
<p class="text-center" >Vous pensez que votre mot de passe est sécurisé ? Vérifier le içi.</p>
<section class="d-flex justify-content-center border border-primary p-5">
  <form id="checker-form" style="text-align: left;">
    <div bis_skin_checked="1">
      <div class=" pt-1 pb-1" bis_skin_checked="1">
        <input type="text" class="form-control custom-input" id="checker-password" name="checker-password">
      </div>
      </div>
      <div bis_skin_checked="1">
        <input type="submit" value="Vérifier">
      </div>
      <div class="d-flex justify-content-center">
        <div id="checker-result" class="px-5 p-3" bis_skin_checked="1">La puissance de votre mot de passe : </div>
        <div id="checker-advice" class="px-5 p-3" bis_skin_checked="1">Nos conseil pour améliorer votre mot de passe : </div>
      </div>
    </div>
  </form>
</section>
`;

const listenersPasswordStrengthChecker = () => {
    const checker = document.querySelector('#checker-form');
    const checkerResult = document.querySelector('#checker-result');
    const checkerAdvice = document.querySelector('#checker-advice');
    
    checker.addEventListener('submit', event => {
        event.preventDefault();
        const passwordToCheck = event.target['checker-password'].value;

        if (passwordToCheck === '') {
          alert('Veuillez entrer un mot de passe');
          return;
        }

        const passwordStrengthResult = passwordStrength(passwordToCheck);

        let val = passwordStrengthResult.value;
        if (val === 'Too weak') {
            val = 'Trop faible';
        } else if (val === 'Weak') {
            val = 'Faible';
        } else if (val === 'Medium') {
            val = 'Moyen';
        } else if (val === 'Strong') {
            val = 'Fort';
        }
        const resultHTML = `
          <p>${val}</p>
        `;        
        checkerResult.innerHTML = 'La puissance de votre mot de passe : ';
        checkerResult.innerHTML += resultHTML;

        checkerAdvice.innerHTML = 'Nos conseil pour améliorer votre mot de passe : ';
        const advices = passwordStrengthResult.contains;
        const advicesList = [];
        if (!advices.includes('uppercase')) {
          advicesList.push('Ajouter des majuscules');
        }
        if (!advices.includes('lowercase')) {
          advicesList.push('Ajouter des minuscules');
        }
        if (!advices.includes('number')) {
          advicesList.push('Ajouter des chiffres');
        }
        if (!advices.includes('symbol')) {
          advicesList.push('Ajouter des caractères spéciaux');
        }
        if (passwordToCheck.length < 8) {
          advicesList.push('Ajouter des caractères');
        }
        advicesList.forEach(e => {
            checkerAdvice.innerHTML +=  `<p>${e}</p>`;
        });

        // front to back
        const option = {
            method: 'POST',
            body: JSON.stringify({
                "password": passwordToCheck,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        // ajouter await
        const response = fetch('/api/leaderboard/addLeaderboard', option);
        if (!response.ok) {
            console.log('Une erreur est survenue');
        }
    });
    
}

const renderPasswordStrengthChecker = () => {
  const checker = document.querySelector('.checker');
  checker.innerHTML = checkerForm;
  listenersPasswordStrengthChecker();
}

module.exports = { 
  renderPasswordStrengthChecker
};