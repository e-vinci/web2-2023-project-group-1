
 feat/front/afficherSite
  const response = await fetch('/api/sites/getSiteById', option);
  if (!response.ok) {
    console.log("Error can't add to leaderboard because response is not ok");
  }
  const site = await response.json();
  console.log(site.mot_de_passe);

  const mdp = await decryption(site.mot_de_passe, password);

  /*
    "url": "test.com",
    "site": "test",
    "login": "test",
    "mot_de_passe": "[object Object]"

*/


  const rightSide = document.querySelector('.right');
  rightSide.innerHTML = `
    <div class="container-fluid">
    <h1 style="font-family:Poppins, sans-serif;color:#4070f4">Site Information <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAAAXNSR0IArs4c6QAAAkBJREFUWEftWFtOwzAQnAh+kNI7tCfBPQn0BrkB5Qa+AeUkmJOQOzQSP0WBTRx17dhemxZRISIhPvLw7OzMPlrhwq7qwvDgbwBSzfsSONwD1S2Apf1rLdv0vwX6Z6MXpjQDRQypZr8FqoeCQyZg29x3sgCpZq+A6skykftt/lw2MBFQhJXhAAAGuG6NvmnHNNJ1WALV3dc9NQ+gfzR6kWQrCUg13Yv98BRtdqRMZwTOgh0+szO63sRojgIKMGOMrtel+WLAmPbiTAUBWc0QO9OVjEoCGQaFjdH1zn83Aqh7YzQnmRnBD3qhy8SsPoL6IJbup/JgdL0SAammoxfIUeMJuhZ0xktBWrQWFDFvNTV/fnaYahx2grTyqFytyS7yAm59lhxApewQsNyUTUFYligDNs39mqfZB0QPTjk+ScgpoadY9QHxuiOmS3JX7L7nYsc0PiDmrqsVVWDp0NKUjWkeHEdn0eXoyAfU57rrqIl8l3k6uhxAI0tdMPhzpIyNJLLtS1PGRO3aMSHQbwByim9K1M4AlmX70sJo0xUtL17KhkFsaqqzKhpi6ZuAmJsThdEXGxDuyGdsHbNeGeplvLmKLJUyJPXKAKChaLGOnJ7wSgqjN4EGg43NQ84IAuTZOd2/Oi5kAGEX//gIa3XpzeaFI2y4LYx9xy6AWXtWZGNJTqAnrEG0AtEqFFqDaNYJLZRy6kVAxyHs5EVxk7NaZwE69p9hn//9Vdp3j/xjQ/+a2kBSbsxmSBrUznX/H5DE5CeBvY40mQg3gQAAAABJRU5ErkJggg=="/></h1>
   
  <div class="input-group mb-3">
  <span class="input-group-text" id="basic-addon1">Url du Site</span>
  <input type="url" class="form-control" placeholder="https://example.com" aria-label="Username" aria-describedby="basic-addon1" value="${site.url}">
  <a href="${site.url}" target="_blank"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAP9JREFUSEvtlc0NwjAMhV/u7Q5lE7MJbJANgA2yAaOQUbpDK3FCQS4KpKFJXfpzosfIfZ/97MQKK39qZX1sCyDdEKCuAKrvytzFmvLM56SbM6BOqeqtKd6J9yog3d74/7RtMkgO4Fg8DMj1KFXJgoB7BTy46p6liwBId+LcL7a0DiGzAbG4NcUutGsWYEjc98lDfgbkxEOIH2c+i8c0OUUS8aGJEwGk4mxRmL24AtLtAQBPTM0NTd0N0q0DPpdRDPDPQ5xdDHoB+hdVZJH0xf0DRp2SWDTyXI8yuh5bU+x9ZNTkbuHwIsnshCykBtzRmtIOAkT5TQzadidPTE4U/gS61rgZ5tANsgAAAABJRU5ErkJggg=="/></a>
</div>


  <div class="input-group mb-3">
  <span class="input-group-text" id="basic-addon1">Nom du site</span>
  <input type="text" class="form-control" placeholder="nom du site" aria-label="nom du site" aria-describedby="basic-addon1" value="${site.site}">
</div>

    <div class="input-group mb-3">
  <span class="input-group-text" id="basic-addon1">Login</span>
  <input type="text" class="form-control" placeholder="login" aria-label="login" aria-describedby="basic-addon1" value="${site.login}">
</div>

<div class="input-group mb-3">
  <span class="input-group-text" id="basic-addon1">mot de passe</span>
  <input type="text" class="form-control" placeholder="mot de passe" aria-label="mot de passe" aria-describedby="basic-addon1" value="${mdp}">
  <a id="copy-button2"><img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAAAXNSR0IArs4c6QAAAL1JREFUSEvtlcENgzAMRX/u6Q6wiTtKN8gGXSEbdJR6FHaAO1UqBZFCatcRlwqu2H6J8+3vcPDnDq4PEUBhJMA9AHTKwwzAfON44RSvAExPAKQsnsMGjr7XAuYUyNGLh0lxFKYiXkz6TJBu8seAVrXk1lVbRKFNLRpAk1pOwEb+tfn49simN6gMHnP012JVWCd2B7C/7KwAaUctu+gE1LbsukUWY1nUogC8rfH+g3sVahEBkpFY/4uOZi2c815oNrAZKtfg4wAAAABJRU5ErkJggg=="/> </a>
</div>

<input class="modifierBouton" type="button" value="modifier" >

</div>
    `;

    
const copyButton = document.querySelector('#copy-button2');

copyButton.addEventListener('click', () => {
    const generatedPassword = mdp;
    copyToClipboard(generatedPassword);
});


async function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    await navigator.clipboard.writeText(text);
    document.body.removeChild(textarea);
}

}



=======
  let response = await fetch('/api/sites/getSiteById', option);
  if (!response.ok) {
    console.log("Error can't get the site because response is not ok");
  }
  const site = await response.json();

  const mdp = await decryption(site.mot_de_passe, password);

  const rightSide = document.querySelector('.right');
  rightSide.innerHTML = `
    <div> <h1>Site Information</h1>  
            <div> <h2>voici l url de votre site : </h2> 
            <a> ${site.url} </a> 
            </div> 
            <div> <h2>voici le nom de votre site : </h2>
             <p>${site.site} </p> 
             </div> 
             <div> <h2>voici le login de votre site : </h2> 
             <p>${site.login} </p> 
             </div> 
             <div> <h2>voici le mot de passe de votre site : </h2> 
             <p>${mdp} </p> 
             </div>
     <button id="deleteButton" class="btn btn-secondary btn-lg btn-block">
<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg>
Supprimer les informations de ce site.
    </div>`;

  const deleteButton = document.querySelector('#deleteButton');
  deleteButton.addEventListener('click', async (e) => {
    e.preventDefault();

    option = {
      method: 'DELETE',
      body: JSON.stringify({
        userId,
        siteId: idSite,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    response = await fetch('/api/sites/deleteSite', option);
    if (!response) {
      console.log("Error can't delete the site because response is not ok");
    } else {
      Navigate('/');
    }
  });
}


export default afficherSite;
