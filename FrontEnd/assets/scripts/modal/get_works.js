import {
    worksURL
} from "../script.js";

/****** Step 1.1 get works from backend ******/
/**
 * This function fetches data and fills the localStorage for speed and less network use during next page reloads.
 * @returns : an array of fetched works in JSON format is returned.
 */
export async function fetchAndStoreWorks() {
    fetch(worksURL).then(works => works.json()).then(worksJSON => {
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