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
     
// Affichage d'un message d'erreur(une seule fois)
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

//si un token est enregistré, faitre apparaître les modifications (barre noire, bouton modifier et logout)
let valeurToken = window.sessionStorage.getItem("token");
if (valeurToken){
    pageEdition();
    
}

function pageEdition(){
    //barre noire
    let header = document.querySelector ("body");
    let barre = document.createElement("div");
    barre.classList = "barreEdition";
    barre.innerHTML = "<button class='bouton-filtre1'><i class='fa-regular fa-pen-to-square'></i> Mode édition</button>";
    header.prepend(barre);

    //ajout bouton Modifier
    let projets = document.querySelector("#projets");
    let modifier = document.createElement("div");
    modifier.innerHTML = "<button id='boutonModifier'><i class='fa-regular fa-pen-to-square'></i> modifier</button>";
    projets.appendChild(modifier);

    // changement de login en logout
    let log = document.querySelector(".boutonLog");
    log.classList="logout";
    log.innerText="logout";
}

//supprimer le token du local storage si clic sur logout
function suppressionToken(){
    const logout = document.querySelector(".logout");
    logout.addEventListener("click", function() {
        console.log("clic");
        sessionStorage.removeItem("token");
        window.location.href = "index.html";
    }); 
}

suppressionToken();

