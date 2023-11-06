// eslint-disable-next-line no-unused-vars
import { Navbar as BootstrapNavbar } from 'bootstrap';

/**
 * Render the Navbar which is styled by using Bootstrap
 * Each item in the Navbar is tightly coupled with the Router configuration :
 * - the URI associated to a page shall be given in the attribute "data-uri" of the Navbar
 * - the router will show the Page associated to this URI when the user click on a nav-link
 */

const Navbar = () => {
  const navbarWrapper = document.querySelector('#navbarWrapper');
  const navbar = `
  <nav class="navbar navbar-expand-lg navbar-light bg-light shadow p-3 mb-5 bg-body-tertiary rounded">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Add your brand here</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <form class="form-inline mx-auto d-flex">
              <input class="form-control me-2" type="search" placeholder="Rechercher" aria-label="Search">
              <button class="btn btn-outline-primary my-2 my-sm-0" type="submit">Rechercher</button>
            </form>
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <a class="nav-link" aria-current="page" href="#" data-uri="/">Accueil</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" data-uri="/">A propos</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#" data-uri="/generate">Générateur</a>
              </li>
              <li class="nav-item">
                <a class="btn btn-primary" href="#" data-uri="/login">Login/Register</a>
              </li>                        
            </ul>
          </div>
        </div>
      </nav>
  `;
  navbarWrapper.innerHTML = navbar;
};

export default Navbar;
