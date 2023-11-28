const {getAuthenticatedUser} =require('../../utils/auths')

  const sidebarToFill=`<!--Main Navigation-->
  <header>
  <div class="container">
  <div class="row">
    <div class="listSite">
    </div>
    <div class="leftSide">
    </div>
    </div>
</div>`;

  async function  showSideBar(){
    console.log(getAuthenticatedUser());
    const main = document.querySelector('main');
    main.className = 'd-flex align-items-center justify-content-center';
    main.innerHTML = sidebarToFill;
    const sideBar=document.querySelector('.listSite');
    const buttonaddSit=document.createElement('tr');
    const elemAdd=document.createElement('button');
    elemAdd.innerHTML='Ajouter un site';
    elemAdd.setAttribute('type', 'button');
    elemAdd.setAttribute('class', 'btn btn-secondary btn-lg btn-block');
    buttonaddSit.appendChild(elemAdd)
    sideBar.appendChild(buttonaddSit);
      const option = {
          method: 'GET',
          body: JSON.stringify({
              "userName": getAuthenticatedUser().username,
          }),
          headers: {
              'Content-Type': 'application/json'
          }
      }
      const response = fetch('/api/sites/orderBySiteName', option);
      if (!response.ok) {
          console.log('Error can\'t add to leaderboard because response is not ok');
      }
      const list=response.JSON();
  
    list.forEach((element)=>{
      const listelem=document.createElement('tr');
      const elem=document.createElement('button');
      elem.id = element.id;
      elem.innerHTML=element.site;
      elem.setAttribute('type', 'button');
      elem.setAttribute('class', 'btn btn-secondary btn-lg btn-block');
      elem.addEventListener('click', async (event) => {
        const tab = document.querySelector('.leftSide');
        tab.innerHTML='';

        
        console.log('Button clicked:', event.site);
      } );
      listelem.appendChild(elem);
      sideBar.appendChild(listelem);
    }
     );
 
     }
    
   module.exports = {
    showSideBar
};