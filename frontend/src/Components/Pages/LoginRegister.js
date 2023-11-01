import {switchListener, formLogin, divEnveloppanteFormulaire, loginListener} from '../Forms/Forms';

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
