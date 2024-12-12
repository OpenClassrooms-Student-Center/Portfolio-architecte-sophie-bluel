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
    displayPhotosGallery
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
            displayPhotosGallery();
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
            })
        });
    }
});