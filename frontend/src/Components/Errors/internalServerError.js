import Navigate from '../Router/Navigate';

const ise = `
    <div class="error text-center">
        <h1>500</h1>
        <p>Désoler ce n'est pas toi, c'est moi</p>
        <p>&#58;&#40;</p>
        <button id="tryAgain" class="btn btn-warning">
            <img class="icon" id="reload" src="https://htmlacademy.ru/assets/icons/reload-6x-white.png">
            Laisse moi encore essayer
        </button>
    </div>
    `;

const listenerInternalServerError = () => {
    const main = document.querySelector('main');
    main.innerHTML = ise;
    const tryAgain = document.querySelector('#tryAgain');
    tryAgain.addEventListener('click', () => {
        Navigate('/')
    });
}

export default listenerInternalServerError;