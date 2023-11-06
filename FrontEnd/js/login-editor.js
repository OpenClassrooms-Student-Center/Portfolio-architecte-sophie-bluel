const localStorage = sessionStorage.getItem("userOnline");
const logout = document.getElementById("login");
const filter = document.querySelector(".button-filter");
const portfolioTitle = document.querySelector(".portfolio-title");
const introduction = document.querySelector("#introduction figure");


/**
 * Fonction pour générer le mode édition.
 */
const loginEditor = () => {

    const editorTop = document.createElement("div");
    editorTop.className = "login-edition";
    editorTop.innerHTML = `<a class="btn-edition"> <i class="fa-sharp fa-regular fa-pen-to-square"></i>login-edition</a>`;
    logout.textContent = "Logout";
    portfolioTitle.innerHTML +=`<a class="edit-portfolio btn-edit "> <i class="fa-sharp fa-regular fa-pen-to-square"></i>modifier</a>`;
    filter.style.cssText = "display: none;";
    /*Afficher est insérer au début de body */
    document.body.prepend(editorTop);
};

if (localStorage) {
    loginEditor();

    /**
     * Bouton de déconnexion.
     */
    logout.addEventListener("click", () => {
        sessionStorage.clear();
    });
}