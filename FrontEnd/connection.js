
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



const test = await fetch("Les_inscriptions")
const test2= await test.json();

const emails = test2.map(test2 => test2.email)
const MotsDePasse = test2.map(test2 => test2.email)
console.log(MotsDePasse)

function ajoutNouveauCompteClient (){
    const formulaireClient = document.querySelector(".formulaire_de_connection")
    formulaireClient.addEventListener("submit", function (event) {
    event.preventDefault();
    const inscription = {
        email: event.target.querySelector("[name=email]").value,
        motDePasse: event.target.querySelector("[name=password]").value
    };
    console.log(formulaireClient);

    //création de la charge utile au format json
    const chargeUtile = JSON.stringify(inscription);

    fetch("Les_inscriptions.json"/*, {
        method : "POST",
        headers : {"Content-Type": "application/json"},
        body: chargeUtile
    });
    console.log(chargeUtile)
    }*/)
}
ajoutNouveauCompteClient()



for(let i = test2.length ; i >= 0 ; i--) {
    if (chargeUtile.email === test2.email[i]) {
        console.log(true)}
    }
        