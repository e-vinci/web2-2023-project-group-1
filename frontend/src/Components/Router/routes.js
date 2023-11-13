import HomePage from '../Pages/HomePage';
import LoginRegister from '../Pages/LoginRegister';
import GeneratePassword from '../Pages/GeneratePassword';
import UserPage from '../Pages/UserPage';

const routes = {
  '/': HomePage,
  '/login': LoginRegister,
  '/generate': GeneratePassword,
  '/user':UserPage,
};

export default routes;
