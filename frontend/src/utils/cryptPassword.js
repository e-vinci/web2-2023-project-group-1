// eslint-disable-next-line import/no-extraneous-dependencies, import/no-import-module-exports
import crypto from 'crypto-js/sha512';

/**
 * Encrypt a password with crypto-js
 * @param {String} text password of a site to encrypt
 * @param {String} password password's user
 * @returns password encrypted
 */
 const   encryption = async (text, password)=>{
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
    if(data.value===1){
    const cipher = crypto.createCipher('aes-512-cbc', password);
    const {iv} = cipher;
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    return {
        encrypted,
        iv
    };}
    return undefined
};

 const decryption =async (encryptedText, password, iv) => {
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
    const decipher = crypto.createDecipher('aes-512-cbc', password);
    decipher.iv = iv;
    let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;}
    return undefined
};

export { encryption , decryption};
