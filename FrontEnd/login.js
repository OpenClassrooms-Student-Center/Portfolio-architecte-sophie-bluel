const formLogin = document.getElementById('formLogin')

formLogin.addEventListener("submit", (event) => {
    // On empêche le comportement par défaut
    event.preventDefault();
    console.log("Il n’y a pas eu de rechargement de page");

    // On récupère les deux champs et on affiche leur valeur
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Création de l’objet des infos du formulaire.
const loginData = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
 };

 // Création de la charge utile au format JSON
const loginDataJson = JSON.stringify(loginData);
    getLoginResult(loginDataJson)
});

async function getLoginResult(loginDataJson) {
    const result = await fetch("http://localhost:5678/api/users/login", {
        //Objet de configuration qui comprend 3 propriétés
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: loginDataJson //charge utile
});

const resultValue = await result
    console.log(resultValue)
}