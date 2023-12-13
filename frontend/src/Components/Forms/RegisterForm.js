import { setAuthenticatedUser } from '../../utils/auths';
import Navbar from '../Navbar/Navbar';
import Navigate from '../Router/Navigate';

const registerLogin = `
    <form id="registrationForm" class="p-5 shadow p-3 mb-5 bg-body-tertiary rounded m-5 border-top border-primary border-3">
        <div class="mb-3 justify-content-center">
            <label for="email" class="form-label">Adresse E-mail</label>
            <input type="email" class="form-control" id="email" aria-describedby="emailHelp" required>
            <div id="messageErreurMail" class="form-text text-danger"></div>
        </div>
        <div class="mb-3">
            <label for="pseudo" class="form-label">Username</label>
            <input type="text" class="form-control" id="pseudo" required>
            <div id="messageErreurPseudo" class="form-text text-danger"></div>
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Mot de Passe</label>
            <input type="password" class="form-control" id="password" required>
            <div id="messageErreurPassword" class="form-text text-danger"></div>
        </div>
        <div class="mb-3">
            <label for="confirmPassword" class="form-label">Confirme Mot de Passe</label>
            <input type="password" class="form-control" id="confirmPassword" required>
            <div id="messageErreurPasswordConfirm" class="form-text text-danger"></div>
        </div>
        <button type="submit" class="btn btn-primary">S'inscrire</button>
        <p id="resultat" class="text-success"></p>
    </form>
    <p> Déjà inscrit ? <a id="switchForm" href="#">Connectez-vous !</a></p>
`;

const registerListener = () => {
    const registerForm = document.querySelector('#registrationForm');
    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const email = document.querySelector('#email').value;
        const pseudo = document.querySelector('#pseudo').value;
        const password = document.querySelector('#password').value;
        const confirmPassword = document.querySelector('#confirmPassword').value;

        if (email === '') {
            const messageErreurMail = document.querySelector('#messageErreurMail');
            messageErreurMail.innerHTML = `Veuillez renseigner un email`;
            messageErreurMail.style.display = 'block';
            return;
        }
        if (pseudo === '') {
            const messageErreurPseudo = document.querySelector('#messageErreurPseudo');
            messageErreurPseudo.innerHTML = `Veuillez renseigner un pseudo`;
            messageErreurPseudo.style.display = 'block';
            return;
        }
        if (password === '') {
            const messageErreurPassword = document.querySelector('#messageErreurPassword');
            messageErreurPassword.innerHTML = `Veuillez renseigner un mot de passe`;
            messageErreurPassword.style.display = 'block';
            return;
        }
        if (confirmPassword === '') {
            const messageErreurPasswordConfirm = document.querySelector('#messageErreurPasswordConfirm');
            messageErreurPasswordConfirm.innerHTML = `Veuillez confirmer votre mot de passe`;
            messageErreurPasswordConfirm.style.display = 'block';
            return;
        }
        if (password !== confirmPassword) {
            const messageErreurPasswordConfirm = document.querySelector('#messageErreurPasswordConfirm');
            messageErreurPasswordConfirm.innerHTML = `Les mots de passe ne correspondent pas`;
            messageErreurPasswordConfirm.style.display = 'block';
            return;
        }   const option = {
            method: 'POST',
            body: JSON.stringify({
                "login": pseudo,
                "email": email,
                "password": password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }
    
        const response = await fetch(`${process.env.API_BASE_URL}/auths/register`, option);
        const resultat = document.querySelector('#resultat');
        if (!response.ok) {
            resultat.className = 'text-danger';
            resultat.innerHTML = `Une erreur est survenue`;
        } else {
            const data = await response.json();
            resultat.innerHTML = `Inscription réussie ${data.username}`;
            setAuthenticatedUser(data);
            Navbar();
            Navigate('/');
        }
        
      }
    );
}

export { registerLogin, registerListener };