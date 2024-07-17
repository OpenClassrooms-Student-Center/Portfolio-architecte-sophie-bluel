import {
    login
} from '../libs/user.js'


const form = document.querySelector('form');

let emailId = document.getElementById("email")
let email = emailId.value
let passwordId = document.getElementById("password")
let password = passwordId.value


function idValidator (email, password) {
    //validation complexe avec expression régulière pour l'email 'sophie.bluel@test.tld'
    let emailValidation = new RegExp("^[a-z.]+@+[a-z.]+")
    let passwordValidation = new RegExp("^[A-Z][a-z0-9]+")

    if (emailValidation.test(email) && passwordValidation.test(password)) {
        
        // return true
    } else {
        // throw new Error(`Erreur dans l’identifiant ou le mot de passe`)
        // return false
    }
}

// try {
//     idValidator('sophie.bluel@test.tld', 'S0phie')
    
// } catch (error) {
//     console.log("erreur")
// }

// Quand on submit
form.addEventListener("submit", () => {
    // On empêche le comportement par défaut
    event.preventDefault()

    if(idValidator (email, password) === login())
    login()
    //redirection à la page d'accueil
    window.location.href = "index-loger.html"
    
})


//message d'erreur : “Erreur dans l’identifiant ou le mot de passe”