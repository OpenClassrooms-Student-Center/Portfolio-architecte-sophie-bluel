let BoutonSubmit = document.getElementById("BoutonSubmit");

BoutonSubmit.addEventListener("click", async(event) => {
    event.preventDefault();

    let user = {
        "email": document.getElementById("username").value,
        "password": document.getElementById("password").value,
    };
    let response = await fetch('http://localhost:5678/api/users/login', {
           method : "POST",
           headers : {
            'Content-Type': 'application/json'
            },
           body: JSON.stringify(user)
        });
    
    let MessageErreur = document.getElementById("MessageErreur")

    if (response.ok) {
        let data = await response.json();
        let token = data.token;

        localStorage.setItem('token', token);

        location.href= "file:///C:/Users/heloi/Documents/Projets/Projet_3/Portfolio-architecte-sophie-bluel/FrontEnd/index.html"
    }
    else {
        MessageErreur.innerText = "Utilisateur ou mot de passe incorrect";
    }
}) 




