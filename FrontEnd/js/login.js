
// const email = "sophie.bluel@test.tld "
// const password = "S0phie"

let form = document.querySelector("form")

// Ajout d'un écouteur d'événement sur le formulaire pour écouter le submit
form.addEventListener("submit", (event) => {
    // On empêche le comportement par défaut
    event.preventDefault()
    //  // Sélectionner l'élément input et récupérer sa valeur
    const email = document.getElementById("email").value;
    //  // Sélectionner l'élément input et récupérer sa valeur
    const password = document.getElementById("password").value;

    if (email === "" || password === "") {
        alert("veuillez remplir tous les champs ")
        return
    }
    loginUser(email, password)
})

// email()
// password()


function loginUser(email, password) {
    const body = {
        email: email,
        password: password
    }
    //  RENVOIE DE TOUT LE FETCH(FONCTION-RACOURCIE)
    return fetch("http://localhost:5678/api/users/login", {
        method: "POST", //on précise que c'est une requete post
        headers: { "Content-Type": "application/json" },//on precise que c'est du json
        body: JSON.stringify(body) //c'est le corps de la requette, converti en string
    })
        .then((reponse) => {
            console.log(reponse);
            if (reponse.status === 404 || reponse.status === 401) {
                alert("identifiant invalide")
            }
            return reponse.json()
        })
        .then((data) => {
            if (data.token) {
                localStorage.setItem("token", data.token);
                // Retour page Home
                window.location.href = "index.html";
                console.log(data.token);
            } else {
                console.log(data);
               
            }

        })
        .catch((error) => {
            console.error(
                "Il y a eu un problème avec l'opération fetch : " + error.message,
            );
        });
}




















// function password() {
//     //  RENVOIE DE TOUT LE FETCH(FONCTION-RACOURCIE)
//     return fetch("http://localhost:5678/api/password")
//     .then(reponse => reponse.json())
//     .then((password) => {
//         return password

//     })
//     .catch((error) => {
//         console.error(
//             "Il y a eu un problème avec l'opération fetch : " + error.message,
//         );
//     });
// }

