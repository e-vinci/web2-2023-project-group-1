import{decryption}from '../../utils/cryptPassword'

async function afficherSite(userId,idSite, password){

    const option = {
        method: 'POST',
        body: JSON.stringify({
            "userId": userId,
            "siteId" : idSite,

        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const response =await fetch('/api/sites/getSiteById', option);
    if (!response.ok) {
        console.log('Error can\'t add to leaderboard because response is not ok');
    }
   const site =await response.json();
   console.log(site.mot_de_passe);

   const mdp =await  decryption(site.mot_de_passe,password );
    

    const rightSide = document.querySelector('.right');
    rightSide.innerHTML= `
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
    </div>` ;
    
}

export default  afficherSite;