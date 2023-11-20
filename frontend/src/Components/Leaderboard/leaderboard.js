/* eslint-disable import/no-import-module-exports */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
const checkleaderboard = `
<h3 class="text-center m-5">Les pires mots de passe</h3>
<section class="w-75 p-3 mx-auto">
  <table id="leaderboard" class="table table-striped table-hover">
    <thead>
        <tr class="border border-dark">
            <th id="classement">Classement</th>
            <th id="password">Mots de passe</th>
            <th id="count">Nombres occurences</th>
        </tr>
    </thead>
    <tbody id="tableau">
    </tbody>
  </table>
</section>
`;

async function afficherMdp() {
    const checker = document.querySelector('#leaderboard');
    checker.innerHTML = checkleaderboard;
    const reponse = await fetch(`/api/leaderboard/leaderboard`);

    const tableau = document.querySelector('#tableau');

    const leaderboards = await reponse.json();

    leaderboards.forEach((mdp, index) => {
        const infoMdp = `
        <tr>
            <td>${index + 1}</td>
            <td>${mdp.password}</td>
            <td>${mdp.count}</td>
        </tr>
        `;
        tableau.innerHTML += infoMdp;
    });
}

module.exports = {
    afficherMdp
};
