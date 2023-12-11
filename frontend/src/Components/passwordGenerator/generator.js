/* eslint-disable import/no-unresolved */
// eslint-disable-next-line import/no-extraneous-dependencies
import Tente from '../../img/tente.png';
import MaisonBois from '../../img/maisonBois.png';
import Maison from '../../img/home.png';
import Chateau from '../../img/Chateau.png';

const generator = require('generate-password-browser');

const modalGenerator = `
<div class="modal fade" id="modalGenerator" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modalGeneratorLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Génération de mot de passe</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                  </button>
              </div>
              <div class="modal-body w-100" id="inner-modal">
              </div>
              <div class="modal-footer">
                  <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              </div>
          </div>
      </div>
    </div>
`;

const generatorForm = `
<div class="image-container" style=" margin-top: 30px; position: absolute; width: 20%;">
            <img id="tente" src="${Tente}" style="width: 100%; " >
            <img id="maisonBois" src="${MaisonBois}" style="display: none; width: 100%;" >
            <img id="Maison" src="${Maison}" style="display: none; width: 100%;" >
            <img id="Chateau" src="${Chateau}" style="display: none; width: 100%;" >
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
          <input type="submit" value="Générer">
          <input type="button" value="Copier" name="copy" id="copy-button">
        </div>
        <div id="generate-password" bis_skin_checked="1" id="generate-button"></div>
      </div>
    </form>
  </section>
`;

const displayImage = (rangeValue) => {
    const tente = document.getElementById("tente");
    const maisonBois = document.getElementById("MaisonBois");
    const maison = document.getElementById("Maison");
    const chateau = document.getElementById("Chateau");

    if (rangeValue >=0 && rangeValue <= 10) {
        tente.style.display = 'block';
        maisonBois.style.display = 'none';
        maison.style.display = 'none';
        chateau.style.display = 'none';
    } else if (rangeValue <= 15) {
        tente.style.display = 'none';
        maisonBois.style.display = 'block';
        maison.style.display = 'none';
        chateau.style.display = 'none';
    } else if (rangeValue <= 22) {
        tente.style.display = 'none';
        maisonBois.style.display = 'none';
        maison.style.display = 'block';
        chateau.style.display = 'none';
    } else {
        tente.style.display = 'none';
        maisonBois.style.display = 'none';
        maison.style.display = 'none';
        chateau.style.display = 'block';
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