import HomePage from '../Pages/HomePage';
import LoginRegister from '../Pages/LoginRegister';
import Logout from '../Logout/Logout';
import UserPage from '../Pages/UserPage';

const routes = {
  '/': HomePage,
  '/login': LoginRegister,
  '/logout': Logout,
  '/user':UserPage,
};

export default routes;
