const modalAbout = `
<div class="modal fade modal-lg" id="modalAbout" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modalAboutLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">A propos</h5>
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

const text = `
<h5>À propos de notre gestionnaire de mots de passe</h5>
<p>
    Bienvenue sur notre gestionnaire de mots de passe, un outil multifonction conçu pour simplifier la gestion de vos informations de connexion tout en garantissant 
    la sécurité de vos données. Notre site web offre trois fonctionnalités principales :
</p>
<h6>1. Générateur de Mots de Passe</h6>
<p>
    Notre générateur de mots de passe puissant crée des mots de passe forts et uniques en fonction de vos besoins. Vous pouvez personnaliser la longueur, 
    la complexité et même inclure des caractères spéciaux pour renforcer la sécurité de vos comptes en ligne.
</p>
<h6>2. Testeur de Mots de Passe</h6>
<p>
    Vous pouvez vérifier la robustesse de vos mots de passe actuels en les soumettant à notre testeur de mots de passe. 
    Il vous indiquera leur niveau de sécurité et vous recommandera d'apporter des modifications si nécessaire pour renforcer votre protection en ligne.
</p>
<h6>3. Gestionnaire de Mots de Passe</h6>
<p>
    Notre gestionnaire de mots de passe vous permet de stocker en toute sécurité vos informations de connexion, 
    garantissant qu'elles restent confidentielles et inaccessibles aux autres. Nous utilisons le chiffrement AES-512 pour protéger vos données sensibles, 
    ce qui signifie que vos mots de passe sont stockés en toute sécurité et ne peuvent être déchiffrés que par vous.
</p>
<p>
    La sécurité en ligne est essentielle, et notre outil a été conçu avec cela à l'esprit. 
    Nous nous engageons à vous aider à gérer vos mots de passe de manière sécurisée et à vous offrir des fonctionnalités fiables pour renforcer votre cybersécurité. 
    N'hésitez pas à explorer nos services et à tirer parti de ces fonctionnalités pour une expérience en ligne plus sécurisée.
</p>
`;

const renderAbout = () => {
    const modalAboutWrapper = document.querySelector('#modalAboutWrapper');
    modalAboutWrapper.innerHTML += modalAbout;
    const innerModal = document.querySelector('#inner-modal');
    innerModal.innerHTML = text;
}

module.exports = {
    renderAbout
}