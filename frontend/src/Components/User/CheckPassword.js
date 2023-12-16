/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */

import { getAuthenticatedUser } from '../../utils/auths';

const checkPassword = async (userId) => {
    const user = getAuthenticatedUser();

    const masterPassword = prompt('Entrez votre mot de passe maitre', '');
    if (masterPassword === null) {
        alert('Veillez entrer votre mot de passe maitre');
        window.location.reload();
    } else if(masterPassword === ''){
        alert('Mot de passe maitre incorrect');
        window.location.reload();
    }else{

    const optionCompare = {
        method: 'POST',
        body: JSON.stringify({
            username: user.username,
            password: masterPassword,
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    };

    const responseCompare = await fetch(`${process.env.API_BASE_URL}/auths/comparePassword`, optionCompare);
    const compareData = await responseCompare.json();
    if (compareData !== 1) {
        alert('Mot de passe maitre incorrect');
    } else {
        return masterPassword;
    }}
    
    return null; // Add a return statement at the end of the function.
};

export default checkPassword;
