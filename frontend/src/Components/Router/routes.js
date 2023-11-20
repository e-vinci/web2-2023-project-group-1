import HomePage from '../Pages/HomePage';
import LoginRegister from '../Pages/LoginRegister';
import Logout from '../Logout/Logout';
import UserPage from '../Pages/UserPage';
import CheckerLeaderboard from '../Pages/CheckerLeaderboard';
import GeneratePassword from '../Pages/GeneratePassword';

const routes = {
  '/': HomePage,
  '/password-strength-checker': CheckerLeaderboard,
  '/login': LoginRegister,
  '/generate': GeneratePassword,
  '/user':UserPage,
  '/logout': Logout,
};

export default routes;
