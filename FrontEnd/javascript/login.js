// Gestion du Login page de connexion //

let form = document.querySelector("Form")
form.addEventListener("submit", async (e) => {
    e.preventDefault()

    let baliseEmail = document.getElementById("email")
    let email = baliseEmail.value
    let balisePassword = document.getElementById("password")
    let password = balisePassword.value
    if (email.trim().length == 0 || password.length == 0) {
        alert("Veuillez remplir tous les champs");
    } else {
        try {
            const response = await fetch("http://localhost:5678/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                }),
            });
            const data = await response.json();
            if (data.token) {
                localStorage.setItem('token', data.token);
                window.location.replace("index.html");
            } else {
                throw new Error("Données de connexions incorrectes");
            }
        } catch (err) {
            alert(err.message);
        }
    }
});
