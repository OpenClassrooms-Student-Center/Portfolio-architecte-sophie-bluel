import { getProjets, genererProjets, filtres } from "./methods.js";
import { verifAuthor } from "./requestLog.js";
import { loadTemplate } from "./templates-loading.js";


/*Chargement du header et du footer*/
//loadTemplate("templates/header.html", "header-container");
loadTemplate('templates/footer.html', 'footer-container');


/*Création des cartes de projets avec filtrage*/
getProjets();

verifAuthor();

const works = JSON.parse(window.localStorage.getItem("works"));
genererProjets(works);
filtres();

const logoutLink = document.querySelector("#logout-link");
logoutLink.addEventListener("click", function(){
    window.sessionStorage.removeItem("authData");
    window.location.reload(true);
})


