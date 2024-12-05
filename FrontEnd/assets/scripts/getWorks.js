/****** Step 1.1 get works from backend ******/
/**
 * This function fetches data and fills the localStorage for speed and less network use during next page reloads.
 * @returns : an array of fetched works in JSON format is returned.
 */
export async function fetchAndStoreWorks() {
    fetch("http://localhost:5678/api/works").then(works => works.json()).then(worksJSON => {
        if (Array.isArray(worksJSON)) {
            window.localStorage.setItem("works", JSON.stringify(worksJSON));
            return worksJSON;
        } else {
            console.error("Works %o aren't an array.", worksJSON);
            return [];
        }
    }).catch(error => {
        console.error("Error at works fetch from API: ", error);
        return [];
    });
}

/**
 * This function creates HTML elements in <div class="gallery"> based on works from the API.
 * @param {Promise<any>} works : works in JSON format is expected from the API at promise resolution
 * @param {Element} galleryDiv : the <div class="gallery"> including figures
 * @param {HTMLElement[]} initialFetchedGallery : a copy of the gallery initially fetched from the API
 * @returns : the array of figures initially fetched from the API
*/
export async function fillGallery(works, galleryDiv, initialFetchedGallery) {
    try{
        const result = await works;
        const figures = [];
        result.forEach(work => {
            let imgFromAPI = document.createElement("img");
            const titleFromAPI = work.title;
            imgFromAPI.src = work.imageUrl;
            imgFromAPI.alt = titleFromAPI;
            let figcaptionFromAPI = document.createElement("figcaption");
            figcaptionFromAPI.innerText = titleFromAPI;
            let figureFromAPI = document.createElement("figure");
            let categ = work.category.name;
            categ = replaceSpaceByUnderscore(categ);
            figureFromAPI.classList.add(categ);
            figureFromAPI.appendChild(imgFromAPI);
            figureFromAPI.appendChild(figcaptionFromAPI);
            figures.push(figureFromAPI);
        });
        galleryDiv.innerHTML = "";
        figures.forEach(figure => {
            galleryDiv.appendChild(figure);
        });
        initialFetchedGallery = Array.from(document.querySelectorAll(".gallery figure"));
        return initialFetchedGallery;
    } catch(error) {
        console.error("Error at filling of the gallery: ", error);
    }
}

/**
 * This function replaces spaces by underscores ("_").
 * @param {string} name : the class name including one or more spaces (" ")
 * @returns the string substitution with "_" instead of " "
 */
export function replaceSpaceByUnderscore(name) {
    let underscored = name;
    if(name.includes(" ")) {
        underscored = name.replaceAll(" ", "_");
    }
    return underscored;
}