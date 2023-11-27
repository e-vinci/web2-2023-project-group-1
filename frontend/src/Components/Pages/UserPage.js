const defaultList= [
  {
      "id": 1,
      "url": "test01",
      "site": "testSite1",
      "login": "Useraname1",
      "mot_de_passe": "$2b$10$fe2S0.EVIParWe1jAoagE.oxCfWS95JUX0YtG.mOnHdEB5zfi4TUW"
  },
  {
      "id": 2,
      "url": "test01",
      "site": "testSite1",
      "login": "Useraname1",
      "mot_de_passe": "$2b$10$0rQmPNWcskf5Ce2/hKYRFu0mDELZpc4VSN406e3rogrIo6/165362"
  },
  {
      "id": 3,
      "url": "test01",
      "site": "testSite1",
      "login": "Useraname1",
      "mot_de_passe": "$2b$10$cWHPZkMaeGY2PSCXPHk6NOGDdsHipiSKCj0kYe9lC5Z/roMYDea6K"
  },
  {
      "id": 4,
      "url": "test01",
      "site": "testSite1",
      "login": "Useraname1",
      "mot_de_passe": "$2b$10$BrUjYe2DNaRXF3oRj0oZxu/MkfoBmBphPaEMTZ9HPYFsjXLkdmMbC"
  }
];

const sidebarToFill=`<!--Main Navigation-->
  <header>
  <div class="container">
  <div class="row">
    <div class="listSite">
    </div>
    <div class="col-sm">
      The other box
    </div>
    </div>
</div>`;

const UserPage = () => {
  const main = document.querySelector('main');
  main.className = 'd-flex align-items-center justify-content-center';
  main.innerHTML = sidebarToFill;
  const sideBar=document.querySelector('.listSite');
  const buttonaddSit=document.createElement('button');
 buttonaddSit.innerHTML='<button type="button" class="btn btn-primary btn-lg btn-block">Ajouter un site</button>';
  sideBar.appendChild(buttonaddSit);

  defaultList.forEach((element)=>{
    const listelem=document.createElement('th');
    const elem=document.createElement('button');
    elem.id = element.id;
    elem.innerHTML='type="button" class="btn btn-primary btn-lg btn-block"';
    listelem.appendChild(elem);
    sideBar.appendChild(listelem);
  }
  
   );
 
  


};



export default UserPage;