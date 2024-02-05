const fenetreGestion = document.querySelector(".fenetreGestion");
const fenetreAjout = document.querySelector(".fenetreAjout");

ajoutPhoto();
retour();

//FONCTIONS UTILISEES

//Fonctions pour afficher/masquer les fenêtres gestion et ajout
function afficherGestion(fenetre) {
    fenetre.classList.add("active");
}
function cacherGestion(fenetre) {
    fenetre.classList.remove("active");
    // reset du formulaire à la fermeture
    document.getElementById("form").reset();
    document.querySelector(".preview").remove();
}

//affichage gestion
export function initAddEventListenerGestion() {
    const boutonModifier = document.querySelector("#boutonModifier");
    boutonModifier.addEventListener("click", () => {
        afficherGestion(fenetreGestion);
    });

    // masquer si clic ailleurs ou sur X
    fenetreGestion.addEventListener("click", (event) => {
        if (event.target === fenetreGestion) {
            cacherGestion(fenetreGestion);
        }
    });
    const boutonClose = document.querySelector(".fenetreGestion .close");
    boutonClose.addEventListener("click", () => {
        cacherGestion(fenetreGestion);
    });
}



function ajoutPhoto(){
    const boutonAjout = document.querySelector("#ajoutPhoto");
    boutonAjout.addEventListener("click", ()=>{
        afficherGestion(fenetreAjout);
        cacherGestion(fenetreGestion);

    });
    // masquer si clic ailleurs ou sur X
    fenetreAjout.addEventListener("click", (event) => {
        if (event.target === fenetreAjout) {
            cacherGestion(fenetreAjout);
        }
    });
    const boutonClose = document.querySelector(".fenetreAjout .close");
    boutonClose.addEventListener("click", () => {
        cacherGestion(fenetreAjout);
    });

}

function retour(){
    const boutonRetour = document.querySelector(".retour");
    boutonRetour.addEventListener("click", ()=>{
        afficherGestion(fenetreGestion);
        cacherGestion(fenetreAjout);
    });
}
