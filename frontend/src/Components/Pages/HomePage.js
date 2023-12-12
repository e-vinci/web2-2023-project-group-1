const {renderPasswordStrengthChecker} =require('../Forms/PasswordStrengthChecker');
const {leaderboardListener,animationTitre} = require('../Leaderboard/leaderboard');


const HomePage = () => {
  const main = document.querySelector('main');
  main.className = 'align-items-center justify-content-center';
  main.innerHTML = `
  <section class="checker"></section>
  <section id="leaderboard" style ="padding: 2%" class="text-center"></section`
  ;
 
 
  renderPasswordStrengthChecker();
  leaderboardListener();
  animationTitre();
};

export default HomePage;