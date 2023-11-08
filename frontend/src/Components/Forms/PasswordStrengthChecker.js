/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
const { passwordStrength } = require('check-password-strength');

const checkerForm = `
<h1 class="text-center m-5">Vérificateur de mot de passe</h1>
<p class="text-center" >Vous pensez que votre mot de passe est sécurisé ? Vérifier le içi.</p>
<section class="d-flex justify-content-center p-5">
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

        const val = passwordStrengthResult.value;
        let resultHTML;
        if (val === 'Too weak') {
            resultHTML = `<p style="color: red;">Trop faible</p>`;
        } else if (val === 'Weak') {
            resultHTML = `<p style="color: orange;">Faible</p>`;
        } else if (val === 'Medium') {
            resultHTML = `<p style="color: yellow;">Moyen</p>`;
        } else if (val === 'Strong') {
            resultHTML = `<p style="color: green;">Fort</p>`;
        }      
        checkerResult.innerHTML = 'La puissance de votre mot de passe : ';
        checkerResult.innerHTML += resultHTML;

        checkerAdvice.innerHTML = 'Nos conseil pour améliorer votre mot de passe : ';
        const advices = passwordStrengthResult.contains;
        const advicesList = advicesToArray(advices, passwordToCheck);
        
        if (advicesList.length === 0) {
          checkerAdvice.innerHTML = 'Votre mot de passe est sécurisé';
        } else {
          const advicesHTML = `
          <ul>
            ${advicesList.map(advice => `<li>${advice}</li>`).join('')}
          </ul>
          `;
          checkerAdvice.innerHTML += advicesHTML;
        }

        const option = {
            method: 'POST',
            body: JSON.stringify({
                "password": passwordToCheck,
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
        const response = fetch('/api/leaderboard/addLeaderboard', option);
        if (!response.ok) {
            console.log('Une erreur est survenue');
        }
    });
    
}

/**
 * create a list of advice to improve the password
 * @param {Array} array list of different type of character in the password
 * @param {*} password the password to check
 * @returns {Array} list of advice to improve the password
 */
function advicesToArray(array, password) {
  const advicesList = [];
  if (!array.includes('uppercase')) {
    advicesList.push('Ajouter des majuscules');
  }
  if (!array.includes('lowercase')) {
    advicesList.push('Ajouter des minuscules');
  }
  if (!array.includes('number')) {
    advicesList.push('Ajouter des chiffres');
  }
  if (!array.includes('symbol')) {
    advicesList.push('Ajouter des caractères spéciaux');
  }
  if (password.length < 8) {
    advicesList.push('Ajouter des caractères');
  }
  return advicesList;
}

const renderPasswordStrengthChecker = () => {
  const checker = document.querySelector('.checker');
  checker.innerHTML = checkerForm;
  listenersPasswordStrengthChecker();
}

module.exports = { 
  renderPasswordStrengthChecker
};