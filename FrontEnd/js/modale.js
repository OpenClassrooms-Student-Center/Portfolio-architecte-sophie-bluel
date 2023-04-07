let modal = null
const focusableSelector = 'button, a, input, textarea'
let focusables = []
let previouslyFocusedElement = null


// création d'une fonction permettant d'ouvrir la modale //

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


// création d'une fonction permettant de fermer la modale //

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


// création d'une fonction permettant de ne pas propager la fermeture de la modale par bouton à son parent du DOM //

const stopPropagation = function (e) {        
    e.stopPropagation()                       
}


// fonction pour naviguer avec 'tab' et 'shift tab' dans la modale //

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


// ouverture modale via bouton admin //

document.querySelectorAll('.modifier').forEach(a => {   
    a.addEventListener('click', openModal)
})


// activation des fonctions avec utilisation de touche clavier (échap et tab) //

window.addEventListener('keydown', function (e) {     
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
    if (e.key === 'Tab' && modal !== null) {
        focusInModal(e)
    }
});



     