// Gestion du Login page de connexion //

// element submit //

let form = document.querySelector("myForm")
form.addEventListener("submit", (event) => {
    event.preventDefault()

    let baliseEmail = document.getElementById("email")
    let email = baliseEmail.value
    let balisePassword = document.getElementById("password")
    let password = balisePassword.value

    fetch("http://localhost:5678/api/user/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: baliseEmail.value,
            password: balisePassword.value
        }),
    }).then((response) => {
        if (email.lenght == 0 || password.lenght == 0) {
            alert("L'identifiant ou le mot de passe est incorrect");
        } else {
            response.json().then((data) => {
                localStorage.setItem('access_token', data.accessToken);
                window.location.replace("index.html");
            });
        }
    });
});
