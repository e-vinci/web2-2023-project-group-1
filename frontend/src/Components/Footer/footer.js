// eslint-disable-next-line no-unused-vars
import { Footer as BootstrapFooter } from 'bootstrap';

/**
 * Render the Navbar which is styled by using Bootstrap
 * Each item in the Navbar is tightly coupled with the Router configuration :
 * - the URI associated to a page shall be given in the attribute "data-uri" of the Navbar
 * - the router will show the Page associated to this URI when the user click on a nav-link
 */

const Footer = () => {
    const footerWrapper = document.querySelector('#footerWrapper');
    const footer = `
  <footer id="footer">
        <div class="text-center p-2" style="background-color: #000000">
        © 2023-2024 Copyright - Droit d'auteur :
         <a>Chen Wenlin - DeSmet Kilian - Johnen Thomas - Nicolas Luca - Mouayna Lotfi</a>
         <a class="GDPR-link" href="#" data-bs-toggle="modal" data-bs-target="#modalGDPR"> | Politique de confidentialité </a>
        </div>
      </footer>
  `;
    footerWrapper.innerHTML = footer;
};

export default Footer;
