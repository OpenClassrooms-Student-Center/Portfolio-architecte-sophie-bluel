
 /*
 // Récupération de l'élément du DOM qui accueillera les fiches
 const divLogin = document.querySelector("#login");

 // Création d’une balise dédiée au projet
 const formulaire_de_connection = document.createElement("form");
 divLogin.appendChild(formulaire_de_connection);

 const emailLabel = document.createElement("label");
 emailLabel.innerText = "Email";
 formulaire_de_connection.appendChild(emailLabel);

 const email = document.createElement("input");
 formulaire_de_connection.appendChild(email)

 const passwordLabel = document.createElement("label");
 passwordLabel.innerText = "Mot de passe";
 formulaire_de_connection.appendChild(passwordLabel);

 const password = document.createElement("input");
 formulaire_de_connection.appendChild(password);
 
 const soumettre = document.createElement("button");
 soumettre.innerText = "Se connecter";
 formulaire_de_connection.appendChild(soumettre);

 const oubli = document.createElement("a");
 oubli.innerText = "Mot de passe oublié";
 formulaire_de_connection.appendChild(oubli);
*/

document.querySelector("#formulaire_de_connection").addEventListener("submit", function (event) {
    
    event.preventDefault();
    
    const dataLogin = {
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value
    }

    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataLogin)
    })
    .then(function (reponse) {
        if (reponse.ok) {
            reponse.json()
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.log(error);
            });
        } else {
            alert("identification ou mot de passe erroné");
        }
    })
    .catch(error => {
        console.log(error);
    });
});


/*
const RecupDesIdentifiants = await fetch("Les_inscriptions")
const identifiants = await RecupDesIdentifiants.json();

const emails = identifiants.map(identifiants => identifiants.email)
const motsDePasse = identifiants.map(identifiants => identifiants.password)


function verifyIdentifiants (){
    const formulaireClient = document.querySelector(".formulaire_de_connection")
    formulaireClient.addEventListener("submit", function (event) {
    event.preventDefault();
    const inscription = {
        email: event.target.querySelector("[name=email]").value,
        motDePasse: event.target.querySelector("[name=password]").value
    };
    const saisieEmail = inscription.email;
    const saisieMotDePasse = inscription.motDePasse;
   

  
  
    for (let i = 0; i = identifiants.length; i++) {
       
    let verif = '';           
    let autorisation = '';
    if (saisieEmail === emails[i] && saisieMotDePasse === motsDePasse[i]) {
        verif = true;
    }

    if (verif) {
        autorisation = "entrez"
    } else {
        autorisation = "Vous n'êtes pas autorisé à entrer"
    };

    console.log(autorisation);
    };
    });

}
verifyIdentifiants()


*/





    //création de la charge utile au format json
   /* const chargeUtile = JSON.stringify(inscription);*/





   /* fetch("Les_inscriptions.json", {
        method : "POST",
        headers : {"Content-Type": "application/json"},
        body: chargeUtile
    })*/;

    /*console.log(chargeUtile)*/


/*
for(let i = identifiant.length ; i >= 0 ; i--) {
    if (chargeUtile.email === test2.email[i]) {
        console.log(true)}
    }
*/