/** gestion formulaire de contact **/

let contact = document.querySelector("contact")
form.addEventListener("submit", async (e) => {
    e.preventDefault()
    let baliseNom = document.getElementById("nom")
    let nom = baliseNom.value
    let baliseEmail = document.getElementById("email")
    let email = baliseEmail.value
    let baliseMessage = document.getElementById("message")
    let message = baliseMessage.value
    if (email.length = 0 || password.length == 0 || message.lenght == 0) {
        alert("Veuillez remplir tous les champs");
    } else {
        alert("Ce formulaire n'est pas encore fonctionnel")
    }
});

