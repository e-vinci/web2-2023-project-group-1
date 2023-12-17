import { setAuthenticatedUser} from '../../utils/auths';
import Navigate from '../Router/Navigate';
import Navbar from '../Navbar/Navbar';

const formLogin = `
        <form id="loginForm" class="p-5 shadow p-3 m-5 mb-5 bg-body-tertiary rounded border-top border-primary border-3">
            <div class="mb-3 justify-content-center">
                <label for="usernameLogin" class="form-label">Username</label>
                <input type="text" class="form-control" id="usernameLogin" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="passwordLogin" class="form-label">Mot de Passe</label>
                <input type="password" class="form-control" id="passwordLogin">
            </div>
            <button type="submit" class="btn btn-primary">Se connecter</button>
            <p id="resultat" class="text-success"></p>
        </form>
         <p> Pas encore inscrit ? <a id="switchForm" href="#">Inscrivez-vous !</a></p>
    
`;

const loginListener = () => {
    const loginForm = document.querySelector('#loginForm');
    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const username = document.querySelector('#usernameLogin').value;
        const password = document.querySelector('#passwordLogin').value;
        const option = {
            method: 'POST',
            body: JSON.stringify({
                "username": username,
                "password": password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    
        const response = await fetch(`${process.env.API_BASE_URL}/auths/login`, option);
        const resultat = document.querySelector('#resultat');
        if (!response.ok) {
            resultat.className = 'text-danger';
            resultat.innerHTML = `Une erreur est survenue`;
        } else {
            const data = await response.json();
            resultat.innerHTML = `Connexion réussie ${data.username}`;
            setAuthenticatedUser(data);
            Navbar();
            Navigate('/');
        
      }
    });
}





export {formLogin, loginListener};