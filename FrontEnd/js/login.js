import utils from "./utils.js";

const formLogin = document.querySelector(".login-form");

formLogin.addEventListener("submit", async function (event) {
    //to not change URL and recharge page
    event.preventDefault();

    const form = event.target
    //creation of body to fetch
    const userData = {
        email: form.elements.email.value,
        password: form.elements.password.value,
    }

    const login = await utils.fetchJSON("/users/login", "POST", userData);
    if (login.error) {
        alert(login.message)
        /* if (response.status === 404) {
            throw new Error("Utilisateur inconnu");
        } else if (response.status === 401) {
            throw new Error("Acces interdit");
        } */
    }

    localStorage.setItem("loginToken", login.token);

});
location.href = "index.html"
