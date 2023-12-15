const InternalServerError = () => {
    const main = document.querySelector('main');
    const mainContent = `
        <p> Erreur 500 : Erreur interne du serveur </p>
    `;
    main.innerHTML = mainContent;
}

export default InternalServerError;