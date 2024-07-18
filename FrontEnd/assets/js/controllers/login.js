import {
    login
} from '../libs/user.js'


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
        alert("Email ou mot de passe invalide")
    }
})


//message d'erreur : “Erreur dans l’identifiant ou le mot de passe”