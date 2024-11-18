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
    addConnectionListener
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
async function initGalerie() {
    initialFetchedGallery = await fillGallery(worksPromise, galleryDiv, initialFetchedGallery);
}
initGalerie();
/****** Step 1.2 create category filter ******/
getCategories(worksPromise).then(categories => {
    createCategoryFilterButtons(categories, galleryDiv, initialFetchedGallery);
});