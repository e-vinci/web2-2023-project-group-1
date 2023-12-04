// eslint-disable-next-line import/no-extraneous-dependencies, import/no-import-module-exports
import CryptoJS from 'crypto-js';

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

 const decryption =async (encrypted, password,id) => {
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
    if(!response.ok)return undefined;
    const data = await response.json();
    if(parseInt(data.value,10)===1){
   const decrypted = CryptoJS.Rabbit.decrypt(encrypted, password);
   console.log("ijblsdqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqccccc")
   console.log(decrypted);
    return decrypted;}
    return undefined
};
export { encryption , decryption};