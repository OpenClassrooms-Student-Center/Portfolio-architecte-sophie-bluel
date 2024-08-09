let contact = document.querySelector("contact")
form.addEventListener("submit", (event) => {
    event.preventDefault()

    let baliseNom = document.getElementById("nom")
    let nom = baliseNom.value
    let baliseEmail = document.getElementById("email")
    let email = baliseEmail.value
    let baliseMessage = document.getElementById("message")
    let message = baliseMessage.value

    fetch("http://localhost:5678/api/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nom: baliseNom.value,
            email: baliseEmail.value,
            message: baliseMessage.value
        }),
    }).then((response) => {
        if (nom.lenght == 0 || email.lenght == 0 || message.lenght == 0) {
            alert("Veuillez remplir tous les champs");
        } else {
            response.json().then((data) => {
                localStorage.setItem('access_token', data.accessToken);
                window.location.replace("index.html");
            });
        }
    });

})