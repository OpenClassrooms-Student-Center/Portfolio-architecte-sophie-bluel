// Même fonction que pour la création de la gallerie de travaux mais à l'intérieur de la modale //

async function createModaleGallery() {     
    const works = await getWorks();
    const gallery = document.querySelector(".modal-gallery");
    gallery.innerHTML = '';

    let categories = [];

    works.forEach(work => {
        const element = document.createElement("figure");
        const imgElement = document.createElement("img");
        const captionElement = document.createElement("figcaption");
        const buttonElement = document.createElement("button");
        const iconElement = document.createElement("i");
        buttonElement.classList.add("delete-work");
        iconElement.classList.add("fa-regular", "fa-trash-can");
        captionElement.innerText = 'éditer';
        imgElement.src = work.imageUrl;
        element.dataset.category = work.category.name;
        element.dataset.id = work.id;
        element.appendChild(imgElement);
        element.appendChild(captionElement);
        element.appendChild(buttonElement);
        buttonElement.appendChild(iconElement);
        gallery.appendChild(element);

        // suppression d'un travaux en cliquant sur le bouton 'corbeille' //

        categories.push(work.category.name);            
        buttonElement.addEventListener('click', function (e) {        
            e.preventDefault();
            const workId = e.target.closest('figure').dataset.id;
            deleteWork(workId);
        })
    });
};

createModaleGallery();


// fonction permetteant de supprimer un travaux via api //

async function deleteWork(id) {  
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: "DELETE",
            headers: {Authorization: `Bearer ${token}`}
        });
        console.log(res.status);
        if(res.status === 204){
            document.querySelectorAll(`figure[data-id="${id}"]`).forEach(element => {
                element.remove();
            });
        }

    } catch (error) {
      console.log(error)
    }
}


// en cliquant sur 'ajouter une photo' on cache la modale 1 et on fait apparaître la modale 2 //

document.querySelector(".navbutton-add-photo").addEventListener("click",function(){     
    document.querySelector('.modale1').classList.add("no-show");                        
    document.querySelector('.modale2').classList.remove("no-show"); 
    document.querySelector('.return-back').classList.remove("no-show");
})

// en cliquant sur la flèche on retourne dans la modale 1 //

document.querySelector(".return-back").addEventListener("click",function(){    
    document.querySelector('.modale2').classList.add("no-show");
    document.querySelector('.modale1').classList.remove("no-show");
    document.querySelector('.return-back').classList.add("no-show");
})


// lorsqu'un fichier est sélectionner il est prévisualisable dans la modale 2 //

const uploadButton = document.querySelector("#upload-button");    
let chosenImage = document.getElementById("chosen-image");
let srcChosenimage = chosenImage.getAttribute('src');

uploadButton.onchange = () => {                             
    let reader = new FileReader();
    reader.readAsDataURL(uploadButton.files[0]);
    console.log(uploadButton.files[0]);
    reader.onload = () => {
        chosenImage.setAttribute("src",reader.result);
        document.querySelector('.mo-max').classList.add("no-show");
        document.querySelector('.span-icon').classList.add("no-show");
        document.querySelector('.button-add-photo').classList.add("no-show");
        chosenImage.classList.remove("no-show");
        checkForm();
    }
}


// on vérifie içi avec une fonction si tout le formulaire est rempli avant de pouvoir l'envoyer //

function checkForm(){                  
     const imgElement = document.querySelector("#chosen-image").getAttribute('src');
     const inputElement = document.querySelector(".input-title").value;
     const selectElement = document.querySelector(".select-category").selectedIndex;
     if(imgElement !== null && inputElement !== "" && selectElement !== 0){
        document.querySelector('.valid-button').classList.add("active-button");
        document.querySelector('.valid-button').removeAttribute('disabled');

     }
     else{
        document.querySelector('.valid-button').classList.remove("active-button");
        document.querySelector('.valid-button').setAttribute('disabled',true);
     }
    }

document.querySelector(".input-title").addEventListener("input",checkForm);
document.querySelector(".select-category").addEventListener("change",checkForm);


// envoi du formulaire via l'api //

const newWorkform = document.querySelector('.form-add-photo');
newWorkform.addEventListener("submit",async function(e){         
    e.preventDefault();
    const formData = new FormData(newWorkform);
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5678/api/works`, {
            method: "POST",
            headers: {Authorization: `Bearer ${token}`},
            body: formData,
        });
        if(res.status === 201){
            newWorkform.reset();
            document.querySelector('.button-add-photo').classList.remove("no-show");
            document.querySelector('#chosen-image').classList.add("no-show");
            document.querySelector('.mo-max').classList.remove("no-show");
            document.querySelector('.span-icon').classList.remove("no-show");
            document.querySelector(".return-back").click();
            createModaleGallery();
            createGallery();    
        } 
    } catch (error) {
      console.log(error)
    }
});