let modal = null

const openModal = function(e) {
    e.preventDefault();/* bloque fonctionnement normal du click*/
    const target = document.querySelector(e.target.getAttribute("href"));/*élément cible*/
    target.style.display = null ;
    target.removeAttribute("aria-hidden"); /*supprime attribut pour permettre apparition modale*/
    target.setAttribute("aria-modal", "true");/*cf accessibilité*/
    modal = target;
    modal.addEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal);
    modal.querySelector(".js-modal-close-return").addEventListener("click", closeModalReturn);
    window.addEventListener("click", (event) => {
        closeModal(dialog)
});
};

const closeModal = function(e) {
    if (modal === null) return
    e.preventDefault();
    modal.style.display = "none";
    modal.setAttribute("aria-hidden", "true"); /*ajoute attribut pour disparition modale*/
    modal.removeAttribute("aria-modal");
    modal.removeEventListener("click", closeModal);
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal);
    modal = null;
}

const closeModalReturn = function (e) {
    e.preventDefault();
    window.location.replace("index.html");
}

document.querySelectorAll(".modification-link").forEach(a => {
    a.addEventListener("click", openModal)
});

window.addEventListener('keydown', function (e){
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e);
    };
});


//  afficher tous les travaux //
async function displayWorksModal() {
    // Récupération des travaux depuis l'API
    const reponse = await fetch("http://localhost:5678/api/works");
    const works = await reponse.json();
    console.log(works)
    for (let work of works) {
        // Récupération de l'élément du DOM qui accueillera les travaux
        const modalGallery = document.querySelector(".gallery-modal");
        // Création d’une balise dédiée à un work
        const workElement = document.createElement("figure");
        // Création des balises 
        const imageElement = document.createElement("img");
        imageElement.src = work.imageUrl;
        imageElement.alt = work.title;
        imageElement.crossOrigin = "anonymous";
        const buttonElement = document.createElement("button");
        buttonElement.className ="photo-remove";
        //buttonElement.id = work.id;
        const imageButtonElement = document.createElement("img");
        imageButtonElement.src ="./assets/icons/remove.png";
        imageButtonElement.alt ="remove";
        const figcaptionElement = document.createElement("figcaption");
        figcaptionElement.innerText = "éditer";
                
        modalGallery.appendChild(workElement);
        workElement.appendChild(imageElement);
        workElement.appendChild(buttonElement);
        buttonElement.appendChild(imageButtonElement);
        workElement.appendChild(figcaptionElement);
        };
};
displayWorksModal();

//effacer image de la galerie suite à click sur icone//
async function removeGallery() {
    const photoRemove = document.querySelector(".photo-remove");
    photoRemove.addEventListener("click", async function (event) {
    const photoId = event.target.dataset.id;
    console.log(photoId);
    document.querySelector(".gallery-edit").innerHTML ="";
    window.localStorage.removeItem( );
    getWorks();
    });
};