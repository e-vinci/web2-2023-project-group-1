import {
  renderPasswordStrengthChecker
} from '../Forms/PasswordStrengthChecker';

const CheckerLeaderboard = () => {
  const main = document.querySelector('main');
  main.innerHTML = `
  <section class="checker"></section>
  <section class="leaderboard"></section>
  `;
  renderPasswordStrengthChecker();
};
  
export default CheckerLeaderboard;
  