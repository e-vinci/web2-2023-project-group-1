/* eslint-disable*/
const Password = require('password-npm');
import clipboard from '../../img/clipboard.png';

const GeneratePassword = () => {
    const main = document.querySelector('main');
    main.innerHTML = `
    <h2 style="text-align: center;">Generate Password</h2>
    <section class="generate d-flex align-items-center justify-content-center">
        <form id="generate-form" class="p-3 shadow p-3 m-5 mb-5 bg-body-tertiary rounded border-top border-primary border-3 col-md-4 pt-5 pb-5" style="text-align: center;">
            <div class=" pt-1 pb-1">
                <input type="number" id="generate-length" name="generate-length" min="8" max="128" value="8" required>
                <label for="generate-length">Nombre de caractères</label>
            </div>
            <div class=" pt-1 pb-1">
                <input type="checkbox" id="generate-include-lowercase" name="generate-include-lowercase" checked>
                <label for="generate-include-lowercase">Avec des minuscule</label>
            </div>
            <div class=" pt-1 pb-1">
              <input type="checkbox" id="generate-include-uppercase" name="generate-include-uppercase">
                <label for "generate-include-uppercase">Avec des majuscules</label>
            </div>
            <div class=" pt-1 pb-1">
                <input type="checkbox" id="generate-include-numbers" name="generate-include-numbers">
                <label for="generate-include-numbers">Avec des chiffres</label>
            </div>
            <div class=" pt-1 pb-1">
                <input type="checkbox" id="generate-include-symbols" name="generate-include-symbols">
                <label for="generate-include-symbols">Avec des symboles</label>
            </div>
            <input type="submit" value="Créer votre mot de passe">
            <div id="generate-password"></div>
        </form>
    </section>
    `;

    const script = document.createElement('script');
    script.innerHTML = `
      function myFunction() {
        var copyText = document.getElementById("generate-password");
        console.log(copyText);
        copyText.select();
        copyText.setSelectionRange(0, 99999)
        document.execCommand("copy");
        alert("Copied the text: " + copyText.value);
      }
    `;

    const generateForm = document.querySelector('#generate-form');
    const generatePassword = document.querySelector('#generate-password');
    const body = document.querySelector('body');
    body.appendChild(script);

    generateForm.addEventListener('submit', event => {
      event.preventDefault();
      const length = parseInt(event.target['generate-length'].value, 10);
      const includeLowercase = event.target['generate-include-lowercase'].checked;
      const includeUppercase = event.target['generate-include-uppercase'].checked;
      const includeNumbers = event.target['generate-include-numbers'].checked;
      const includeSymbols = event.target['generate-include-symbols'].checked;
      const password = new Password(length, includeLowercase, includeUppercase, includeNumbers, includeSymbols);
      body.appendChild(script);
      generatePassword.className = 'rounded border-1 border-secondary border p-3 m-3';
      generatePassword.innerHTML= `${password.random()} <button onclick="myFunction()"><img src="${clipboard}" alt="clipboard" id="clipboard" style="width: 20px; height: 20px;"></button>`;
    });


};
  
export default GeneratePassword;
  