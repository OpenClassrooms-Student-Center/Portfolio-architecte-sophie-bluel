// Gestion du Login page de connexion //

// element submit //

let form = document.querySelector("form")
form.addEventListener("submit", (event) => {
    event.preventDefault()

    let baliseEmail = document.getElementById("email")
    let email = baliseEmail.value

    let balisePassword = document.getElementById("password")
    let password = balisePassword.value


})
