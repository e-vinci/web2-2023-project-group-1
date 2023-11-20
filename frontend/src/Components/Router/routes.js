import HomePage from '../Pages/HomePage';
import LoginRegister from '../Pages/LoginRegister';
import Logout from '../Logout/Logout';
import UserPage from '../Pages/UserPage';
import GeneratePassword from '../Pages/GeneratePassword';

const routes = {
  '/': HomePage,
  '/login': LoginRegister,
  '/generate': GeneratePassword,
  '/user':UserPage,
  '/logout': Logout,
};

export default routes;
