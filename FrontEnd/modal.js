//Récupération des boutons de la modale
const containerModal = document.getElementById("containerModal");
const openButton = document.getElementById("openModal");
const closeButton = document.getElementById("closeModal");

// Ajout d'un AddEventListener pour l'ouverture de la modale
openButton.addEventListener("click", () => {
    containerModal.style.display = "block";
});

// Ajout d'un AddEvenetListener pour la fermeture de la modale
closeButton.addEventListener("click", () => {
    containerModal.style.display = "none";
});

//Fermeture de la modale si l'utilisateur clique en dehors de la modale.
window.addEventListener("click", (event) => {
    if (event.target === containerModal) {
        containerModal.style.display = "none";
    }
});



