export function addNewUser () {

    const loginBinoms = document.querySelector("section form input")

    for (let i = 0; i < loginBinoms.length; i++) {
        loginBinoms[i].addEventListener("click", async function (event) {

const id = event.target.dataset.id;
await fetch("http://localhost:5678/api/users/login");

        })
    }

}