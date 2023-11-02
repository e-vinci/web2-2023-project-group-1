import { formLogin, loginListener} from '../Forms/LoginForm';
import { registerLogin, registerListener } from '../Forms/RegisterForm';

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
            loginListener();
        }
        switchListener();
    });
}

const divEnveloppanteFormulaire = `
<div id="Enveloppante" class="justify-content-center align-items-center text-center">
</div>
`;

const LoginRegister = () => {
    const main = document.querySelector('main');
    main.className = 'd-flex align-items-center justify-content-center';
    main.innerHTML = divEnveloppanteFormulaire;
    const divEnveloppante = document.querySelector('#Enveloppante');
    divEnveloppante.innerHTML = formLogin;
    loginListener();
    switchListener();
};





export default LoginRegister;
