// eslint-disable-next-line import/no-extraneous-dependencies, import/no-import-module-exports
import CryptoJS from 'crypto-js';
import { getAuthenticatedUser } from './auths';

/**
 * Encrypt a password with crypto-js
 * @param {String} text password of a site to encrypt
 * @param {String} password password's user
 * @returns password encrypted
 */
 const   encryption = async (text, password,id)=>{
    console.log('ici');
    const option = {
        method: 'POST',
        body: JSON.stringify({
            // eslint-disable-next-line no-undef
            "id": id,
            "password": password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const response = await fetch('/api/auths/passwordCheck', option);
    console.log(response.ok);
    if(!response.ok)return undefined;
    const encrypted = CryptoJS.Rabbit.encrypt(text,password);
    return encrypted;
};

 const decryption =async (encrypted, password) => {
    const option = {
        method: 'POST',
        body: JSON.stringify({
            // eslint-disable-next-line no-undef
            "username": getAuthenticatedUser(),
            "password": password
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const response = await fetch('/api/auths/comparePassword', option);
    if(!response.ok)return undefined;
    const data = await response.json();
    if (data !== 1) {
        alert('Mot de passe maitre incorrect');
    } else {
        const decrypted = CryptoJS.Rabbit.decrypt(encrypted, password).toString(CryptoJS.enc.Utf8);
         return decrypted;
    }
    return undefined
};

export { encryption , decryption };
