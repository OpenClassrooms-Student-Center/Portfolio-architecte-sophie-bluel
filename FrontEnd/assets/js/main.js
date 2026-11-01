// assets/js/main.js
import { fetchWorks, fetchCategories, deleteWorkAPI, addWorkAPI } from "./api.js";
import { isUserLoggedIn, setupAdminView } from "./auth.js";
import { displayWorks, createFilters } from "./gallery.js";
import { initModal } from "./modal.js";

const gallery = document.querySelector(".gallery");
const portfolioSection = document.getElementById("portfolio");

let allWorks = [];
let categoriesList = [];

async function init() {
    try {
        allWorks = await fetchWorks();
        categoriesList = await fetchCategories();

        displayWorks(allWorks, gallery);

        if (isUserLoggedIn()) {
            setupAdminView(portfolioSection, (editBtn) => {
                initModal(
                    editBtn,
                    allWorks,
                    categoriesList,
                    handleDeleteWork,
                    handleAddWork
                );
            });
        } else {
            createFilters(categoriesList, allWorks, gallery, portfolioSection);
        }
    } catch (error) {
        console.error("Erreur initialisation app:", error);
    }
}

async function handleDeleteWork(id) {
    const token = localStorage.getItem("token");
    const ok = await deleteWorkAPI(id, token);
    if (ok) {
        allWorks = allWorks.filter(w => w.id !== id);
        displayWorks(allWorks, gallery);
        const modalGallery = document.querySelector(".modal-gallery");
        if (modalGallery) {
            displayWorks(allWorks, modalGallery, true, handleDeleteWork);
        }
    }
}

async function handleAddWork(formData, token) {
    const newWork = await addWorkAPI(formData, token);
    if (newWork) {
        allWorks.push(newWork);
        displayWorks(allWorks, gallery);
        const modalGallery = document.querySelector(".modal-gallery");
        if (modalGallery) {
            displayWorks(allWorks, modalGallery, true, handleDeleteWork);
        }
    }
}

init();