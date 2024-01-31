//EventListener du login
let login = document.querySelector("#loginForm");
login.addEventListener("submit", (event) =>{
    event.preventDefault();
    loginGestion();
});

// Gestion du login
async function loginGestion() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    // Envoi des id avec la fonction fetch
    const reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: email,
            password: password,
        })
    });
    //récupération du token et enregistrement dans le local storage, retour page accueil, sinon affichage du message d'erreur
    const dataReponse = await reponse.json();
    if (reponse.ok){
        enregistrementToken(dataReponse);
    }else{
        messageErreur();
    }
}
     
// Affichage d'un message d'erreur (une seule fois)
function messageErreur() {
    let ErreurMessage = document.getElementById("erreurMessage");
    if (!ErreurMessage){
        let popup = document.querySelector("#login form");
        ErreurMessage = document.createElement("p");
        ErreurMessage.id = "erreurMessage";
        popup.prepend(ErreurMessage);
    }
    ErreurMessage.innerText = "L'email ou le mot de passe n'est pas valide.";
}

//enregistrement du token en session storage
function enregistrementToken(dataReponse){
    const token = dataReponse.token;
    const valeurToken = JSON.stringify(token);
    window.sessionStorage.setItem("token", valeurToken);
    window.location.href = "index.html";
}
