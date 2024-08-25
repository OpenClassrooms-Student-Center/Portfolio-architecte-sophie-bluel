import {
    login,
    logout
} from '../libs/user.js';

function idValidator(email, password) {
    //variable avec expression régulière pour valider le format de l'email 'sophie.bluel@test.tld'
    let emailValidation = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    //Pareil mais pour valider la longueur du MDP entre 6 et 12 caractères
    let passwordValidation = /^.{6,12}$/
    //on teste les expressions et on vérifie si les id respectent les critères de validation
    console.log(emailValidation.test(email), passwordValidation.test(password))
    return (emailValidation.test(email) && passwordValidation.test(password))
}

const submitBtn = document.getElementById('submit_btn')

// Quand on submit
submitBtn.addEventListener("click", async (event) => {
    // On empêche le comportement par défaut
    event.preventDefault()

    let emailId = document.getElementById("email")
    let email = emailId.value
    let passwordId = document.getElementById("password")
    let password = passwordId.value
    if (idValidator(email, password)) {
        let result = await login(email, password)
        if (result === true) {
            //redirection à la page d'accueil
            window.location.href = "index.html"
        }else {
            alert('Erreur')
        }
    } else {
        alert("Erreur dans l’identifiant ou le mot de passe")
    }
})
