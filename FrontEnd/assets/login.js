
const formLogin = document.querySelector("form");
const buttonConnection = document.querySelector('input [type="submit"]')
const valid = true;
const messageErreur = "L'email ou/et le mot de passe sont incorrects"

// Si input email et input password conforme  /check !

// Je met email et password dans un objet user /

// J'envoi user a l'api /login avec method POST /
formLogin.addEventListener('submit',async function(element){
    element.preventDefault();
    const user = {
        email : document.querySelector('input[type="email"]').value ,
        password : document.querySelector('input[type="password"]').value
    };
    const userJSON = JSON.stringify(user);
        try {
            const reponse = await fetch("http://localhost:5678/api/users/login",{
                method: 'POST',
                body: userJSON,
                headers : {"Content-type" :'application/json; charsert =UTF-8',
                            "Accept": "application/json"}
            });
                if(reponse.ok){
                    console.log(reponse);
                    console.log('Connexion reussite !');
                    const data = await reponse.json();
                    console.table(data);
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("userID", data.userId);
                    console.log(localStorage.getItem("token"));
                    console.log(localStorage.getItem("userId"));
                    window.location.href="index.html";
                }
                else{
                    createMessageErreur('#login-section',messageErreur);
                }
        }
        catch { console.log("Erreur acces serveur");
        createMessageErreur('#login-section',messageErreur)
        };
});

// Transforme l'objet en JSON pour le lire /
// Place le JSON en localStorage en token /
//Si mail === admin mail et mot de passe === admin motde passe alors on envoi en local le token 
// Cookie avec Token 
 /**
  * 
  * @param {string} cible 
  * @param {string} message 
  * @returns element HTML de message d'erreur
  */
function createMessageErreur (cible, message){
    const element = document.querySelector(cible);
    const spanError = document.createElement('span');
    spanError.setAttribute('id','login-error');
    spanError.innerText = message ;
    element.insertAdjacentElement('afterbegin',spanError);
    
}