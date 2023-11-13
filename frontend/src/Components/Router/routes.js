import HomePage from '../Pages/HomePage';
import LoginRegister from '../Pages/LoginRegister';
import GeneratePassword from '../Pages/GeneratePassword';
import Logout from '../Logout/Logout';
import UserPage from '../Pages/UserPage';

const routes = {
  '/': HomePage,
  '/login': LoginRegister,
  '/generate': GeneratePassword,
  '/user':UserPage,
  '/logout': Logout,
  '/user':UserPage,
};

export default routes;
