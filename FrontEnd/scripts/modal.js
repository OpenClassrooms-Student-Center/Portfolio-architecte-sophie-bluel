///////////// INDEX /////////////

// Récupération des works depuis l'API
const reponse = await fetch("http://localhost:5678/api/works");
const works = await reponse.json();

function generateIndex(works) {
  for (let i = 0; i < works.length; i++) {
    const icon = works[i];

    if (document.querySelector(".icons-gallery")) {
      // Récupération de l'élément du DOM qui accueillera les fiches
      const sectionGalleryModal = document.querySelector(".icons-gallery");
      // Création d’une balise dédiée à un work
      const workElement = document.createElement("div");
      workElement.dataset.id = works[i].id;
      workElement.classList.add("icon-modal");
      workElement.setAttribute("id", `work-project-${works[i].id}`);
      // Création de la balise img
      const imageElement = document.createElement("img");
      imageElement.src = icon.imageUrl;
      // Création de l'icône Delete
      const trashElement = document.createElement("button");

      trashElement.dataset.id = works[i].id;
      trashElement.classList.add("js-delete-btn");
      trashElement.classList.add("delete-btn");
      trashElement.innerHTML=`<i class="fas fa-trash-alt"></i>`;

      // On rattache la balise icon a la section Gallery
      sectionGalleryModal.appendChild(workElement);
      workElement.appendChild(imageElement);
      workElement.appendChild(trashElement);
    }
  }
}

/////////// DELETE ////////////////

async function fetchDelete(workId) {
  await fetch(`http://localhost:5678/api/works/${workId}`, { method: 'DELETE' });
}

function deleteWork() {
  const buttonsDelete = document.querySelectorAll(".js-delete-btn");

  buttonsDelete.forEach((button) =>
    button.addEventListener("click",() => {
      try {
        const workId = button.dataset.id;
        const work = document.getElementById(`work-project-${workId}`);
        const response = fetchDelete(workId);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        work.remove();

      } catch(error) {
        // message erreur projet non supprimé
        window.alert("Le projet n'a pas pu être supprimé.");
      }
    })
  );
}


///////////// NEW ////////////////
// interaction via les modal
// attendu ne doit pas recharger la page
// toutes les modifs doivent se faire avec le dom, et uniquement la partie concernée par la modification.

// Récupération des categories depuis l'API
const reponseCategories = await fetch("http://localhost:5678/api/categories");
const categories = await reponseCategories.json();
console.log(categories);

function setPreviousImage() {
  console.log("set previous");
  const inputContentImage = document.querySelector(".input-image");
  const inputPhoto = document.getElementById("photo");
  const previewImage = document.createElement("img");

  inputPhoto.onchange = evt => {
    const [files] = inputPhoto.files;
    console.log(inputPhoto);
    console.log(inputPhoto.files[0]);

    if (files) {
      previewImage.src = URL.createObjectURL(files);
      console.log("file");

      previewImage.setAttribute("id", "preview-image");
      // inputContentImage.innerHTML = "";
      inputContentImage.insertAdjacentHTML("afterbegin", previewImage.outerHTML);
    }
  }
}

async function fetchPost(userToken, newWorkJson) {
  await fetch("http://localhost:5678/api/works", {
    method: "POST",
    headers: {
      "Content-Type": 'application/json',
      "Authorization": `Bearer ${userToken}`,
    },
    body: newWorkJson,
  });
}

function createProject() {

  console.log("buttonPost");

  const footer = document.querySelector(".footer-modal");
  const buttonValidate = document.createElement("button");
  buttonValidate.innerText = "Valider";
  buttonValidate.classList.add("validate-btn");
  buttonValidate.classList.add("js-validate-btn");
  footer.insertAdjacentHTML("afterbegin", buttonValidate.outerHTML);

  const buttonPost = document.querySelector(".js-validate-btn");

  buttonPost.addEventListener("click", () => {
    try {

      console.log("fetch");

      const lastId = works.slice(-1)[0].id;
      const titleValue = document.getElementById("title").value;
      // const imageValue = document.getElementById("preview-image").src;
      const categoryValue = document.getElementById("category").value;
      const categoryId = (categories.find((category) => category.name === categoryValue)).id;
      const userId = window.localStorage.getItem("id");
      const userToken = window.localStorage.getItem("token").replace(/['"]+/g, '');

      // enregister dans une constante l'url de l'image
      // la console logger
      // tester de passer le fetch
      const imageUrl = document.getElementById("photo").files[0].name;


      const newWork = {
        id: lastId + 1,
        title: `${titleValue}`,
        imageUrl: `http://localhost:5678/images/${imageUrl}`,
        categoryId: parseInt(categoryId),
        userId: parseInt(userId),
      };

      // Création du newWork au format JSON
      const newWorkJson = JSON.stringify(newWork);
      console.log(newWorkJson);

      // Appel de la fonction fetch avec toutes les informations nécessaires
      const response = fetchPost(userToken, newWorkJson);
      console.log(response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch(error) {
      // message erreur projet non ajouté
      window.alert("Le projet n'a pas pu être ajouté.");
    }

  })
}

function addProject() {
  if (document.querySelector(".js-add-btn")) {

    const buttonAdd = document.querySelector(".js-add-btn");

    buttonAdd.addEventListener("click",() => {
      console.log("add");

      const title = document.querySelector(".title-modal");
      const content = document.querySelector(".content");
      const headerModal = document.querySelector(".header-modal");

      const arrow = document.createElement("i");
      arrow.classList.add("fa-solid");
      arrow.classList.add("fa-arrow-left");
      arrow.classList.add("header-fa");
      headerModal.insertAdjacentHTML("afterbegin", arrow.outerHTML);
      headerModal.style.justifyContent = "space-between";

      title.innerText = "Ajout photo";

      content.innerHTML = `
        <form action="#" method="post" class="add-form form-modal" id="form-new">
          <div class="input-image">
            <i class="fa-regular fa-image"></i>
            <input type="file" id="photo" name="photo" accept="image/png, image/jpeg"/>
            <label id="photo-label" for="photo">
              + Ajouter photo
            </label>
            <div id="photo-type">jpg, png : 4mo max</div>
          </div>
          <div class="inputs">
            <label for="title">Titre</label>
            <input type="text" name="title" id="title">
          </div>
          <div class="inputs">
            <label for="category">Catégorie</label>
            <select name="category" id="category">
              <option value=""></option>
            </select>
          </div>
        </form>
      `;

      categories.forEach(category => {
        const selectValue = document.createElement("option");
        const selectElement = document.getElementById("category");

        selectValue.innerHTML =`${category.name}`;
        selectValue.setAttribute("value", `${category.name}`);
        selectElement.insertAdjacentHTML("beforeend", selectValue.outerHTML);
      });

      setPreviousImage();

      buttonAdd.remove();

      createProject();
    });


  }
}

addProject();

///////////// OPEN AND CLOSE MODAL //////////////

function callModal() {
  const modal = document.querySelector('#modal');

  if (document.querySelector('.js-open-button')) {
    const openModal = document.querySelector('.js-open-button');
    openModal.addEventListener("click", () => {
      modal.showModal();
    })
  }
  if (document.querySelector('.js-close-button')) {
    const closeModal = document.querySelector('.js-close-button');
    closeModal.addEventListener("click", () => {
      modal.close();
    })
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }

  generateIndex(works);
}

callModal();
