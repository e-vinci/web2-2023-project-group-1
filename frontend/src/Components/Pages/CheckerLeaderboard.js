/* eslint-disable import/no-unresolved */
import {
  renderPasswordStrengthChecker
} from '../Forms/PasswordStrengthChecker';

import {
  leaderboardListener,
} from '../Leaderboard/leaderboard';


const CheckerLeaderboard = () => {
  const main = document.querySelector('main');
  main.innerHTML = `
  <section class="checker" style="background-color: white; width: 60%; margin: auto; padding: 1%; border-radius: 5px; box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.75);"></section>
  <section id="leaderboard" class="text-center"></section>

  `;
  renderPasswordStrengthChecker();
  leaderboardListener();



};
  
export default CheckerLeaderboard;
  