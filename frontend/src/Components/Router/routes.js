import GamePage from '../Pages/GamePage';
import HomePage from '../Pages/HomePage';
import NewPage from '../Pages/NewPage';
import LoginRegister from '../Pages/LoginRegister';

const routes = {
  '/': HomePage,
  '/game': GamePage,
  '/new': NewPage,
  '/login': LoginRegister,
};

export default routes;
