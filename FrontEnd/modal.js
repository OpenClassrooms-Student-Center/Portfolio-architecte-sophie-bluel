// ------------ CONSTANTES ------------
// On sélectionne nos modales et nos boutons dans le DOM
const modal = document.getElementById("modale-principale");
const modalTwo = document.getElementById("modale-secondaire");
const boutonAjouter = document.querySelector(
  "#modale-principale-bouton-ajouter"
);
const boutonFermerModaleSecondaire = document.querySelectorAll(
  ".modale-close, .modale-principale-bouton-fermer"
);
const flecheGauche = document.querySelector(".fa-arrow-left");
const boutonValidation = document.querySelector("#bouton-validation");
const form = document.querySelector(".formulaire-image");
const conteneurPrevisualisationImage = document.querySelector(
  ".conteneur-previsualisation-image"
);
const fichierChoisi = document.querySelector("#fichier-choisi");
const labelInput = document.querySelector(".grey-color");

// ------------ LOGIQUE PRINCIPALE ------------

// Affichage de la modale secondaire lors du clic sur le bouton d'ajout
boutonAjouter.addEventListener("click", () => {
  modalTwo.style.display = "flex";
  modalTwo.style.justifyContent = "center";
  modalTwo.style.alignItems = "center";
  modal.style.display = "none";
});

// Lorsque l'on clique sur la flèche gauche, on retourne à la modale principale
flecheGauche.addEventListener("click", () => {
  modalTwo.style.display = "none";
  modal.style.display = "flex";
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";
});

// Si l'on clique sur l'un des deux boutons d'édition, on ouvre la modale

function initEventListeners() {
  const boutonModifier = document.querySelector(".button-edition");
  const boutonModifierAdmin = document.querySelector(".bouton-modifier-admin");
  const boutonModifierSecond = document.querySelector(".fa-pen-to-square");
  const boutonModifierThird = document.querySelector(".bouton-modifier");

  boutonModifier.addEventListener("click", () => {
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
  });

  boutonModifierAdmin.addEventListener("click", () => {
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
  });

  boutonModifierSecond.addEventListener("click", () => {
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
  });

  boutonModifierThird.addEventListener("click", () => {
    modal.style.display = "flex";
    modal.style.justifyContent = "center";
    modal.style.alignItems = "center";
  });
}

const closeMainModal = document.querySelector(
  ".modale-principale-bouton-fermer"
);
const closeModal = document.querySelector(".modale-close");

closeMainModal.addEventListener("click", () => {
  modal.style.display = "none";
});

closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  modalTwo.style.display = "none";
});

// Lorsque l'on clique sur la flèche gauche ou le bouton de validation, on réinitialise la prévisualisation de l'image
[flecheGauche, boutonValidation].forEach((button) => {
  button.addEventListener("click", () => {
    conteneurPrevisualisationImage.style.backgroundImage = "none";
    document.querySelector(".conteneur-formulaire").style.display = "flex";
  });
});

// Lorsque l'on clique en dehors de la modale principale, on la ferme
window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
});

// Lorsque l'on clique en dehors de la modale secondaire, on la ferme
window.addEventListener("click", (e) => {
  if (e.target == modalTwo) {
    modalTwo.style.display = "none";
  }
});

// Lorsque le formulaire est soumis, on envoie une requête POST au serveur avec les informations de l'image et on met à jour le localStorage et la modale
form.addEventListener("submit", (e) => {
  var token = localStorage.getItem("token");
  e.preventDefault();

  const formData = new FormData();
  formData.append("image", document.querySelector("#fichier-choisi").files[0]);
  formData.append("title", document.querySelector("#titre-projet").value);
  formData.append(
    "category",
    document.querySelector("#categorie-projet").value
  );

  fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + token,
    },
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Network response was not ok");
      }
    })
    .then(() => {
      modalTwo.style.display = "none";
      modal.style.display = "none";

      initImages();
      form.reset();
      conteneurPrevisualisationImage.style.backgroundImage = "none";
      document.querySelector(".conteneur-formulaire").style.display = "flex";

      verifierChamps();
    })
    .catch((error) => {
      console.error(
        "There has been a problem with your fetch operation: ",
        error
      );
    });
});

// Lorsqu'un fichier est sélectionné, on l'affiche dans le conteneur de prévisualisation
fichierChoisi.addEventListener("change", function (event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onloadend = function () {
    conteneurPrevisualisationImage.style.backgroundImage =
      "url(" + reader.result + ")";
    conteneurPrevisualisationImage.style.backgroundSize = "contain";
    conteneurPrevisualisationImage.style.backgroundRepeat = "no-repeat";
    conteneurPrevisualisationImage.style.backgroundPosition = "center";
    document.querySelector(".conteneur-formulaire").style.display = "none";
  };

  if (file) {
    reader.readAsDataURL(file);
  }
});

const titreProjet = document.querySelector("#titre-projet");
const categorieProjet = document.querySelector("#categorie-projet");

// Cette fonction vérifie si tous les champs sont remplis et active ou désactive le bouton de validation en conséquence
// Elle change également la couleur du label du champ du fichier
function verifierChamps() {
  const fichierChoisi = document.querySelector("#fichier-choisi");
  const imageSelectionnee =
    fichierChoisi.files && fichierChoisi.files.length > 0;

  const titreRempli = titreProjet.value.trim() !== "";
  const categorieRemplie = categorieProjet.value.trim() !== "";

  const allFieldsFilled = imageSelectionnee && titreRempli && categorieRemplie;
  boutonValidation.disabled = !allFieldsFilled;

  if (allFieldsFilled) {
    labelInput.classList.remove("grey-color");
    labelInput.classList.add("green-color");
  } else {
    labelInput.classList.remove("green-color");
    labelInput.classList.add("grey-color");
  }
}

// On ajoute des écouteurs d'événements pour vérifier les champs chaque fois que leur contenu change
fichierChoisi.addEventListener("change", verifierChamps);
titreProjet.addEventListener("input", verifierChamps);
categorieProjet.addEventListener("change", verifierChamps);

// On vérifie les champs dès que le document est chargé
verifierChamps();
