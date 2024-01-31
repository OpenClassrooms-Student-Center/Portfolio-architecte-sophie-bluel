//Cette fonction affiche la fenêtre de gestion
function afficherGestion() {
    let fenetreGestion = document.querySelector(".fenetreGestion");
    fenetreGestion.classList.add("active");
}

//Cette fonction cache la fenêtre de gestion
function cacherGestion() {
    let fenetreGestion = document.querySelector(".fenetreGestion");
    fenetreGestion.classList.remove("active");
}


//afficher au clic sur modifier
function initAddEventListenerGestion() {
    const btnModifier = document.querySelector(".bouton-filtre");
    const fenetreGestion = document.querySelector(".fenetreGestion");
    const boutonClose = document.querySelector(".close");
    btnModifier.addEventListener("click", () => {
        afficherGestion();
    });

    // masquer si clic ailleurs ou sur X
    fenetreGestion.addEventListener("click", (event) => {
        if (event.target === fenetreGestion) {
            cacherGestion();
        }
    });
    boutonClose.addEventListener("click", () => {
        cacherGestion();
    });
}

initAddEventListenerGestion();

function ajoutPhoto(){
    const boutonAjout = document.querySelector("#ajoutPhoto");
    boutonAjout.addEventListener("click", ()=>{
        champsAjout();
    });

}

function champsAjout(){
    document.querySelector(".gestion h3").innerHTML = "Ajout photo";
    document.querySelector(".miniatures").innerHTML = "";

    const form = document.createElement("form");
    const image = document.createElement("input");
    image.type="image";
    const title = document.createElement("input");
    const categorie = document.createElement("input");
    document.querySelector(".miniatures").append(form);
    form.append(image, title, categorie);
}
ajoutPhoto();