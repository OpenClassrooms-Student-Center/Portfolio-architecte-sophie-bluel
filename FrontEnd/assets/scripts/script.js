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
    addConnectionListener,
    addConnectedModeBanner,
    hideCategoryFilterButtons,
    addWorksModificationLink,
    toggleNavbarLogin
} from "./connection.js";

let worksInLocalStorageVar = window.localStorage.getItem("works");
let worksPromise;

if (worksInLocalStorageVar) {
    try{
        let worksParsed = JSON.parse(worksInLocalStorageVar);
        if (Array.isArray(worksParsed)) {
            worksPromise = Promise.resolve(worksParsed);
        } else {
            console.warn("Works %o locally stored are'nt an array: Local storage is deleted and loaded again.", worksParsed);
            window.localStorage.removeItem("works");
            worksPromise = fetchAndStoreWorks();
        }
    } catch (erreur) {
        console.error("Error %o at locally stored works parsing: Local storage is deleted and loaded again", erreur);
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
initGallery();
/****** Step 1.2 create category filter ******/
const categories = await getCategories(worksPromise);
await createCategoryFilterButtons(categories, galleryDiv, initialFetchedGallery);
/****** Step 2.2 update landing page to connected mode ******/
addConnectedModeBanner();
hideCategoryFilterButtons();
toggleNavbarLogin();
addWorksModificationLink();