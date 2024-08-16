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
        try {
            const response = await fetch("http://localhost:5678/api", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    nom: baliseNom.value,
                    email: baliseEmail.value,
                    message: baliseMessage.value
                }),
            });
            const data = await response.json();
            localStorage.setItem(data.json);
            window.location.replace("index.html");
        } catch (err) {
            alert(err.message);
        }
    }
});

