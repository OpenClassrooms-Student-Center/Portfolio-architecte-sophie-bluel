//Cette fonction affiche la popup pour partager son score. 
function afficherPopup() {
    let fenetreGestion = document.querySelector(".fenetreGestion");
    fenetreGestion.classList.add("active");
}

//Cette fonction cache la popup pour partager son score. 
function cacherPopup() {
    let fenetreGestion = document.querySelector(".fenetreGestion");
    fenetreGestion.classList.remove("active");
}


//afficher au clic sur modifier
function initAddEventListenerPopup() {
    const btnModifier = document.querySelector(".bouton-filtre");
    let fenetreGestion = document.querySelector(".fenetreGestion");
    btnModifier.addEventListener("click", () => {
        afficherPopup();
    });

    // masquer si clic ailleurs ATTENTION BACKGROUND DE FENETRE GESTION TOUT L4ECRAN ET GRIS2 §
    fenetreGestion.addEventListener("click", (event) => {
        if (event.target === fenetreGestion) {
            // Alors on cache la popup
            cacherPopup();
            console.log("cache popup");
        }
    });
}

initAddEventListenerPopup();