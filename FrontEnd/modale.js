// Attendre que le DOM soit chargé pour exécuter le code JavaScript
document.addEventListener("DOMContentLoaded", () => {
  // Fonction pour créer la modale et son contenu
  function createModal1() {
    // Récupérer les éléments existants dans le HTML
    const modalContainer1 = document.getElementById("modal-container1");
    const modalContent1 = document.getElementById("modal-content1");

    return { modalContainer1, modalContent1 };
  }

  // Fonction pour récupérer les données de l'API works
  function getWorksDataModal() {
    return fetch("http://localhost:5678/api/works")
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Erreur lors de la récupération des données de l'API works"
          );
        }
        return response.json();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Appel de la fonction pour créer la modale et son contenu et stockage des éléments dans des variables pour les réutiliser plus tard
  const { modalContainer1, modalContent1 } = createModal1();

  getWorksDataModal()
    .then((works) => {
      createModalItems(works, modalContent1);
    })
    .catch((error) => {
      console.error(error);
    });

  // Fonction pour créer la galerie dans la modale après avoir récupéré les données de l'API
  function createModalItems(works, modalContent1) {
    modalContent1.innerHTML = "";

    works.forEach((work) => {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const deleteIcon = document.createElement("i");

      img.src = work.imageUrl;
      img.alt = work.title;
      img.dataset.id = work.id;

      deleteIcon.classList.add("fas", "fa-trash-alt");
      deleteIcon.addEventListener("click", (event) => {
        event.preventDefault();

        const confirmation = confirm("Voulez-vous supprimer cette entrée ?");
        if (confirmation) {
          deletePhoto(work.id, figure);
          console.log(`L'élément ${work.id} a été supprimé de la modale.`);
        }
      });

      figure.appendChild(img);
      figure.appendChild(deleteIcon);
      modalContent1.appendChild(figure);
    });
  }

  // Fonction pour supprimer une photo
  function deletePhoto(id, figure) {
    const token = localStorage.getItem("token");

    fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          figure.remove();
          getWorksDataModal()
            .then((works) => {
              createModalItems(works, modalContent1);
              createGalleryItems(works, gallery);
            })
            .catch((error) => {
              console.error(error);
            });
          console.log(`Photo avec l'ID ${id} supprimée de la modale.`);
        } else {
          throw new Error(
            `Erreur lors de la suppression de la photo avec l'ID ${id} de la modale.`
          );
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  // Ajouter un écouteur d'événement au bouton de fermeture de la modale
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("close-modal")) {
      modalContainer1.classList.toggle("active");
      event.stopPropagation();
    }
  });

  // Ajouter un écouteur d'événement au bouton d'ouverture/fermeture de la modale
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("modal-trigger")) {
      modalContainer1.classList.toggle("active");
    }
  });
});
