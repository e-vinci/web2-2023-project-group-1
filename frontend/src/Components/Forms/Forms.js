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
            <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div class="mb-3">
            <label for="pseudo" class="form-label">Pseudo</label>
            <input type="text" class="form-control" id="pseudo" required>
        </div>
        <div class="mb-3">
            <label for="password" class="form-label">Mot de Passe</label>
            <input type="password" class="form-control" id="password" required>
        </div>
        <div class="mb-3">
            <label for="confirmPassword" class="form-label">Confirme Mot de Passe</label>
            <input type="password" class="form-control" id="confirmPassword" required>
        </div>
        <button type="submit" class="btn btn-primary">S'inscrire</button>
    </form>
    <p> Déjà inscrit ? <a id="switchForm" href="#">Connectez-vous !</a></p>
`;

const divEnveloppanteFormulaire = `
<div id="Enveloppante" class="justify-content-center align-items-center text-center">
</div>
`;

const switchListener = () => {
    const switchForm = document.querySelector('#switchForm');
    switchForm.addEventListener('click', (event) => {
        event.preventDefault();
        const divEnveloppante = document.querySelector('#Enveloppante');
        if (divEnveloppante.innerHTML === formLogin) {
            divEnveloppante.innerHTML = registerLogin;
        } else {
            divEnveloppante.innerHTML = formLogin;
        }
        switchListener();
    });
}




export {switchListener, formLogin, registerLogin, divEnveloppanteFormulaire};