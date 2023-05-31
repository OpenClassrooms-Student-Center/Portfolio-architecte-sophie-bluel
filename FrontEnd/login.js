//code js de la page login.html

//Création évènement connexion au moment du "click" avec la foncion "login"
document.getElementById("connecter").addEventListener("click", () => {login()})

//Fonction "login" qui envoi les données de connexion de l'utilisateur pour s'authentifier
async function login() {
    const data = {email: document.getElementById("email").value, password: document.getElementById("password").value};
    const response = await fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify(data)
});

//Si identifiant/mot de passe inconnu affiche "Identifiant/ mot de passe incorrect"
if (!response.ok) {
    document.getElementById("login-error").innerText = "Identifiant / mot de passe incorrect"
//Sinon connexion de l'utilisateur + création du token + redirection vers "index.html"
}else{
    const resultat = await response.json()
    localStorage.setItem("token", resultat.token)
    window.location.href = "index.html"
}};