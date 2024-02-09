const emailUser = document.querySelector('#email');
const passwordUser = document.querySelector('#password');
const formulaire = document.querySelector('form');
const message = document.querySelector('form .erreur');
const loged = window.localStorage.loged;
const admin = document.querySelector('.admin');

async function validateForm() {
    formulaire.addEventListener('submit', async(event) => {

        
        event.preventDefault();
        //declarer les variables et recuperer la saisi 
        let email = emailUser.value;
        let password = passwordUser.value;
        //affichage console
        console.log(email + ' ' + password);

       //fetch post
       const response = await fetch('http://localhost:5678/api/users/login', {

        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
       })
       const data = await response.json();
        console.log(data);

        
        
        if (data.token) if (data.userId == 1) {
            
           // redirection
           window.location.href = 'admin.html';
          
            window.sessionStorage.loged = true;
        } else {

            message.textContent = 'Erreur dans l’identifiant ou le mot de passe';
            message.style.color = 'red';
            window.localStorage.removeItem('token');
            window.sessionStorage.removeItem('token');

        }

    })

}
    function pageAcceuil() {
    
        const liAcceuil = document.querySelector(".acceuil");
        liAcceuil.addEventListener("click", (e) => {
            window.location.href = "index.html";
            console.log("tu es dans l'acceuil");
            
            
        })
    
    }

    function init() {
        validateForm();
        pageAcceuil();
    }
    init();
