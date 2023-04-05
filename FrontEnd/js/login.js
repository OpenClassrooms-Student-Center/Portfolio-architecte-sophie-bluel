const formElement = document.querySelector('.form');

formElement.addEventListener('submit', (e) => {     // envoi du formulaire de connexion à l'api et nous renvoi le token d'identification //
    e.preventDefault();                             // ou non après vérification de l'identifiant //
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
    .then(res => res.json())
    .then(data => {
        console.log(data);
        if(data.error){
            alert("mauvais identifiant")
            return
        }
        localStorage.setItem("token",data.token)
        document.location.href='index.html' ;
    })
    .catch(error => console.log(error));

});



  