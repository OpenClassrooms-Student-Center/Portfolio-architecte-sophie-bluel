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


 function ajoutNouveauCompteClient (){
    const formulaireClient = document.querySelector("#formulaire_de_connection")
    formulaireClient.addEventListener("button", function (event) {
    event.preventDefault();
    const inscription = {
        email: event.target.querySelector("[name=email]").value,
        motDePasse: event.target.querySelector("[name=password]").value
    };
    

    //création de la charge utile au format json
    const chargeUtile = JSON.stringify(inscription);

    fetch("http://localhost:5678/api/users/login", {
        method : "POST",
        headers : {"Content-Type": "application/json"},
        body: chargeUtile
    });
   
    })
}

ajoutNouveauCompteClient()
