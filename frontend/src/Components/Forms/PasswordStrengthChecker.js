/* eslint-disable no-alert */
/* eslint-disable import/no-import-module-exports */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */

import Navigate from '../Router/Navigate';

import TresFaible from '../../img/Angry.gif';
import Faible from '../../img/NotHappy.gif';
import Moyen from '../../img/Middle_happy.gif';
import Fort from '../../img/Happyyy.gif';

const { passwordStrength } = require('check-password-strength');

const checkerForm = `
<section id="checkerForm" class="pb-5 pl-5 pr-5 pt-3 shadow p-3 mb-5 bg-body-tertiary rounded border-top border-primary border-3">
  <h1 class="text-center m-5">Vérificateur de mot de passe</h1>

  <div class="text-center">
    <p>Vous pensez que votre mot de passe est sécurisé ? </p>
    <p>Vérifiez le <span>\u{1F447}</span></p>
  </div>
  
  <div class="container">
    <div class="row">
      <div class="col-md-2">
        <section id="image-container" style="margin-left: 0.5%; width: 7%; position: absolute;">
          <img id="tresfaible" src="${TresFaible}" style="display: none; width: 100%;" >
          <img id="faible" src="${Faible}" style="display: none; width: 100%;" >
          <img id="moyen" src="${Moyen}" style="display: none; width: 100%;" >
          <img id="fort" src="${Fort}" style="display: none; width: 100%;" >
        </section>
      </div>
 
      <div class="col-md-12 ms-auto">
        <section class="d-flex justify-content-center pb-5 pt-2">
          <form id="checker-form" class="mb-3 justify-content-center">
            <div class="mb-4">
              <div class="pt-1 pb-1">
                <input type="password" class="form-control custom-input" id="checker-password" name="checker-password">
                <input type="checkbox" id="checkbox-checker" ><label for="checker-password">Afficher le mot de passe</label>
              </div>
            </div>
            <div class="d-flex align-items-center justify-content-center">
              <button type="submit" id="testingFormSubmit" class="btn btn-primary">Vérifier</button>
            </div>
            <div class="d-flex mt-3 justify-content-center">
              <p id="checker-result" class="5px p-3">La puissance de votre mot de passe : </p>
              <p id="checker-advice" class="px-5 p-3">Nos conseils pour améliorer votre mot de passe : </p>
            </div>
          </form>
        </section>
      </div>
    </div>
  </div>
</section>
`;

const displayGif = (passwordStrengthValue) => {
  const tresFaible = document.getElementById("tresfaible");
  const faible = document.getElementById("faible");
  const moyen = document.getElementById("moyen");
  const fort = document.getElementById("fort");

  tresFaible.style.display = 'none';
  faible.style.display = 'none';
  moyen.style.display = 'none';
  fort.style.display = 'none';

  switch (passwordStrengthValue) {
    case 'Too weak':
      tresFaible.style.display = 'block';
      break;
    case 'Weak':
      faible.style.display = 'block';
      break;
    case 'Medium':
      moyen.style.display = 'block';
      break;
    case 'Strong':
      fort.style.display = 'block';
      break;
    default:
      break;
  }
};

const listenersPasswordStrengthChecker = () => {
  const form = document.querySelector('#checker-form');
  const checkerResult = document.querySelector('#checker-result');
  const checkerAdvice = document.querySelector('#checker-advice');

  const checkbox = document.querySelector('#checkbox-checker');

  checkbox.addEventListener('click', () => {
    if (checkbox.checked) {
      document.querySelector('#checker-password').type = 'text';
    } else {
      document.querySelector('#checker-password').type = 'password';
    }
  });


  form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const passwordToCheck = document.querySelector('#checker-password').value;

    if (passwordToCheck === '') {
      alert('Veuillez entrer un mot de passe');
      return;
    }

    addPasswordToLeaderboard(passwordToCheck);

    const passwordStrengthResult = passwordStrength(passwordToCheck);

    const val = passwordStrengthResult.value;
    const resultHTML = toFrench(val);
    checkerResult.innerHTML = 'La puissance de votre mot de passe : ';
    checkerResult.innerHTML += resultHTML;

    checkerAdvice.innerHTML = 'Nos conseils pour améliorer votre mot de passe : ';
    const advices = passwordStrengthResult.contains;
    const advicesList = advicesToArray(advices, passwordToCheck, val);

    if (advicesList.length === 0 && val === 'Strong') {
      checkerAdvice.innerHTML = 'Votre mot de passe est sécurisé';
    } else {
      const advicesHTML = `
        <ul>
          ${advicesList.map(advice => `<li>${advice}</li>`).join('')}
        </ul>
      `;
      checkerAdvice.innerHTML += advicesHTML;
    }

    displayGif(passwordStrengthResult.value);
  });
};

function toFrench(string) {
  if (string === 'Too weak') {
    return `<p style="color: red; font-weight: bold;">Trop faible</p>`;
  }
  if (string === 'Weak') {
    return `<p style="color: orange; font-weight: bold;">Faible</p>`;
  }
  if (string === 'Medium') {
    return `<p style="color: #FFD700;  font-weight: bold;">Moyen</p>`;
  }
  return `<p style="color: green; font-weight: bold;">Fort</p>`;
}

function advicesToArray(array, password, val) {
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
  if (password.length < 8 || val !== 'Strong') {
    advicesList.push('Ajouter plus de caractères');
  }
  return advicesList;
}

async function addPasswordToLeaderboard(password) {

  const option = {
    method: 'POST',
    body: JSON.stringify({
      password
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(`${process.env.API_BASE_URL}/leaderboard/addLeaderboard`, option);
  if (!response.ok) {
    Navigate('/500');
  }
}



export {
  checkerForm,
  listenersPasswordStrengthChecker
};