const modalGDPR = `
<div class="modal fade modal-lg" id="modalGDPR" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modalGDPRLabel" aria-hidden="true">
      <div class="modal-dialog" role="document">
          <div class="modal-content">
              <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Politique de Confidentialité et de Protection des Données</h5>
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
<h5>Dernière mise à jour : [17/12/2023]</h5>
<p>
    Bienvenue sur Don't Hack Me, le service de vérification de mots de passe. Chez Don't Hack Me, 
    nous accordons une grande importance à la protection de vos données personnelles et nous nous engageons à respecter votre vie privée conformément au Règlement général sur la protection des données (RGPD).
</p>
<h6>1. Collecte des Données</h6>
<p>
    Lorsque vous utilisez notre service, nous pouvons collecter certaines informations, y compris des mots de passe que vous choisissez de vérifier. 
    Cependant, soyez assuré que nous ne stockons pas ces mots de passe ni ne les associons à des identifiants personnels.
</p>
<h6>2. Utilisation des Données</h6>
<p>
    Les données collectées sont utilisées exclusivement dans le but de fournir le service de vérification de mots de passe. 
    Nous n'utilisons pas vos données à des fins publicitaires ni ne les partageons avec des tiers sans votre consentement explicite.
</p>
<h6>3. Sécurité des Données</h6>
<p>
    Nous prenons des mesures techniques et organisationnelles appropriées pour assurer la sécurité de vos données personnelles. 
    Cela inclut la protection contre l'accès non autorisé, la divulgation, l'altération et la destruction des données.
</p>
<h6>4. Droits des Utilisateurs</h6>
<p>
    Vous avez le droit d'accéder à vos données personnelles, de les rectifier, de les supprimer ou de vous opposer à leur traitement. 
</p>
<h6>5. Cookies et Technologies Similaires</h6>
<p>
    Nous utilisons des cookies et des technologies similaires pour améliorer votre expérience sur notre site. 
    Vous pouvez gérer les préférences de cookies dans les paramètres de votre navigateur.
</p>
<h6>6. Modifications de la Politique de Confidentialité</h6>
<p>
    Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment. 
    Toute modification sera signalée sur cette page. Nous vous encourageons à consulter régulièrement cette politique pour rester informé.
</p>
<p>
    En utilisant Don't Hack Me, vous acceptez les termes de cette politique de confidentialité. 
</p>
<p>
    Merci de faire confiance à Don't Hack Me pour la protection de vos données personnelles.
</p>
`;

const renderGDPR = () => {
    const modalGPDRWrapper = document.querySelector('#modalGDPRWrapper');
    modalGPDRWrapper.innerHTML += modalGDPR;
    const innerModal = document.querySelector('#inner-modal');
    innerModal.innerHTML = text;
}

module.exports = {
    renderGDPR
}
