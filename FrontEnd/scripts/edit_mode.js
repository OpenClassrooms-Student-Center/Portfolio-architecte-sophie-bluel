////////////////// EDIT MODE /////////////////////////////

function bannerEdit() {
  const bannerEdit = document.createElement("div");
  bannerEdit.innerHTML = `
    <i class="fas fa-edit"></i>
    <p>&nbsp;Mode édition</p>
  `;
  bannerEdit.classList.add("edit-mode-banner");

  const headerHTML = document.querySelector("header");
  const headerMenu = document.querySelector(".header-menu");
  headerHTML.insertBefore(bannerEdit, headerMenu);
}

function editButton() {
  const editButton = document.createElement("button");
  editButton.innerHTML = `<i class="fas fa-edit"></i> modifier`;
  editButton.classList.add("edit-btn");
  editButton.classList.add("js-open-button");

  const titlePortfolio = document.getElementById("title-portfolio");
  titlePortfolio.after(editButton);
}

function removeFilters() {
  const filters = document.querySelector(".filters");
  filters.remove();
}

function generateModal() {
  const modal = document.createElement("dialog");
  modal.innerHTML = `
    <div class="header-modal">
      <button class="js-close-button close-btn" aria-labelledby="Close"><i class="fas fa-times header-fa"></i></button>
    </div>
    <div class="content-modal">
      <h2 class="title-modal">Galerie photo</h2>
      <div class="icons-gallery content">
      </div>
      <hr>
    </div>
    <div class="footer-modal">
      <button class="btn js-add-btn">Ajouter une photo</button>
    </div>
  `;
  modal.classList.add("modal");
  modal.setAttribute("id", "modal");

  const formSection = document.getElementById("form-section");
  formSection.after(modal);
}

function EditPage() {
  if (window.localStorage.getItem("token")) {
    console.log("token");
    bannerEdit();
    editButton();
    removeFilters();
    generateModal();
  } else {
    console.log("no token");
  }
}

EditPage();
