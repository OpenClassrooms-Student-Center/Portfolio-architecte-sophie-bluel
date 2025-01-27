import { genererProjets, creerFiltres, actionFiltres } from "./methods.js";
import { loadTemplate } from "./templates-loading.js";
/*Récupération des données de projets*/

/*let worksJSON = window.localStorage.getItem("works");

if(worksJSON === null) {*/

    const works = await fetch('http://localhost:5678/api/works').then(works => works.json());
    let worksJSON = JSON.stringify(works);
    window.localStorage.setItem("works", worksJSON); 

/*}else {
    const works = worksJSON.json();
}*/


loadTemplate("templates/header.html", "header-container");
loadTemplate('templates/footer.html', 'footer-container');

genererProjets(works);
creerFiltres();
actionFiltres();


