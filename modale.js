let modal = null
const focusableSelector = 'button, a, input, textarea'
let focusables = []
let previouslyFocusedElement = null

const openModal = function (e) {
    e.preventDefault()
    modal = document.querySelector(e.target.getAttribute('href'))
    focusables = Array.from(modal.querySelectorAll(focusableSelector))
    previouslyFocusedElement = document.querySelector(':focus')
    focusables[0].focus()
    modal.style.display = null
    modal.removeAttribute('aria-hidden')
    modal.setAttribute('aria-modal', 'true')
    modal.addEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').addEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').addEventListener('click', stopPropagation)
}

const closeModal = function (e) {
    if (modal === null) return
    if (previouslyFocusedElement !== null) previouslyFocusedElement.focus()
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    document.querySelector('.modale1').classList.remove("no-show");
    document.querySelector('.modale2').classList.add("no-show");
    document.querySelector('.return-back').classList.add("no-show");
    modal = null
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

const focusInModal = function (e) {
    e.preventDefault()
    let index = focusables.findIndex(f => f === modal.querySelector(':focus'))
    if (e.shiftKey === true) {
        index--
    } else {
        index++
    }
    if (index >= focusables.length) {
        index = 0
    }
    if (index < 0) {
        index = focusables.length - 1
    }
    focusables[index].focus()
}

document.querySelectorAll('.modifier').forEach(a => {
    a.addEventListener('click', openModal)
})

window.addEventListener('keydown', function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
    if (e.key === 'Tab' && modal !== null) {
        focusInModal(e)
    }
});


async function getWorks() {
    const res = await fetch("http://localhost:5678/api/works");
    const data = await res.json();
    return data;
}

async function createModaleGallery() {
    const works = await getWorks();
    const gallery = document.querySelector(".modal-gallery");

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

        categories.push(work.category.name);
        buttonElement.addEventListener('click', function (e) {
            e.preventDefault();
            const workId = e.target.closest('figure').dataset.id;
            deleteWork(workId);
        })
    });
};

createModaleGallery();

async function deleteWork(id) {
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5678/api/works/${id}`, {
            method: "DELETE",
            headers: {Authorization: `Bearer ${token}`}
        });
        if(res.status === 200){
            document.querySelector(`figure[data-id="${id}"]`).style.display='none';
        }

    } catch (error) {
      console.log(error)
    }
}

document.querySelector(".navbutton-add-photo").addEventListener("click",function(){
    document.querySelector('.modale1').classList.add("no-show");
    document.querySelector('.modale2').classList.remove("no-show");
    document.querySelector('.return-back').classList.remove("no-show");
})

document.querySelector(".return-back").addEventListener("click",function(){
    document.querySelector('.modale2').classList.add("no-show");
    document.querySelector('.modale1').classList.remove("no-show");
    document.querySelector('.return-back').classList.add("no-show");
})


const uploadButton = document.querySelector("#upload-button");
const addphotoButton = document.querySelector(".button-add-photo");

function uploadbuttonActive(){
    uploadButton.click()
}

addphotoButton.addEventListener('click', function () {
    uploadbuttonActive()
});



uploadButton.onchange = () => {
    let reader = new FileReader();
    reader.readAsDataURL(uploadButton.files[0]);
    console.log(uploadButton.files[0]);
    reader.onload = () => {
        chosenImage.setAttribute("src",reader.result);
        document.querySelector('.mo-max').classList.add("no-show");
        document.querySelector('.span-icon').classList.add("no-show");
        document.querySelector('.button-add-photo').classList.add("no-show");
        document.querySelector('#chosen-image').classList.remove("no-show");
        checkForm();
    }
}

let chosenImage = document.getElementById("chosen-image");
let srcChosenimage = chosenImage.getAttribute('src');

if (srcChosenimage == null){
 
}
else {

}

function checkForm(){
     const imgElement = document.querySelector("#chosen-image").getAttribute('src');
     const inputElement = document.querySelector(".input-title").value;
     const selectElement = document.querySelector(".select-category").selectedIndex;
     console.log(imgElement);
     console.log(inputElement);
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
const newWorkform = document.querySelector('.form-add-photo');
newWorkform.addEventListener("submit",async function(e){
    e.preventDefault();
    const formData = new FormData(newWorkform);
    formData.append("test","testvalue");
    for(const value of formData.values()){
        console.log(value)
    };
    try {
        const token = localStorage.getItem("token");
        const res = await fetch(`http://localhost:5678/api/works`, {
            method: "POST",
            headers: {Authorization: `Bearer ${token}`},
            body: formData,

        });
        if(res.status === 200)
        {
            console.log('formsent')
        }

    } catch (error) {
      console.log(error)
    }
});


     