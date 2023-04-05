let modal = null
const focusableSelector = 'button, a, input, textarea'
let focusables = []
let previouslyFocusedElement = null

const openModal = function (e) {           // création d'une fonction à partir d'une constante permettant d'ouvrir la modale //
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

const closeModal = function (e) {        // création d'une fonction à partir d'une constante permettant de fermer la modale //
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

const stopPropagation = function (e) {        // création d'une fonction à partir d'une constante permettant //
    e.stopPropagation()                       // de ne pas propager la fermeture de la modale par bouton à son parent du DOM //
}

const focusInModal = function (e) {          // fonction pour naviguer avec 'tab' et 'shift tab' dans la modale //
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

document.querySelectorAll('.modifier').forEach(a => {   // ouverture modale via bouton admin //
    a.addEventListener('click', openModal)
})

window.addEventListener('keydown', function (e) {     // activation des fonctions avec utilisation de touche clavier (échap et tab) //
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
    if (e.key === 'Tab' && modal !== null) {
        focusInModal(e)
    }
});



     