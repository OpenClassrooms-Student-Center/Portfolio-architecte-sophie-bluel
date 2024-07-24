import {
    login
} from '../libs/user.js'


//mode edition - loger
function editMode() {
    let body = document.querySelector('.body')
    let editBanner = document.querySelector('.edit_banner')
    editBanner.style.display = 'flex'

    // //affichage de la bannière du mode édition
    // let editBanner = document.createElement('div')
    // editBanner.classList.add('edit_banner')
    // let bannerIcon = document.createElement('i')
    // bannerIcon.classList.add('fa-regular', 'fa-pen-to-square')
    // let $p = document.createElement('p')
    // $p.textContent = 'Mode édition'
    
    // editBanner.appendChild(bannerIcon)
    // editBanner.appendChild($p)
    // body.appendChild(editBanner)
    

    //'logout' à la place de 'login'
    let loginText = document.querySelector('login')
    loginText.textContent = 'logout'


    //affichage et paramettrage du du bloc 'modifier' permettant d'afficher la modale

    //ajout d'un conteneur aux titres
    let titles = document.createElement('div')
    let portfolio = document.getElementById('portfolio')
    let titleMyProjects = document.querySelector('#portfolio h2')
    titles.appendChild(titleMyProjects)
    portfolio.appendChild(titles)
    console.log(titleMyProjects)

    //ajout de l'icône et du texte 'modifier'
    let modifLink = document.createElement('div')
    let modifIcon = document.createElement('i')
    modifIcon.classList.add('fa-regular', 'fa-pen-to-square')
    modifIcon.id = 'modifIcon'
    let p = document.createElement('p')
    p.textContent = 'modifier'
    modifLink.appendChild(modifIcon)
    modifLink.appendChild(p)
    titles.appendChild(modifLink)

    //fonction des modales

}

//connexion
const form = document.querySelector('form');

function idValidator(email, password) {
    //validation complexe avec expression régulière pour l'email 'sophie.bluel@test.tld' + MDP entre 6 et 12 carctères
    let emailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    let passwordValidation = /^.{6,12}$/
    console.log(emailValidation.test(email), passwordValidation.test(password))
    return (emailValidation.test(email) && passwordValidation.test(password))
}

// Quand on submit
form.addEventListener("submit", (event) => {
    // On empêche le comportement par défaut
    event.preventDefault()

    let emailId = document.getElementById("email")
    let email = emailId.value
    let passwordId = document.getElementById("password")
    let password = passwordId.value
    if (idValidator(email, password)) {
        login(email, password)
        //redirection à la page d'accueil
        window.location.href = "index.html"

    } else {
        alert("Erreur dans l’identifiant ou le mot de passe")
    }
    //fonction mode edition
    editMode()

    //fonction modales
})
