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


///////// MODIFY BUTTON ///////////////////

// Génération du mode édition (avec Template literals)
function generateButtonModify() {

  if (window.localStorage.token) {
    // Rendre visible l'élément modifier projets
    const elementEditProjects = document.querySelector('.js-open-button');
    elementEditProjects.style.display = "block";
  }
}

generateButtonModify();
