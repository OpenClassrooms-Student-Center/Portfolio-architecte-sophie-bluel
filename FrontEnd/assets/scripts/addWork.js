import {
    worksURL
} from "./deleteWorks.js";
import {
    closeModal,
    galleryData
} from "./modal.js";
import {
    displayError
} from "./connection.js";

/**
 * This function adds a work. It sends it to the back-end.
 * At page reload it must be visible.
 * @param { Event } : login form SubmitEvent button click
 */
export async function addSubmit() {
    console.log("enter add submit");
    const image = document.querySelector("#file-photo").value;
    const title = document.querySelector("#title").value;
    const category = document.querySelector("#category").value;
    const addData = {
        image,
        title,
        category
    };
    const req = {
        method: "POST",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(addData)
    }
    const erreur = document.querySelector("#erreur");
    erreur.innerHTML = "";
    
    try {
        const res = await fetch(worksURL, req);
        console.log("add fetch done");
        if(res.status === 401) {
            displayError("Utilisat·rice·eur pas authentifié·e", erreur);
        }
        if(title !== "test") {
            displayError("Titre incorrect", erreur);
        }
        else if(category !== "test") {
            displayError("Catégorie inconnue", erreur);
        }
        else if(res.status === 200 || res.status === 201) {
            console.log("Created");
            const data = await res.json();
            galleryData.addData ({
                src: data.imageUrl,
                alt: data.title,
                id: data.userId
            });
            image = null;
            title = "";
            category = "";
            closeModal();
            console.log("end add submit");
        }
    } catch(error) {
        erreur.innerHTML = "Votre ajout essuie une erreur.";
        throw new Error("Fetch error: ", error);
    }
}