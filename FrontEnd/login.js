let form = document.querySelector("form");

console.log(form)

 form.addEventListener("submit", (event) => {
    // On empêche le comportement par défaut
    event.preventDefault();
    console.log("Il n’y a pas eu de rechargement de page");

    // let baliseEmail = document.getElementById("email")
    // let email = baliseEmail.value

    //  let balisePassword = document.getElementById("password")
    //  let password = balisePassword.value

 });

