async function login() {
    const emailLogin = document.getElementById("username").value;
    const passwordLogin = document.getElementById("password").value;

    const user = {
        email: emailLogin,
        password: passwordLogin,
    };

try {
    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    if (response.ok) {
        const data = await response.json();
        const userdata = data.token;

        localStorage.setItem("user", userdata);

        document.location.href = "index.html";
    } else {
        window.alert("Erreur dans l’identifiant ou le mot de passe");
    }
} catch (error) {
    console.error("Une erreur s'est produite lors de la requête:", error);

    window.alert("Une erreur s'est produite lors de la connexion. Veuillez réessayer.");
}
}

const btnForm = document.querySelector(".connexion");
btnForm.addEventListener("click", (e) => {
    e.preventDefault();
    login();
});
