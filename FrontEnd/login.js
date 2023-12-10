
 let login = document.querySelector('.conexion').addEventListener('click', submitForm)

async function submitForm() {
    let email = document.getElementById('email').value;
    let password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:5678/api/users/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            window.localStorage.setItem("token", data.token);
            window.location.href = './index.html';
           
        } else {
            let htmlError = "E-mail ou Mot de passe incorrect.";
            showErrorMessage(htmlError) 
        }
    } catch (error) {
        console.error('Erreur lors de la soumission du formulaire:', error);
    }
}

function showErrorMessage(message) {

    let  ErrorMessage = document.getElementById("error")
    if (!ErrorMessage) {
        let error = document.querySelector(".conexion")
        ErrorMessage = document.createElement("span")
        ErrorMessage.id = "error"
        error.insertAdjacentElement("afterend", ErrorMessage)
    }
    ErrorMessage.innerText = message
}


