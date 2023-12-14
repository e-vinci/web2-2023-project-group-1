/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-extraneous-dependencies
import Tent from '../../img/tente.png';
import WoodenHouse from '../../img/maisonBois.png';
import Home from '../../img/home.png';
import Castle from '../../img/Chateau.png';

const generator = require('generate-password-browser');

const modalGenerator = `
<div class="modal fade modal-lg" id="modalGenerator" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modalGeneratorLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Génération de mot de passe</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                  </button>
              </div>
              <div class="modal-body w-100" id="inner-modal">
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Fermer</button>
              </div>
          </div>
      </div>
    </div>
`;

const generatorForm = `
<div class="image-container" style=" margin-top: 30px; position: absolute; width: 20%;">
            <img id="tent_id" src="${Tent}" style="width: 100%; " >
            <img id="woodenHouse_id" src="${WoodenHouse}" style="display: none; width: 100%;" >
            <img id="home_id" src="${Home}" style="display: none; width: 100%;" >
            <img id="castle_id" src="${Castle}" style="display: none; width: 100%;" >
</div>

<section class="generate d-flex align-items-center justify-content-center">
  <form id="generate-form"  style="text-align: left;">
    <div bis_skin_checked="1" >
    

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
          <input class="btn btn-primary" type="submit" value="Générer">
          <input class="btn btn-success" type="button" value="Copier" name="copy" id="copy-button">
        </div>
        <div id="generate-password" bis_skin_checked="1" id="generate-button"></div>
      </div>
    </form>
  </section>
`;

const displayImage = (rangeValue) => {
    const tent = document.getElementById("tent_id");
    const woodenHouse = document.getElementById("woodenHouse_id");
    const home = document.getElementById("home_id");
    const castle = document.getElementById("castle_id");

    if (rangeValue >= 0 && rangeValue <= 10) {
        tent.style.display = 'block';
        woodenHouse.style.display = 'none';
        home.style.display = 'none';
        castle.style.display = 'none';
    } else if (rangeValue <= 15) {
        tent.style.display = 'none';
        woodenHouse.style.display = 'block';
        home.style.display = 'none';
        castle.style.display = 'none';
    } else if (rangeValue <= 22) {
        tent.style.display = 'none';
        woodenHouse.style.display = 'none';
        home.style.display = 'block';
        castle.style.display = 'none';
    } else {
        tent.style.display = 'none';
        woodenHouse.style.display = 'none';
        home.style.display = 'none';
        castle.style.display = 'block';
    }
};

const listenersGeneratorPassword = () => {
    const generateForm = document.querySelector('#generate-form');
    const generatePassword = document.querySelector('#generate-password');
    const charCount = document.querySelector('#char-count');

    generateForm.addEventListener('input', () => {
        const rangeValue = document.querySelector('#generate-length').value;
        charCount.textContent = rangeValue;

        displayImage(parseInt(rangeValue, 10));
    });


    generateForm.addEventListener('submit', event => {
        event.preventDefault();
        const passwordToText = generator.generate({
            length: parseInt(event.target['generate-length'].value, 10),
            uppercase: event.target['generate-include-uppercase'].checked,
            numbers: event.target['generate-include-numbers'].checked,
            symbols: event.target['generate-include-symbols'].checked,
        });
        generatePassword.className = 'rounded border-1 border-secondary border p-3 m-3';
        generatePassword.innerHTML = `${passwordToText}`;
    });

    const copyButton = document.querySelector('#copy-button');

    copyButton.addEventListener('click', () => {
        const generatedPassword = generatePassword.textContent;
        copyToClipboard(generatedPassword);
    });


    async function copyToClipboard(text) {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        await navigator.clipboard.writeText(text);
        document.body.removeChild(textarea);
    }

}

const renderGeneratorPassword = () => {
    const modalGeneratorWrapper = document.querySelector('#modalWrapper');
    modalGeneratorWrapper.innerHTML += modalGenerator;
    const innerModal = document.querySelector('#inner-modal');
    innerModal.innerHTML = generatorForm;
    listenersGeneratorPassword();
}

export {
    listenersGeneratorPassword,
    renderGeneratorPassword,
}