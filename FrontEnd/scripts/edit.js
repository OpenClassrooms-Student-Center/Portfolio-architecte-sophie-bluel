///////////// MODAL //////////////

function generateModal() {
  const modal = document.querySelector('#modal');

  // falsy truthy assimilé à true ou à false quand on va en évaluer la valeur
  // les expressions dans le if true/false
  // pl

  if (document.querySelector('.js-open-button')) {
    const openModal = document.querySelector('.js-open-button');
    openModal.addEventListener("click", () => {
      modal.showModal();
    })
  }
  const closeModal = document.querySelector('.js-close-button');
  closeModal.addEventListener("click", () => {
    modal.close();
  })

  // Générer modal index

  // Générer modal new

  // Générer modal create

  // Générer delete
}

generateModal();

// interaction via les modal
// attendu ne doit pas recharger la page
// toutes les modifs doivent se faire avec le dom, et uniquement la partie concernée par la modification.


///////// EDIT MODE ///////////////////

// Génération du mode édition (avec Template literals)
export function generateEditHTML() {

  if (window.localStorage.token) {
    // Insertion de la barre mode édition
    const header = document.querySelector("header");
    const menu = document.querySelector(".header-menu");
    const sectionEditMode = document.createElement("div");
    sectionEditMode.innerHTML=
      `<i class="fas fa-edit"></i>
      <p>&nbsp;Mode édition</p>`
    ;
    // Ajout du Css
    sectionEditMode.classList.add("edit-mode-banner");
    // sectionLogIn.setAttribute("id", "login-form")
    header.insertBefore(sectionEditMode, menu);

    // Rendre visible l'élément modifier projets
    const elementEditProjects = document.querySelector('.js-open-button');
    elementEditProjects.style.display = "block";
  }
}

generateEditHTML();
