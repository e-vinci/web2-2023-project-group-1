/* eslint-disable import/no-import-module-exports */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
import anime from 'animejs';
import Navigate from '../Router/Navigate';

const checkleaderboard = `
<h3 class="ml12 mt-5 pt-5 text-center">Les pires mots de passe</h3>
<div src="https://cdnjs.cloudflare.com/ajax/libs/animejs/2.0.2/anime.min.js"></div>
<section class="w-75 p-3 mx-auto" id="leaderboard-sec">
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
    const reponse = await fetch(`${process.env.API_BASE_URL}/leaderboard/leaderboard`);

    if (!reponse.ok) {
        Navigate('/500');
        return;
    }

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

async function animationTitre() {

    const textWrapper = document.querySelector('.ml12');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml12 .letter',
    translateX: [40,0],
    translateZ: 0,
    opacity: [0,1],
    easing: "easeOutExpo",
    duration: 1200,
    delay: (el, i) => 500 + 30 * i
  }).add({
    targets: '.ml12 .letter',
    translateX: [0,-30],
    opacity: [1,0],
    easing: "easeInExpo",
    duration: 1100,
    delay: (el, i) => 100 + 30 * i
  });
}

export {
  checkleaderboard,
    afficherMdp,
    animationTitre,

};
