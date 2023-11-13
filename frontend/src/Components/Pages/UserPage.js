const UserPage = () => {

  const listSite = async => {
    const option = {
      method: 'GET',
      body: JSON.stringify({
        "login": pseudo,
        "email": email,
        "password": password
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const response =  fetch('/api/auths/orderBySiteName', option);
  }

  const main = document.querySelector('main');
  const divRow = document.createElement('row');
  const divTable = document.createElement('table');

  divTable.className = 'table table-dark table-sm';
  divTable.innerHTML = 'Vos comptes';
  for ()


    divRow.className = 'container-fluid';
  divRow.innerHTML = 'Ma colonne';
  divRow.appendChild(divTable);
  main.appendChild(divRow);
};

export default UserPage;