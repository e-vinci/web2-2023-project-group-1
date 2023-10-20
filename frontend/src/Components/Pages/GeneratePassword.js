const Password = require('password-npm');

const GeneratePassword = () => {
    const main = document.querySelector('main');
    main.innerHTML = `
      <section class="generate">
        <h2>Generate Password</h2>
        <form id="generate-form">
          <label for="generate-length">Length</label>
          <input type="number" id="generate-length" name="generate-length" min="8" max="128" value="8" required>
          <label for="generate-include-lowercase">Include Lowercase</label>
          <input type="checkbox" id="generate-include-lowercase" name="generate-include-lowercase" checked>
          <label for="generate-include-uppercase">Include Uppercase</label>
          <input type="checkbox" id="generate-include-uppercase" name="generate-include-uppercase">
          <label for="generate-include-numbers">Include Numbers</label>
          <input type="checkbox" id="generate-include-numbers" name="generate-include-numbers">
          <label for="generate-include-symbols">Include Symbols</label>
          <input type="checkbox" id="generate-include-symbols" name="generate-include-symbols">
          <input type="submit" value="Generate">
        </form>
        <div id="generate-password"></div>
      </section>
    `;

    const generateForm = document.querySelector('#generate-form');
    const generatePassword = document.querySelector('#generate-password');

    generateForm.addEventListener('submit', event => {
      event.preventDefault();
      const length = parseInt(event.target['generate-length'].value, 10);
      const includeLowercase = event.target['generate-include-lowercase'].checked;
      const includeUppercase = event.target['generate-include-uppercase'].checked;
      const includeNumbers = event.target['generate-include-numbers'].checked;
      const includeSymbols = event.target['generate-include-symbols'].checked;
      const password = new Password(length, includeLowercase, includeUppercase, includeNumbers, includeSymbols);
      generatePassword.innerHTML= `${password.random()}`;
    });


};
  
export default GeneratePassword;
  