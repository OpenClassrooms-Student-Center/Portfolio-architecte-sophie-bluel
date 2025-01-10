import {
    storeInLocalStorage
} from "../connection.js"

/**
 * This function changes a hard coded test category name in its id calling the API for up-to-date data.
 * It is called in add_work.js addSubmit() line 89.
 * @returns the id of category name to the main flow.
 */
export async function getCategoryId() {
    const categoriesUrl = "http://127.0.0.1:5678/api/categories";
    const req = {
        method: "GET"
    }
    try {
        const res = await fetch(categoriesUrl, req);
        if(res.ok) {
            const data = await res.json();
            const objTrouv = data.find(obj => obj.name === "Objets");
            if(objTrouv) { 
                storeInLocalStorage(objTrouv.id, objTrouv.name);
                return objTrouv.id;
            }
        }
    } catch(err) {
        console.error("getCategoryId fetch error: " + err);
    }
}