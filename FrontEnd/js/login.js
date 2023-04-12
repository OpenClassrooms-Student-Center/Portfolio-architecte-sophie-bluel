// envoi du formulaire de connexion à l'api et nous renvoi le token d'identification ou non après vérification de l'identifiant //

const formElement = document.querySelector('.form');

formElement.addEventListener('submit', (e) => {     
    e.preventDefault();                             
    const formData = new FormData(formElement); 
    const data = Object.fromEntries(formData);

    console.log(data);

    fetch("http://localhost:5678/api/users/login", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/Json'
        },
        body: JSON.stringify(data)
    })
    .then(res => {
        if(res.status === 401 || res.status === 404) {
            alert("Indentifiants incorrects");
            throw new Error("Indentifiants incorrects");
        }
        else {
            return res.json()
        }
    })
    .then(data => {
        localStorage.setItem("token",data.token)
        document.location.href='index.html';
    })
    .catch(error => console.log(error));

});



  