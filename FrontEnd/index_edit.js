let modal = null

const openModal = function(e) {
    e.preventDefault();/* bloque fonctionnement normal du click*/
    const target = document.querySelector(e.target.getAttribute("href"));/*élément cible*/
    target.style.display = null ;
    target.removeAttribute("aria-hidden"); /*supprime attribut pour permettre apparition modale*/
    target.setAttribute("aria-modal", "true");/*cf accessibilité*/
    modal = target;
    /*modal.addEventListener("click", closeModal);*/
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
    /*modal.removeEventListener("click", closeModal);*/
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal);
    modal = null;
}

const closeModalReturn = function (e) {
    e.preventDefault();
    window.location.replace("index_edit.html");
}

document.querySelectorAll(".modification-link").forEach(a => {
    a.addEventListener("click", openModal)
});

window.addEventListener('keydown', function (e){
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e);
    };
});

let works = window.localStorage.getItem("works");

if (works === null){
// Récupération des pièces depuis l'API
	const reponse = await fetch("http://localhost:5678/api/works");
	works = await reponse.json();
	// Transformation des pièces en JSON
	const valueWorks = JSON.stringify(works);
	// Stockage des informations dans le localStorage
	window.localStorage.setItem("works", valueWorks);
}else{
	works = JSON.parse(works);
}

// Recupérer et afficher tous les travaux //
async function getWorks() {
    for(let work of works) {
        document.querySelector(".gallery-edit").innerHTML += `<figure>
                                                        <img class="gallery-edit-img" src=${work.imageUrl} alt="" crossorigin="anonymous">
                                                        <button class="photo-remove" data-id=${work.id}><img src="./assets/icons/remove.png" alt="remove"></button>
                                                        <figcaption>éditer</figcaption>
                                                        </figure>`
    };
};
getWorks();

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