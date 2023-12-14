import 'bootstrap/dist/css/bootstrap.min.css';
import './stylesheets/main.css';
import { renderGeneratorPassword } from './Components/passwordGenerator/generator';
import { renderAbout } from './Components/About/about';
import { renderGDPR } from './Components/GDPR/GDPR';

import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/Footer/footer';
import Router from './Components/Router/Router';

renderGDPR();
renderAbout();
renderGeneratorPassword();
Navbar();
Footer();
Router();
