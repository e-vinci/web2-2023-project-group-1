import { checkerForm, listenersPasswordStrengthChecker }  from '../Forms/PasswordStrengthChecker';
import { checkleaderboard, afficherMdp, animationTitre } from '../Leaderboard/leaderboard';


const HomePage = () => {
  const main = document.querySelector('main');
  main.className = '';
  main.innerHTML = checkerForm;
  main.innerHTML += checkleaderboard;
  afficherMdp();
  animationTitre();
  listenersPasswordStrengthChecker();
};

export default HomePage;