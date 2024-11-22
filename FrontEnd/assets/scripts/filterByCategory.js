/****** Step 1.2 create the category filter ******/
import {
    replaceSpaceByUnderscore
} from "./getWorks.js";
/**
 * This function stores in a variable all the categories of works.
 * @param {Promise<any>} works : see getWorks.js fillGallery. Works have a category information.
 * @returns: categories is a set of unique categories.
 */
export async function getCategories(works) {
    try{
        let categories = new Set();
        categories.add("Tous");
        const result = await works;
        result.forEach(work => {
            const categ = work.category.name;
            if(categories.size === 0 || !categories.has(categ)) {
                categories.add(categ);
            }
        });
        return categories;
    } catch(error) {
        console.error("Error looping works or filling categories variable: %o", error);
    }
}

/**
 * This function hides the gallery.
 */
function hideGallery() {
    try{
        let figures = document.querySelectorAll(".gallery figure");
        figures.forEach(figure => {
            figure.style.display = "none";
        });
    } catch(error) {
        console.error("Error hiding gallery figures: %o", error);
    }
}

/**
 * This function sets the display of figures depending on their category.
 * @param {HTMLElement[]} filteredFigures : only the figures of a selected category. All is a possible selection.
 * @param {HTMLElement[]} figuresArray : the gallery as an array of figures
 * @returns the gallery as an array of figures displayed based on their category
 */
function displayFilteredFigures(filteredFigures, figuresArray) {
    try{
        figuresArray.forEach(figure => {
            if (filteredFigures.includes(figure)) {
                figure.style.display = "block";
            }
        });
        return figuresArray;
    } catch(error) {
        console.error("Error at display setting: %o", error);
    }
}

/**
 * This function filters the gallery by category and displays the corresponding figures.
 * @param {HTMLOptionElement} option : a category to filter on
 * @param {Element} galleryDiv : the <div class="gallery"> containing the figures
 * @param {HTMLElement[]} initialGallery : the figures initially fetched from the API
 */
export function filterGallery(option, galleryDiv, initialGallery) {
    try{
        let val = option;
        if(val.includes(" ") && val !== "Tous") {
            val = replaceSpaceByUnderscore(val);
        }
        let figures = document.querySelectorAll(".gallery figure");
        let figuresArray = Array.from(figures);
        let filteredFigures;
        if(val != "Tous"){
            filteredFigures = figuresArray.filter((figure) => {
                return figure.className === val;
            });
        } else {
            filteredFigures = initialGallery;
        }
        hideGallery();
        figuresArray = displayFilteredFigures(filteredFigures, figuresArray);
        replaceGallery(figuresArray, galleryDiv);
    } catch(error) {
        console.error("Error filtering the gallery: %o", error);
    }
}

/**
 * This function replaces the gallery. 
 * The gallery is first emptied. 
 * Then the filtered gallery replaces the previously displayed content.
 * @param {HTMLElement[]} figuresArray : the updated gallery set up to display only the filtered category
 * @param {Element} galleryDiv : the <div class="gallery"> containing the figures
 */
function replaceGallery(figuresArray, galleryDiv) {
    galleryDiv.innerHTML = "";
    figuresArray.forEach(figure => {
        galleryDiv.appendChild(figure);
    });
}