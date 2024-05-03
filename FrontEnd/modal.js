const jsModal = document.querySelector(".js-modal");
const modalHidden = document.querySelector(".modal-hidden");
const modal = document.getElementById("modal1");
const modalClosed = document.querySelector(".js-modal-closed");
const btnLogin = document.getElementById("login");
const btnLogout = document.getElementById("logout");
const editMode = document.querySelector(".edit-mode");
const icon = document.querySelector(".edit-img");
const btnFilter = document.querySelector(".btn-filter");


if (sessionStorage.getItem("token")) {
    // On retire les boutons filtres
    btnFilter.classList.add("btn-hidden");
    // On fait apparaître le bouton "modifier" et on remplace "login" par "logout" 
    jsModal.classList.add("js-modal-log");
    btnLogout.removeAttribute("id");
    btnLogin.setAttribute("id", "login-none");
    // On ajoute la bannière du mode "edit"
    editMode.classList.add("edit-mode-attribute");
    // Ajout de l'icône 
    const icon = document.createElement("img");
    editMode.appendChild(icon);
    icon.src = "assets/icons/edit-icon-white.svg";
    // Ajout du texte de la bannière
    const text = document.createElement("p");
    editMode.appendChild(text);
    text.innerHTML = "Mode édition";
}

// On se déconnecte au click sur le bouton logout
btnLogout.addEventListener("click", () => {
    sessionStorage.clear();
    btnFilter.classList.remove("btn-hidden");
    btnLogin.setAttribute("id", "login");
    btnLogout.setAttribute("id", "logout");
    jsModal.classList.remove("js-modal-log");
    editMode.classList.remove("edit-mode-attribute");
    editMode.remove("p");
    editMode.remove("img");
})

// Gestion de la modale
jsModal.addEventListener("click", () => {
    modalHidden.classList.add("modal-uncovered");
    modalHidden.removeAttribute("aria-hidden");
    modalHidden.setAttribute("aria-modal", "true") ;
    
    modal.addEventListener("click", () => { 
        modalHidden.classList.remove("modal-uncovered");
        modalHidden.setAttribute("aria-hidden", "true");
        modalHidden.removeAttribute("aria-modal");
        })
});
