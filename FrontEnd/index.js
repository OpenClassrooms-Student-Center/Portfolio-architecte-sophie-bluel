const gallery = document.querySelector(".gallery");
const filters = document.querySelector(".filters");

//Call the API to dynamically retrive the projects
async function getWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    return await response.json();
}
getWorks();   

//Display the gallery
async function addWorks() {
    gallery.innerHTML ="";
    const works = await getWorks();
    //console.log(works)
    works.forEach((work) => {
        createWorks(work);
    });
}
addWorks();

function createWorks(work) {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        img.src = work.imageUrl;
        figcaption.textContent = work.title;
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    }

// Retrive the category
async function getCategories() {
    const response = await fetch("http://localhost:5678/api/categories");
    return await response.json();
}
getCategories();

async function displayCategoriesButtons() {
    const categories = await getCategories();
    //console.log(categories);
    categories.forEach((category) => {
      const btn = document.createElement("button");
      btn.textContent = category.name;
      btn.id = category.id;
      filters.appendChild(btn);
    });
  }
  displayCategoriesButtons();


//Filter on click on button by category
async function filterCategory() {
    const category = await getWorks();
    //console.log(category);
    const buttons = document.querySelectorAll(".filters button");
    //console.log(buttons);
    buttons.forEach((button) => {
        button.addEventListener("click", (e) => {
          btnId = e.target.id;
          gallery.innerHTML = "";
          if (btnId !== "0") {
            const designSortCategory = category.filter((work) => {
              return work.categoryId == btnId;
            });
            designSortCategory.forEach((work) => {
              createWorks(work);
            });
          } else {
            addWorks();
          }
        });
      });
    }
    filterCategory();

//Admin mode
async  function admin() {

  if (sessionStorage.getItem("token")?.length == 143) {
    const body = document.querySelector("body");
    const editBar = document.createElement("div");
    const modalMode = document.createElement("p");
      editBar.className = "editBar";
      modalMode.innerHTML = `<i class="fa-regular fa-pen-to-square"></i>Mode édition`;
      body.insertAdjacentElement("afterbegin", editBar);
      editBar.append(modalMode);
      const modifier = `<i class="fa-regular fa-pen-to-square"></i>`;
      document.getElementById("edit").innerText = "modifier";
      document.querySelector("#portfolio h2").insertAdjacentHTML("afterend", modifier);
    
      document.querySelector(".filters").style.display = "none";
//Turning the login button to logout 
      document.getElementById("logoutButton").innerText = "logout";
//If the user is connected 
    logoutButton.addEventListener("click",(e) =>{
        e.preventDefault();
        sessionStorage.clear();
        window.location.href = "./index.html";
      });
    }
  }
admin() 

//Displaying the  gallery in the modal    
async function displayModalContent() {
  const modalContent = document.querySelector(".modalContent")
  modalContent.innerHTML ="";
  const works = await getWorks();
    works.forEach((work) => {
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      const span = document.createElement("span");
      const trash = document.createElement("i");
      trash.classList.add("fa-solid", "fa-trash-can");
      trash.id = work.id;
      img.src = work.imageUrl;
      span.appendChild(trash);
      figure.appendChild(span);
      figure.appendChild(img);
      modalContent.appendChild(figure);
    });
    deleatingWorks()
  };
displayModalContent()  


 
function shutDown() {
  const containerModal = document.querySelector(".containerModal") 
  const xmark = document.querySelector(".fa-xmark") 

  edit.addEventListener("click", () => {
   containerModal.style.display = "flex";
  });

//manage the closing of the model on the cross
  xmark.addEventListener("click", () => {
  containerModal.style.display = "none";
});
//manage the closing of the model by clicking outside it
containerModal.addEventListener("click", (e) => {   
  if (e.target.className == "containerModal") {
  containerModal.style.display = "none";
}
  });
 
}
shutDown()

//Deleting the works in the modal
async function deleatingWorks() {
  const trashCan = document.querySelectorAll(".fa-trash-can")
  //console.log(trashCan)
  trashCan.forEach(trash => {
    trash.addEventListener("click", () => {
      const id = trash.id
      const can = {
     method: "DELETE",
     headers:{'Content-Type': 'application/json'},
          }
       fetch("http://localhost:5678/api/works/"+id,can)   
       const response = fetch("http://localhost:5678/api/works/+id,can")
      
        .then((response) => {
        if(!response.ok); {
        //console.log ("error")
        }
        return response.json;
      })
     .then(()=>{
      //console.log("L'entrée de la base de données a été supprimée:",data);
    displayModalContent()
    addWorks()
    })
    
  });
});
} 
deleatingWorks()