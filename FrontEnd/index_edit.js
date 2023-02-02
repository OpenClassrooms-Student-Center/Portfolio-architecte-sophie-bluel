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