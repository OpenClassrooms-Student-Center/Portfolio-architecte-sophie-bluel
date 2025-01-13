import {
    deleteWork
} from "../modal/delete_work.js";
import {
    replaceSpaceByUnderscore
} from "../helpers/string_replacer.js";
import {
    worksURL
} from "../script.js";

/**
 * This function displays the gallery view of the 
 *     landing page or
 *     modal.
 * This function creates HTML elements in <div class="gallery"> based on works from the API.
 * It is called in script.js line 55.
 * @param {String} element : "landing" or "modal"
 * @param {Array} works : JSON array of works from backend
 */
export function displayGallery(element, works) {
    try {  
        let gallery; 
        let figcaption;

        works.forEach(work => {
            const figure = document.createElement("figure");

            let img = document.createElement("img");
            img.src = work.imageUrl;
            img.alt = work.title;

            figure.id = element + "#" + work.id;

            if(element === "landing"){
                gallery = document.querySelector(".gallery");
                
                figcaption = document.createElement("figcaption");
                figcaption.innerText = work.title;

                let categ = work.category.name;
                categ = replaceSpaceByUnderscore(categ);
                figure.classList.add(categ);
            }
            else if(element === "modal") {
                gallery = document.getElementById("gallery");

                /****** Step 3.2 delete work ******/
                const delIcon = document.createElement("i");
                delIcon.classList.add(
                    "delete-proj",
                    "material-symbols-outlined",
                    "pointer");
                delIcon.classList.add("delete-proj");
                delIcon.innerText = "delete";
                delIcon.ariaHidden = "true";
                delIcon.id = work.id;

                delIcon.addEventListener("click", (event) => {
                    event.preventDefault();
                    deleteWork(worksURL, work.id, work.title);
                });
                
                figure.appendChild(delIcon);
            }
            figure.appendChild(img);

            if(element === "landing") {
                figure.appendChild(figcaption);
            }

            gallery.appendChild(figure);
        });
    } catch(error) {
        console.error("Error at filling the gallery: ", error);
    }
}

/**
 * This function removes landing page gallery's DOM work figure with the specified id.
 * @param {integer} idWork 
 */
export function deleteWorkFigureFromLandingPageDOM(idWork) {
    try {
        const el = document.getElementById("landing" + "#" + idWork); // figure sur page d'accueil
        if(el) {
            el.remove();
            console.log(`Landing page figure id n°${idWork} was deleted from DOM.`);
        }
        else { 
            console.error(`No landing page figure having id landing#${idWork} was found in the DOM.`);
        }
    } catch(error) {
        console.error(`Error deleting landing page figure id n° ${idWork}:  ${error}`);
    }
}