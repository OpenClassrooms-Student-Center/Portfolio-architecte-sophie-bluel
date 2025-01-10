/****** Step 1.2 create the category filter ******/
import {
    replaceSpaceByUnderscore
} from "./helpers/string_replacer.js";

/**
 * This function hides the gallery.
 */
function hideGallery() {
    try{
        let figures = document.querySelectorAll(".gallery figure");
        figures.forEach(figure => {
            figure.classList.add("hide");
            figure.classList.remove("display-style");
        });
    } catch(error) {
        console.error("Error hiding gallery figures: ", error);
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
                figure.classList.add("display-style");
                figure.classList.remove("hide");
            }
        });
        return figuresArray;
    } catch(error) {
        console.error("Error at display setting: ", error);
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
                return figure.className.includes(val);
            });
        } else {
            filteredFigures = initialGallery;
        }
        hideGallery();
        figuresArray = displayFilteredFigures(filteredFigures, figuresArray);
        replaceGallery(figuresArray, galleryDiv);
    } catch(error) {
        console.error("Error filtering the gallery: ", error);
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