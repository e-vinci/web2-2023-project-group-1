/* eslint-disable no-alert */
/* eslint-disable import/no-import-module-exports */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
import tente from '../../img/Tres_faible.gif';
import Faible from '../../img/Faible.gif';
import Moyen from '../../img/Moyen.gif';
import Fort from '../../img/Fort.gif';

const { passwordStrength } = require('check-password-strength');

const checkerForm = `
  <div class="p-3 mb-2" style="background-color: #7F5056; color: white; margin: 10px 200px 20px 200px;" src="https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js">
    <h1 id="backround" class="text-center m-5 ">Vérification de mot de passe</h1>
  </div>

  <div class="text-center m-4" style="font-size: 30px;">
    <p>Vous pensez que votre mot de passe est sécurisé ? </p>
    <p>Vérifiez le <span>\u{1F447}</span></p>
  </div>
  
  <div class="image-container" style=" margin-left: 15%; position: absolute; width: 10%;">
    <img id="tresfaible" src="${tente}" style="display: none;width: 100%; " >
    <img id="faible" src="${Faible}" style="display: none; width: 100%;" >
    <img id="moyen" src="${Moyen}" style="display: none; width: 100%;" >
    <img id="fort" src="${Fort}" style="display: none; width: 100%;" >
  </div>

  <section class="d-flex justify-content-center p-5 "  style="margin-top: -40px;">
    <form id="checker-form" style="text-align: left;">
      <div bis_skin_checked="1">
        <div class="pt-1 pb-1" bis_skin_checked="1">
          <input type="text" class="form-control custom-input" id="checker-password" name="checker-password">
        </div>
      </div>
      <div bis_skin_checked="1">
        <input type="submit" value="Vérifier" >
      </div>
  
      <div class="d-flex justify-content-center">
        <div id="checker-result" class="5px p-3" bis_skin_checked="1">La puissance de votre mot de passe : </div>
        <div id="checker-advice" class="px-5 p-3" bis_skin_checked="1">Nos conseil pour améliorer votre mot de passe : </div>
      </div>
      
    </div>
  </form>
</section>
`;

const displayImage = (passwordStrengthValue) => {
  const tresFaible = document.getElementById("tresfaible");
  const faible = document.getElementById("faible");
  const moyen = document.getElementById("moyen");
  const fort = document.getElementById("fort");

  // Affichez l'image correspondante en fonction de la force du mot de passe
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
      // Aucune correspondance, ne rien faire
      break;
  }
};
/**
 * add listeners to the password strength checker
 */
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

    // Appelez la fonction displayImage pour gérer le changement d'image
    displayImage(passwordStrengthResult.value);
  });
};

/**
 * convert the password strength in English to French
 * @param {String} string the password strength in English
 * @returns {String} the password strength in French
 */
function toFrench(string) {
  if (string === 'Too weak') {
    return `<p style="color: red; font-weight: bold;">Trop faible</p>`;
  }
  if (string === 'Weak') {
    return `<p style="color: orange; font-weight: bold;">Faible</p>`;
  }
  if (string === 'Medium') {
    return `<p style="color: yellow; font-weight: bold;">Moyen</p>`;
  }
  return `<p style="color: green; font-weight: bold;">Fort</p>`;
}

/**
 * create a list of advice to improve the password
 * @param {Array} array list of different types of characters in the password
 * @param {*} password the password to check
 * @returns {Array} list of advice to improve the password
 */
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
    advicesList.push('Ajouter des caractères');
  }
  return advicesList;
}

/**
 * render the password strength checker
 */
const renderPasswordStrengthChecker = () => {
  const checker = document.querySelector('.checker');
  checker.innerHTML = checkerForm;
  listenersPasswordStrengthChecker();
};

export {
  renderPasswordStrengthChecker, displayImage
}