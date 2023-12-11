/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */

import { getAuthenticatedUser } from '../../utils/auths';

const checkPassword = async (userId) => {
    const user = getAuthenticatedUser();

    const masterPassword = prompt('Entrez votre mot de passe maitre', '');

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

    const responseCompare = await fetch('/api/auths/comparePassword', optionCompare);
    const compareData = await responseCompare.json();
    if (compareData !== 1) {
        alert('Mot de passe maitre incorrect');
    } else {
        return masterPassword;
    }
    
    return null; // Add a return statement at the end of the function.
};

export default checkPassword;
