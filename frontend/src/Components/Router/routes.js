import HomePage from '../Pages/HomePage';
import LoginRegister from '../Pages/LoginRegister';
import Logout from '../Logout/Logout';
import UserPage from '../Pages/UserPage';
import CheckerLeaderboard from '../Pages/CheckerLeaderboard';


const routes = {
  '/': HomePage,
  '/password-strength-checker': CheckerLeaderboard,
  '/login': LoginRegister,
  '/logout': Logout,
  '/user':UserPage,
};

export default routes;
