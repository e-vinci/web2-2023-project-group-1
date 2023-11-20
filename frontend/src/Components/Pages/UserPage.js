const { clearPage, renderPageTitle } = require('../../utils/render');
// const { afficherDupliatePassword}=require('../User/DuplicatePassword');
const { showSideBar } = require('../User/SideBarSite');





const UserPage = () => {
  clearPage();
  renderPageTitle('MyUserPage');
  showSideBar();
};



export default UserPage;