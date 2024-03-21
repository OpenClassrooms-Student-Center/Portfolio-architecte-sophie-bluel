const emailUser = document.querySelector('#email');
const passwordUser = document.querySelector('#password');
const formulaire = document.querySelector('form');
const message = document.querySelector('form .erreur');
const loged = window.localStorage.loged;




async function validateForm() {


    formulaire.addEventListener('submit', async (event) => {


        event.preventDefault();
        //declarer les variables et recuperer la saisi 
        let email = emailUser.value;
        let password = passwordUser.value;
        //affichage console

        //verification coté client
        if (!email || !password) {
            // Gérer l'erreur de validation, par exemple, afficher un message à l'utilisateur
            console.log('Veuillez remplir tous les champs obligatoires.');
            message.textContent = 'Veuillez remplir tous les champs obligatoires.';
            return;
        }


        try {
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

            if (!response.ok) {

                message.textContent = 'Erreur dans l’identifiant ou le mot de passe';
                message.style.color = 'red';
                window.localStorage.removeItem('token');
                window.sessionStorage.removeItem('token');
                return;
            }

            const data = await response.json();
            console.log(data);

            if (data.token) {

                //redirection vers la page d'accueil en mode creation
                window.sessionStorage.loged = true;
                window.sessionStorage.accessToken = data.token;

                window.location.href = 'index.html';
            }

        } catch (error) {
            
            if (error instanceof TypeError) {
                // La requête a échoué car le service n'est pas joignable
                console.log('Le service n\'est pas joignable. Veuillez réessayer plus tard.');
                message.textContent = 'Le service n\'est pas joignable. Veuillez réessayer plus tard.'

            } else {
                // Une autre erreur s'est produite
                console.log('Une erreur inattendue s\'est produite:', error);
                message.textContent = 'Une erreur inattendue s\'est produite.'


            }

        }


    })

}


function init() {

    validateForm();

}

init();
