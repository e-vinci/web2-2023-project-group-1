import HomePage from '../Pages/HomePage';
import LoginRegister from '../Pages/LoginRegister';
import Logout from '../Logout/Logout';
import UserPage from '../Pages/UserPage';
import GeneratePassword from '../Pages/GeneratePassword';
import InternalServerError from '../Pages/500';

const routes = {
  '/': HomePage,
  '/login': LoginRegister,
  '/generate': GeneratePassword,
  '/user': UserPage,
  '/logout': Logout,
  '/500': InternalServerError,
};

export default routes;
