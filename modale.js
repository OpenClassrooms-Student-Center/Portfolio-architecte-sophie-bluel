let modal = null
const focusableSelector= 'button, a, input, textarea'
let focusables = []
let previouslyFocusedElement = null

const openModal = function (e){
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
    if(previouslyFocusedElement !== null) previouslyFocusedElement.focus()
    e.preventDefault()
    modal.style.display = "none"
    modal.setAttribute('aria-hidden', 'true')
    modal.removeAttribute('aria-modal')
    modal.removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-close').removeEventListener('click', closeModal)
    modal.querySelector('.js-modal-stop').removeEventListener('click', stopPropagation)
    modal = null
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

const focusInModal = function (e) {
    e.preventDefault()
    let index = focusables.findIndex(f => f === modal.querySelector(':focus'))
    if(e.shiftKey === true) {
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

document.querySelectorAll('.modifier').forEach(a =>{
    a.addEventListener('click', openModal) 
})

window.addEventListener('keydown', function (e){
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
    if (e.key === 'Tab' && modal !== null) {
        focusInModal(e)
    }
});


async function getWorks(){
    const res = await fetch("http://localhost:5678/api/works");
    const data = await res.json();
    return data;
}
   
async function createModaleGallery(){
       const works = await getWorks();
       const gallery = document.querySelector(".modal-gallery");
       
       let categories = [];
   
       works.forEach(work=> {
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
           element.appendChild(imgElement);
           element.appendChild(captionElement);
           element.appendChild(buttonElement);
           buttonElement.appendChild(iconElement);      
           gallery.appendChild(element);
   
           categories.push(work.category.name);
       });
};

createModaleGallery();