const {renderPasswordStrengthChecker} =require('../Forms/PasswordStrengthChecker');
const {leaderboardListener,animationTitre} = require('../Leaderboard/leaderboard');

const HomePage = () => {
  const main = document.querySelector('main');
  main.className = 'align-items-center justify-content-center';
  main.innerHTML = `
  <section class="checker" style="background-color: white; width: 60%; margin: auto; padding: 1%; border-radius: 5px; box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);"></section>
  <section id="leaderboard" class="text-center"></section>
  `;
  
  renderPasswordStrengthChecker();
  leaderboardListener();
  animationTitre();
};

export default HomePage;
