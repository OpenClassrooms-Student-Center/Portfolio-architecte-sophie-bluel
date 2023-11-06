const localStorage = sessionStorage.getItem("userOnline");
const logout = document.getElementById("login");
const filter = document.querySelector(".button-filter");
const portfolioTitle = document.querySelector(".portfolio-title");
const introduction = document.querySelector("#introduction figure");

/**
 * Fonction pour afficher le mode édition.
 */
const loginEditor = () => {
    const editorTop = document.createElement("div");
    editorTop.className = "login-edition";
    editorTop.innerHTML = `<a class="btn-edition"> <i class="fa-sharp fa-regular fa-pen-to-square"></i>Mode édition</a>`;
    logout.textContent = "Logout";
    const btnModal = document.getElementById("modalBtn").style.display = "block";
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