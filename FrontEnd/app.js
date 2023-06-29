import modalGallery from "./modal.js";
import modalAddPhoto from "./modalAddphoto.js";



const saveBar = document.querySelector(".save__bar");
const modal = document.querySelector(".modal");

let works = [];
let categories = [];

getDatas();


const closeModal = () => {

  const closeModalHandler = () => {
    saveBar.style.display = "none";
    modal.style.display = "none";
  };

  // Close modal when close button is clicked
  document.querySelector(".fa-xmark").addEventListener("click", closeModalHandler);

  // Close modal when click occurs outside the modal
  
};







const displayGalleryModal = () => {
  modal.innerHTML = modalGallery;
  const picturesContainer = document.querySelector(".pictures__container");
  picturesContainer.innerHTML = "";
  works.forEach((work) => {
    const figure = document.createElement("figure");
    figure.innerHTML = `
                          <img src="${work.imageUrl}" alt="${work.title}">
                          <div class="pictures__container__icons">
                            <i class="fa-solid fa-arrows-up-down-left-right"></i>	
                            <i class="fa-solid fa-trash-can"></i>
                          </div>
                          <figcaption>éditer</figcaption>
                          `;
    picturesContainer.appendChild(figure);
  });
  closeModal();
  document
    .querySelector(".btn--addphoto")
    .addEventListener("click", displayAddPhotosModal);
};

const displayAddPhotosModal = () => {
  modal.innerHTML = "";
  modal.innerHTML = modalAddPhoto;
  closeModal();
  document.querySelector(".fa-arrow-left").addEventListener("click", displayGalleryModal)
  const catList = document.querySelector("#cat");
  categories.forEach ((cat) => {
    const option = document.createElement("option")
    option.innerHTML=`<option value="${cat.id}">${cat.name}</option>`
    catList.appendChild(option)
  });
  
  const validateButton = document.querySelector(".btn--validate");

  validateButton.addEventListener("click", () => {
    let catIndex = categories.findIndex(cat => cat.name === catList.value);
    let titleValue = document.querySelector("#title").value;
    let imageValue = document.querySelector("#file").files[0];
    
    
    if (catIndex>=0  && titleValue && imageValue) {
      postNewProjectData(catIndex, titleValue, imageValue);
    } else {
      console.log("herllo")
    }
  })

  

};

const postNewProjectData = async (index, title, imageFile) => {
  const url = 'http://localhost:5678/api/works';
  const token = sessionStorage.getItem("token");
  const formData = new FormData();
  formData.append('image' , imageFile, imageFile.name);
  formData.append('title', title);
  formData.append('category', index);

  try {
    const postProject = await fetch(url, {
      method: 'POST',
      headers: {
        'accept':'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });
      const res = await postProject.json();
      console.log(res);
  } catch (e) {
    console.error("error", e);
  }
};

const modalContent = () => {
  saveBar.style.display = "block";
  modal.style.display = "flex";

  displayGalleryModal();
  closeModal();
  

  document
    .querySelector(".btn--addphoto")
    .addEventListener("click", displayAddPhotosModal);
};


const isLogged = () => {
  const login_btn = document.querySelector(".login_btn");
  login_btn.innerText = "Logout";
  login_btn.href = "#";
  login_btn.addEventListener("click", (e) => {
    e.preventDefault;
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("id");
    login_btn.innerText = "Login";
    login_btn.href = "./loggin.html";
  });
}

const isToken = sessionStorage.getItem("token");

if (isToken) {
  isLogged();
  

  const modifyBtn = document.querySelector(".modify__btn");
  modifyBtn.style.display = "inline-block";

  modifyBtn.addEventListener("click", modalContent);
}

async function getDatas() {
  try {
    const resCat = await fetch("http://localhost:5678/api/categories");
    categories = await resCat.json();
    const resWorks = await fetch("http://localhost:5678/api/works");
    works = await resWorks.json();
    createFilterButtons(categories, works);
    createGallery(works);
  } catch (error) {
    console.error("Fail to fetch datas : ", error);
  }
}

const createFilterButtons = (categories, works) => {
  const allButton = document.createElement("button");
  const filterButtonsContainer = document.getElementById("filter__btn");
  allButton.innerText = "Tous";
  allButton.classList.add("btn");
  filterButtonsContainer.appendChild(allButton);
  categories.forEach((element) => {
    const filterButton = document.createElement("button");
    filterButton.innerText = element.name;
    filterButton.name = element.id;
    filterButton.classList.add("btn");
    filterButtonsContainer.appendChild(filterButton);
  });

  const allFilterButtons = document.querySelectorAll(".btn");
  allFilterButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const buttonId = e.target.name;
      if (buttonId === "") {
        createGallery(works);
      } else {
        const filteredArray = works.filter(
          (work) => work.categoryId == buttonId
        );
        createGallery(filteredArray);
      }
    });
  });
};

const createGallery = (works) => {
  const galleryContainer = document.querySelector(".gallery");
  galleryContainer.innerHTML = ""; // Clear the gallery container
  works.forEach((work) => {
    const figure = document.createElement("figure");
    figure.innerHTML = `
                            <img src="${work.imageUrl}" alt="${work.title}">
                            <figcaption>${work.title}</figcaption>
                            `;

    galleryContainer.appendChild(figure);
  });
};
