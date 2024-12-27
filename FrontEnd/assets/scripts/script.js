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
    removeFromLocalStorage
} from "./connection.js";
import {
    displayModalAddPhoto,
    closeModal,
    displayPhotosGallery,
    displayAddPhotoForm
} from "./modal.js";
import {
    addSubmit
} from "./addWork.js";

let worksInLocalStorageVar = window.localStorage.getItem("works");
let worksPromise;
export let formExported;

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
        if(login.href.endsWith("/pages/connection.html")) {
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
        modalBackground.ariaModal = "true";
        modalBackground.ariaHidden = "false";

        const fermer = document.querySelector(".icon-close");
        fermer.addEventListener("click", (event) => {
            event.preventDefault();
            closeModal();
            modalBackground.ariaModal = "false";
            modalBackground.ariaHidden = "true";
        });

        modalBackground.addEventListener("click", (event) => {
            event.preventDefault();
            if(event.target === modalBackground) {
                closeModal();
                modalBackground.ariaModal = "false";
                modalBackground.ariaHidden = "true";
            }
        });
        displayPhotosGallery();
        displayAddPhotoForm();

        const erreur = document.querySelector("#erreur");
        erreur.innerText = "";

        const galleryView = document.querySelector(".gallery-view");
        const gallery = document.querySelector("#gallery");
        const addView = document.querySelector(".add-view");
        const title = document.getElementById("modal-title");
        const button = document.getElementById("modal-button");
        const back = document.querySelector(".icon-back");

        const iconWrapper = document.getElementById("icon-wrapper");
        iconWrapper.classList.add("icon-wrapper-top");

        const form = document.getElementById("modal-form");
        const wrapper = document.querySelector(".wrapper");

        button.addEventListener("click", (event) => {
            if(button.innerText === "Ajouter une photo") {
                iconWrapper.classList.remove("icon-wrapper-top");

               /* back.classList.add("display");
                back.classList.remove("hide");*/
                back.style.display = "block";
                /*galleryView.classList.add("hide");
                galleryView.classList.remove("display");*/
                galleryView.style.display = "none";
                gallery.classList.remove("gallery-view-size-back");
                /*addView.classList.add("display");
                addView.classList.remove("hide");*/
                addView.style.display = "block";

                title.innerText = "Ajout photo";

                button.classList.remove("button-modal-gallery");
                button.classList.add("button-modal-form");
                button.innerText = "Valider";
                button.type = "submit";

                wrapper.removeChild(button);
                form.appendChild(button);

                button.classList.remove("selected");
                button.classList.add("greyed");
            }
            else if(button.innerText === "Valider") {
                console.log("step3.3 submit button click");
                const formPassed = document.getElementById("modal-form");
                formExported = formPassed;
                console.log("script form: " + formPassed);
                /****** Step 3.3 add work ******/
                addSubmit(event);
            }
        });

        document.querySelector(".icon-back").addEventListener("click", () => {
            /*back.classList.add("hide");
            back.classList.remove("display");*/
            back.style.display = "none";
            galleryView.style.display = "grid";
            gallery.classList.add("gallery-view-size-back");
            /*addView.classList.add("hide");
            addView.classList.add("display");*/
            addView.style.display = "none";

            title.innerText = "Galerie photo";

            button.classList.remove("button-modal-form");
            button.classList.add("button-modal-gallery");
            button.innerText = "Ajouter une photo";
            button.type = "button";

            form.removeChild(button);
            wrapper.appendChild(button);

            button.classList.remove("greyed");
            button.classList.add("selected");
        });
    });
}