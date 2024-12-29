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
import {
    formExported
} from "./script.js";
import {
    getCategories,
    formDataValueReplacer
} from "./helper.js";

/**
 * This function adds a work. It sends it to the back-end.
 * At page reload it must be visible.
 * @param { Event } event : login form SubmitEvent button click
 */
export async function addSubmit(event) {
    event.preventDefault();
    const image = document.querySelector("#input-file-photo").value;
    const title = document.querySelector("#title").value;
    const category = document.querySelector("#category").value;
    const erreur = document.querySelector("#erreur");
    erreur.innerHTML = "";
    try {
        const url = new URL(worksURL);
        const formData = new FormData(form);
        console.log("addSubmit 1");
        const formDataId = formDataValueReplacer(formData, "category", getCategories());
        
        const fetchOptions = {
            method: "POST",
            headers: {
                accept: "multipart/form-data",
                "Content-Type": "application/json"
            },
            body: formDataId
        };
        try{
            console.log("Before fetch.");
            console.log("URL: " + url);
            console.log("FormData: " + formData);
            console.log("Fetch options: " + fetchOptions);
            const res = await fetch(url, fetchOptions);
            console.log("Request status: " + res.status);
            if(res.ok) { 
                console.log("Created. Expected res.status is 201, status: " + res.status + ". Info: " + res.statusText);
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
            }
            else if(res.status === 401) {
                displayError("Utilisat·rice·eur pas authentifié·e", erreur);
            } else if(title !== "test") {
                displayError("Titre incorrect", erreur);
            } else if(category !== "Objets" || category !== "Appartements" || category !== "Hotels & restaurants") {
                displayError("Catégorie inconnue", erreur);
                console.log("category: " + category);
                console.log("Request result status: " + res.status + ". Message: " + res.statusText);
                console.log("FormData entries:");
                for(let [key, value] of formData.entries()) {
                    console.log(`${key} : ${value}`);
                }
            } else { console.error("Request -> result error. Status:  " + res.status + ". Message: " + res.statusText);}
        } catch(err) {
            console.error("Fetch err: " + err);
        }
        console.log("add fetch done");
        console.log("res.status: " + res.status);
    } catch(error) {
        erreur.innerHTML = "Votre ajout essuie une erreur. Demandez ou lisez les logs s'il vous plaît.";
    }
}