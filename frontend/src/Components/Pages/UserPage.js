/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
import showSideBar from "../User/SideBarSite";
import {clearPage} from "../../utils/render"



const UserPage = () => {
  clearPage();
  showSideBar();
};



export default UserPage;