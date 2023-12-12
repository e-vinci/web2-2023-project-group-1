/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
import showSideBar from "../User/SideBarSite";
import afficherDuplicatePassword  from "../User/AfficherDuplicatePassword";



const UserPage = () => {
  showSideBar();
  afficherDuplicatePassword();
};



export default UserPage;