/****** Step 1.1 fetch works from backend ******/
import {
    fetchAndStoreWorks,
    fillGallery
} from "./getWorks.js";
import {
    getCategories
} from "./filterByCategory.js";
import {
    createCategoryFilterButtons
} from "./createCategoryFilterButtons.js";
import {
    addConnectedModeBanner,
    hideCategoryFilterButtons,
    addWorksModificationLink,
    removeFromLocalStorage,
    displayError
} from "./connection.js";
import {
    displayModalAddPhoto,
    closeModal,
    displayPhotosGallery,
    displayAddPhotoForm
} from "./modal.js"

document.addEventListener("DOMContentLoaded", async () => {
    let worksInLocalStorageVar = window.localStorage.getItem("works");
    let worksPromise;

    if (worksInLocalStorageVar) {
        try{
            let worksParsed = JSON.parse(worksInLocalStorageVar);
            if (Array.isArray(worksParsed)) {
                worksPromise = Promise.resolve(worksParsed);
            } else {
                console.warn("Works %o locally stored isn't an array: local storage is deleted and loaded again.", worksParsed);
                window.localStorage.removeItem("works");
                worksPromise = fetchAndStoreWorks();
            }
        } catch (erreur) {
            console.error("Error %o at locally stored works parsing: local storage is deleted and loaded again", erreur);
            window.localStorage.removeItem("works");
            worksPromise = fetchAndStoreWorks();
        }
    } else {
        worksPromise = fetchAndStoreWorks();
    }
    let galleryDiv = document.querySelector(".gallery");
    let initialFetchedGallery;
    async function initGallery() {
        initialFetchedGallery = await fillGallery(worksPromise, galleryDiv, initialFetchedGallery);
    }
    await initGallery();
    /****** Step 1.2 create category filter ******/
    const categories = await getCategories(worksPromise);
    await createCategoryFilterButtons(categories, galleryDiv, initialFetchedGallery);
    /****** Step 2.2 update landing page to connected mode ******/
    const login = document.getElementById("login");
    login.addEventListener("click", (event) => {
        event.preventDefault();
        if(login.innerText === "logout") {
            if(localStorage.getItem("token")) {
                removeFromLocalStorage("token");
            }
            login.innerText = "login";
            if(login.href.endsWith("/index.html")) {
                login.href = login.href.replace("/index.html", "/pages/connection.html");
            }
            window.location.href = "./index.html";
        }
        else if(login.innerText === "login") {
            if(login.href.endsWith("/pages/connection..html")) {
                login.href.replace("/pages/connection.html", "/index.html");
            }
            window.location.href = "./pages/connection.html";
        }
    })
    const isConnected = await localStorage.getItem("token");
    if(isConnected) {
        addConnectedModeBanner();
        if(login.innerText === "login") {
            login.innerText = "logout";
        }
        hideCategoryFilterButtons();
        addWorksModificationLink();
        const modifier = document.getElementById("editSpan");
        /****** Step 3.1 show photo gallery modal ******/
        modifier.addEventListener("click", (event) => {
            event.preventDefault();
            displayModalAddPhoto();
            const modalBackground = document.getElementById("modal-backgrd");
            const fermer = document.querySelector(".icon-close");
            fermer.addEventListener("click", (event) => {
                event.preventDefault();
                closeModal();
            });
            modalBackground.addEventListener("click", (event) => {
                event.preventDefault();
                if(event.target === modalBackground) {
                    closeModal();
                }
            });
            displayPhotosGallery();
            displayAddPhotoForm();
            const erreur = document.querySelector("#erreur");
            erreur.innerText = "";
            const galleryView = document.querySelector(".gallery-view");
            const addView = document.querySelector(".add-view");
            const title = document.getElementById("modalTitle");
            const button = document.getElementById("modalButton");
            const back = document.querySelector(".icon-back");
            const iconWrapper = document.getElementById("iconWrapper");
            iconWrapper.classList.add("iconWrapperTop");
            document.querySelector(".button-modal").addEventListener("click", () => {
                iconWrapper.classList.remove("iconWrapperTop");
                back.style.display = "block";
                galleryView.style.display = "none";
                addView.style.display = "block";
                title.innerText = "Ajout photo";
                button.innerText = "Valider";
                button.type = "submit";
                button.classList.remove("selected");
                button.classList.add("greyed");
            });
            document.querySelector(".icon-back").addEventListener("click", () => {
                iconWrapper.classList.add("iconWrapperTop");
                back.style.display = "none";
                galleryView.style.display = "grid";
                addView.style.display = "none";
                title.innerText = "Galerie photo";
                button.innerText = "Ajouter une photo";
                button.classList.remove("greyed");
                button.classList.add("selected");
            });
            document.getElementById("file-photo").addEventListener("change", (event) => {
                const file = event.target.files[0];
                const maxSize = 4 * 1024 * 1024; // 4 Mo en octets

                if(file && file.size > maxSize) {
                    event.target.value = "";
                    displayError("Le fichier dépasse la taille maximale de 4Mo. Recommencez s'il-vous-plaît.", erreur);
                }
            });
        });
    }
});