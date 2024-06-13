function recupDonneForm() {

    let formulaire = document.getElementById("formulaire")
    let btnSubmit = document.getElementById("submit")
    console.log("a")
    btnSubmit.addEventListener("click", function (event) {
        event.preventDefault()
        let inputEmail = document.getElementById("email")
        let passwordForm = document.getElementById("password")
        let email = inputEmail.value
        let password =


            console.log(inputEmail.value)
        console.log(passwordForm.value)

    })

}



async function recupIdMpd() {
    const reponse = await fetch("http://localhost:5678/api/users/login")
    const data = {
        email: "sophie.bluel@test.tld",
        password: "S0phie"
    }
    const login = await reponse.json();
    console.log(login)
    return login

}

recupDonneForm()
recupIdMpd()