
const formulaireLogin = document.querySelector(".login")

formulaireLogin.addEventListener("submit", function (event) {
    event.preventDefault();

    const identifiant = {
        "email": event.target.querySelector("[name=inputEmail]").value,
        "password": event.target.querySelector("[name=inputPassword]").value,
    };

    const chargeUtile = JSON.stringify(identifiant);

    // Appel de la fonction fetch avec toutes les informations nécessaires
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: chargeUtile
    });

    if (identifiant.email === "sophie.bluel@test.tld" && identifiant.password === "S0phie") {
        window.location.href = "./index.html"
    } else {
        alert("erreur association nom utilisateur, mot de passe")
    }
});

