const body = document.querySelector("body");
const login = document.getElementById("login");
const banner = document.querySelector(".editionBanner");
const editionButton = document.querySelector(".editionButton");
const filters =document.querySelector(".filters");

let token = localStorage.getItem("token");

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
    editionButton.addEventListener("click", () => {
        console.log('okoko');
        DisplayModal();
    });

    filters.style.display="none";

}



function DisplayModal(){
    modalContainer = document.createElement("div");
    modalContainer.classList.add("modal-container");
    body.appendChild(modalContainer);
    
    modalOverlay = document.createElement("div");
    modalOverlay.classList.add("overlay");
    modalContainer.appendChild(modalOverlay);

    modal = document.createElement("div");
    modal.classList.add("modal");
    modalContainer.appendChild(modal);

    buttonClose= document.createElement("i");
    buttonClose.classList.add("close-modal", "fa-solid", "fa-xmark", "fa-xl");
    modal.appendChild(buttonClose)

    modalTitle= document.createElement("h1");
    modalTitle.classList.add("modal-title");
    modalTitle.innerHTML="Galerie photo";
    modal.appendChild(modalTitle)

    modalGalery = document.createElement("div");
    modalGalery.classList.add("modal-galery");
    modal.appendChild(modalGalery);

}