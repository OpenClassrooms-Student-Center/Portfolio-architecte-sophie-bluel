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

/**
 * This function adds a work. It sends it to the back-end.
 * At page reload it must be visible.
 * @param { Event } event : login form SubmitEvent button click
 */
export async function addSubmit(event) {
    console.log("enter add submit");
    event.preventDefault();
    const image = document.querySelector("#input-file-photo").value;
    const title = document.querySelector("#title").value;
    const category = document.querySelector("#category").value;
    const erreur = document.querySelector("#erreur");
    erreur.innerHTML = "";
    try {
        console.log("enter try");
        const url = new URL(worksURL);
        console.log("url: " + url);
        console.log("formImported: " + formExported);
        const formData = new FormData(formExported);
        console.log("8");
        const fetchOptions = {
            method: "POST",
            headers: {
                accept: "multipart/form-data"
            },
            body: formData
        };
        console.log("before fetch n°2");
        try{
            console.log("Before fetch.");
            console.log("URL: " + url);
            console.log("FormData: " + formData);
            console.log("Fetch options: " + fetchOptions);
            const res = await fetch(url, fetchOptions);
            console.log("Request status: " + res.status);
            if(res.ok) { 
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
            } else { console.error("Request error: " + res.statusText);}
        } catch(err) {
            console.error("Fetch err: " + err);
        }
        console.log("add fetch done");
        console.log("res.status: " + res.status);

        if(res.status === 401) {
            displayError("Utilisat·rice·eur pas authentifié·e", erreur);
        }
        if(title !== "test") {
            displayError("Titre incorrect", erreur);
        }
        else if(category !== "Objets" || category !== "Appartements" || category !== "Hotels & restaurants") {
            displayError("Catégorie inconnue", erreur);
            console.log("category: " + category);
        }
        else if(res.status === 200 || res.status === 201) {
           
        }
    } catch(error) {
        erreur.innerHTML = "Votre ajout essuie une erreur. Demandez ou lisez les logs s'il vous plaît.";
    }
}