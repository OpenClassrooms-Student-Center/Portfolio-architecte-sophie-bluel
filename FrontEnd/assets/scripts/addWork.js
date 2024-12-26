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
 * @param { Event } event : login form SubmitEvent button click
 */
export async function addSubmit(event) {
    console.log("enter add submit");
    event.preventDefault();
    const image = document.querySelector("#file-photo").value;
    const title = document.querySelector("#title").value;
    const category = document.querySelector("#category").value;
    const addData = {
        image,
        title,
        category
    };
    /*const req = {
        method: "POST",
        headers: {
            accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify(addData)
    }*/
    const erreur = document.querySelector("#erreur");
    erreur.innerHTML = "";
    
    try {
        /*const res = await fetch(worksURL, req);*/
        /*const form = event.currentTarget;*/
        /*const url = new URL(form.action);*/
        const url = new URL(worksURL);
        /*const formData = new FormData(form);*/
        /*const searchParams = new URLSearchParams(formData);*/
        const fetchOptions = {
            /*method: form.method,*/
            method: "post",
            
            headers: {
                accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(addData)
        };
        /*if(form.method.toLowerCase() === "post"){
            fetchOptions.body = form.enctype === "multipart/form-data" ? formData : searchParams;
        } else { url.search = searchParams; }*/

        const res = await fetch(url, fetchOptions);
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