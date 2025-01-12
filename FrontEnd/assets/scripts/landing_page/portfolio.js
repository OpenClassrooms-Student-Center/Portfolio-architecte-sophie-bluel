import {
    deleteWork
} from "../modal/delete_works.js";

/**
 * This function displays the gallery view of the 
 *     landing page or
 *     modal.
 * @param {String} element : "landing" or "modal"
 * @param {Array} works : JSON array of works from backend
 */
export function displayGallery(element, works) {   
    works.forEach(item => {
        const figure = document.createElement("figure");

        const img = document.createElement("img");
        img.src = item.imageUrl;
        img.alt = item.title;
        img.id = item.id;

        const delIcon = document.createElement("i");
        delIcon.classList.add(
            "delete-proj",
            "material-symbols-outlined",
            "pointer");
        delIcon.classList.add("delete-proj");
        delIcon.innerText = "delete";
        delIcon.ariaHidden = "true";
        delIcon.id = item.id;

        let container;
        if(element === "landing"){
            container = document.querySelector(".gallery");
        }
        else if(element === "modal") {
            container = document.getElementById("gallery");

            /****** Step 3.2 delete work ******/
            delIcon.addEventListener("click", (event) => {
                event.preventDefault();
                deleteWork(item.id);
            });
            
            figure.appendChild(delIcon);
            }

        figure.appendChild(img);

        container.appendChild(figure);
    });
}