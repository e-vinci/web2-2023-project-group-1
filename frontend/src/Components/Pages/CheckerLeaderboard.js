const { checkerForm, listenersPasswordStrengthChecker } =require('../Forms/PasswordStrengthChecker');
const {leaderboardListener,animationTitre} = require('../Leaderboard/leaderboard');


const CheckerLeaderboard = () => {
  const main = document.querySelector('main');
  main.innerHTML = checkerForm;
  listenersPasswordStrengthChecker();
  leaderboardListener();
  animationTitre();

};

export default CheckerLeaderboard;
