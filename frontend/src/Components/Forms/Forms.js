const formLogin = `
        <form id="loginForm" class="p-5 shadow p-3 m-5 mb-5 bg-body-tertiary rounded border-top border-primary border-3">
            <div class="mb-3 justify-content-center">
                <label for="exampleInputEmail1" class="form-label">Adresse E-mail</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Mot de Passe</label>
                <input type="password" class="form-control" id="exampleInputPassword1">
            </div>
            <button type="submit" class="btn btn-primary">Se connecter</button>
        </form>
         <p> Pas encore inscrit ? <a id="switchForm" href="#">Inscrivez-vous !</a></p>
    
`;

const registerLogin = `
    <form id="registrationForm" class="p-5 shadow p-3 mb-5 bg-body-tertiary rounded m-5 border-top border-primary border-3">
        <div class="mb-3 justify-content-center">
            <label for="email" class="form-label">Adresse E-mail</label>
            <input type="email" class="form-control" id="email" aria-describedby="emailHelp" required>
            <div id="messageErreurMail" class="form-text text-danger"></div>
        </div>
        <div class="mb-3">
            <label for="pseudo" class="form-label">Pseudo</label>
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

const divEnveloppanteFormulaire = `
<div id="Enveloppante" class="justify-content-center align-items-center text-center">
</div>
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
    
        const response = await fetch('/api/auths/register', option);
        const resultat = document.querySelector('#resultat');
        if (!response.ok) {
            resultat.innerHTML = `Une erreur est survenue`;
        } else {
            const data = await response.json();
            resultat.innerHTML = `Inscription réussie ${data.username}`;
        }
        
      }
    );
}


const switchListener = () => {
    const switchForm = document.querySelector('#switchForm');
    switchForm.addEventListener('click', (event) => {
        event.preventDefault();
        const divEnveloppante = document.querySelector('#Enveloppante');
        if (divEnveloppante.innerHTML === formLogin) {
            divEnveloppante.innerHTML = registerLogin;
            registerListener();
        } else {
            divEnveloppante.innerHTML = formLogin;
        }
        switchListener();
    });
}




export {switchListener, formLogin, registerLogin, divEnveloppanteFormulaire};