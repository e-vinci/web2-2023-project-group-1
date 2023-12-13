import { decryption } from '../../utils/cryptPassword';

async function afficherSite(userId, idSite, password) {
  const option = {
    method: 'POST',
    body: JSON.stringify({
      userId,
      siteId: idSite,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  };
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


export default afficherSite;
