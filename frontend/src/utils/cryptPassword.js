// eslint-disable-next-line import/no-extraneous-dependencies, import/no-import-module-exports
import crypto from 'crypto-js/sha512';

const encrypt = async (text, password) => {
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

const decrypt = async (encryptedText, password, iv) => {
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

const text = "This is a secret text.";
const password = "my_secret_password";

const { encrypted, iv } = encrypt(text, password);

console.log(encrypted); // f6c98f8970d0001424f025d32097816a65d612d1a321452b894272a9
console.log(iv); // 81c578a7ce824970b83b208a79780805

const decryptedText = decrypt(encrypted, password, iv);

console.log(decryptedText); // This is a secret text.

module.exports(encrypt,decrypt);