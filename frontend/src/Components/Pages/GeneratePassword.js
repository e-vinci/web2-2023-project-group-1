const Password = require('password-npm');

const GeneratePassword = () => {
  const main = document.querySelector('main');
  main.innerHTML = `
  <h2 style="text-align: center;">Generate Password</h2>
  <section class="generate d-flex align-items-center justify-content-center">
    <form id="generate-form" class="p-3 shadow p-3 m-5 mb-5 bg-body-tertiary rounded border-top border-primary border-3 col-md-4 pt-5 pb-5" style="text-align: left;">
      <div bis_skin_checked="1">
          <div class=" pt-1 pb-1" bis_skin_checked="1">
              <label for="generate-length">Nombre de caractères : </label>
              <span id="char-count">5</span>
          </div>
          <div class="pt-1 pb-1 range-container" style="display: flex; flex-direction: column;" bis_skin_checked="1">
              <input type="range" id="generate-length" name="generate-length" min="1" max="30" value="5">
          </div>
          <div class=" pt-1 pb-1" bis_skin_checked="1">
              <input type="checkbox" id="generate-include-uppercase" name="generate-include-uppercase">
              <label for="" "generate-include-uppercase"="">Avec des majuscules</label>
          </div>
          <div class=" pt-1 pb-1" bis_skin_checked="1">
              <input type="checkbox" id="generate-include-numbers" name="generate-include-numbers">
              <label for="generate-include-numbers">Avec des chiffres</label>
          </div>
          <div class=" pt-1 pb-1" bis_skin_checked="1">
              <input type="checkbox" id="generate-include-symbols" name="generate-include-symbols">
              <label for="generate-include-symbols">Avec des symboles</label>
          </div>
          <div bis_skin_checked="1">
            <input type="submit" value="Générer">
            <input type="button" value="Copier" name="copy" id="copy-button">
          </div>
          <div id="generate-password" bis_skin_checked="1" id="generate-button"></div>
        </div>
      </form>
    </section>
    `;

  const generateForm = document.querySelector('#generate-form');
  const generatePassword = document.querySelector('#generate-password');
  const charCount = document.querySelector('#char-count'); // Sélectionnez l'élément pour le nombre de caractères

  // Écoutez le changement de valeur de la plage (range)
  generateForm.addEventListener('input', () => {
    const rangeValue = document.querySelector('#generate-length').value;
    charCount.textContent = rangeValue; // Mettez à jour le texte avec la valeur de la plage
  });

  generateForm.addEventListener('submit', event => {
    event.preventDefault();
    const length = parseInt(event.target['generate-length'].value, 10);
    const includeUppercase = event.target['generate-include-uppercase'].checked;
    const includeNumbers = event.target['generate-include-numbers'].checked;
    const includeSymbols = event.target['generate-include-symbols'].checked;
    const password = new Password(length, true, includeUppercase, includeNumbers, includeSymbols);
    generatePassword.className = 'rounded border-1 border-secondary border p-3 m-3';
    generatePassword.innerHTML = `${password.random()}`;
  });

  const copyButton = document.querySelector('#copy-button');

  copyButton.addEventListener('click', () => {
    const generatedPassword = generatePassword.textContent;
    copyToClipboard(generatedPassword);
  });
  

  function copyToClipboard(text) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
};

export default GeneratePassword;