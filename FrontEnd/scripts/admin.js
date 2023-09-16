const login = document.getElementById("login");
const banner = document.querySelector(".editionBanner");
const editionButton = document.querySelector(".editionButton");

let token = localStorage.getItem("token");
console.log(token);

if (token) {

    login.innerHTML = "logout";
    login.addEventListener("click", () => {
        event.preventDefault();
        localStorage.removeItem("token");
        window.location.href="index.html";
        }
    )

    banner.style.display="flex";

    editionButton.style.display="flex";
    editionButton.addEventListener("click", ()=> {
        console.log("affichage modal")
    })

}