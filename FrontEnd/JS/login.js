
const formLogin = document.querySelector("form");
const buttonConnection = document.querySelector('input [type="submit"]')
const valid = true;
const messageErreur = "L'email ou/et le mot de passe sont incorrects"

//Lors du clique sur le submit ça envoi 
formLogin.addEventListener('submit',async function(element){
    element.preventDefault();
    // entrer les valeurs des inputs
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
                    const data = await reponse.json();
                    localStorage.setItem("token", data.token);
                    window.location.href="index.html";
                    alert('Connexion reussie !')
                }
                else{
                    createMessageErreur('.main-container',messageErreur);
                }
        }
        catch { 
        createMessageErreur('.main-container',messageErreur)
        };
});

 /**
  * 
  * @param {DOMElement} cible 
  * @param {string} message 
  * @returns element HTML de message d'erreur
  */
function createMessageErreur (cible, message){
    const element = document.querySelector(cible);
    const div = document.createElement('div')
    div.setAttribute('id','login-error-container');
    const spanError = document.createElement('span');
    spanError.setAttribute('id','login-error');
    spanError.innerText = message ;
    div.append(spanError)
    element.insertAdjacentElement('afterbegin',div);
    setTimeout(()=>{
        div.remove()}, 2000)
}