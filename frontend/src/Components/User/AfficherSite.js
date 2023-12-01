
async function afficherSite(idSite){

    const option = {
        method: 'GET',
        body: JSON.stringify({
            "userId": idSite,
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    }
    const response = fetch('/api/sites/getSiteById', option);
    if (!response.ok) {
        console.log('Error can\'t add to leaderboard because response is not ok');
    }

}

module.exports = {
    afficherSite
};