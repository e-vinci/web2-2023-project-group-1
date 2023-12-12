const {renderPasswordStrengthChecker} =require('../Forms/PasswordStrengthChecker');
const {leaderboardListener,animationTitre} = require('../Leaderboard/leaderboard');


const CheckerLeaderboard = () => {
  const main = document.querySelector('main');
  main.innerHTML = `
  <section id="leaderboard" class="text-center"></section>
  `;
  renderPasswordStrengthChecker();
  leaderboardListener();
  animationTitre();

};

export default CheckerLeaderboard;
