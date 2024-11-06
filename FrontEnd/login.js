function recupDonneForm() {

    let formulaire = document.getElementById("formulaire")
    let btnSubmit = document.getElementById("submit")

    btnSubmit.addEventListener("click", async function (event) {
        event.preventDefault()
        let inputEmail = document.getElementById("email")
        let passwordForm = document.getElementById("password")
        let email = inputEmail.value
        let password = passwordForm.value
        let resultat = await envoyerIdMdp(email, password)
        if (resultat === null) {

            let erreur = document.getElementById("error")
            erreur.textContent = "Erreur : Email ou mot de passe incorrect.";

        } else {
            window.localStorage.setItem("connexion", "true");
            window.location.replace("http://" + window.location.host);



        }














    })



}





async function envoyerIdMdp(email, password) {

    let donnes = {
        "email": email,
        "password": password,
    }


    const reponse = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },

        body: JSON.stringify(donnes),


    });


    if (reponse.status === 200) {
        console.log("succes")
        //console.log(await reponse.json())
        return await reponse.json()

    } else {
        console.log("echec")
        return null


    }



}

recupDonneForm()




