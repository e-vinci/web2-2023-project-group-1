import  {showSideBar} from '../User/SideBarSite';
import { afficherDuplicatePassword } from '../User/AfficherDuplicatePassword'; 


const sidebarToFill=`<!--Main Navigation-->
  <header>
  <div class="container">
  <div class="row">
    <div class="listSite">
    </div>
    <div class="leftSide">
      The other box
    </div>
    </div>
</div>`;


const UserPage = () => {
  const main = document.querySelector('main');
  main.className = 'd-flex align-items-center justify-content-center';
  main.innerHTML = sidebarToFill;
  showSideBar();
  afficherDuplicatePassword();
  
}

export default UserPage;