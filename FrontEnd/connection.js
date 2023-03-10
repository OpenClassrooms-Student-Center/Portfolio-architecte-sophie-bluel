
document.querySelector("#formulaire_de_connection").addEventListener("submit", function (event) {
    const dataLogin = {
        email: document.querySelector("#email").value,
        password: document.querySelector("#password").value
    }

    event.preventDefault();
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dataLogin)
    })
    
    .then(function (reponse) {
        if (reponse.ok) {
            reponse.json()
            .then(data => {
                console.log(data);
                sessionStorage.setItem('adminToken', data.token)
                window.location.href="index.html" 
                        
            })
           
            .catch(error => {
                console.log(error);
            });
        } else {
            alert("identification ou mot de passe erroné");
        }
    })
    .catch(error => {
        console.log(error);
    });
});


if(sessionStorage.getItem('adminToken')) {
    console.log("true")
    console.log(sessionStorage.getItem('adminToken'))
   const affichage = document.querySelectorAll(".iflogged")
    affichage.forEach(a => {a.setAttribute("style", null)})
} else {console.log("false")}



