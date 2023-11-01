import HomePage from '../Pages/HomePage';
import LoginRegister from '../Pages/LoginRegister';
import GeneratePassword from '../Pages/GeneratePassword';
import Logout from '../Logout/Logout';

const routes = {
  '/': HomePage,
  '/login': LoginRegister,
  '/generate': GeneratePassword,
  '/logout': Logout,
};

export default routes;
