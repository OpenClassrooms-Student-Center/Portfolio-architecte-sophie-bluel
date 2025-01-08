import {
    worksURL
} from "./delete_works.js";
import {
    closeModal,
    galleryData,
    fileUpload
} from "./modal.js";
import {
    displayError
} from "./connection.js";
import {
    getCategoryId,
    formDataValueReplacer
} from "./helper.js";

/**
 * This function adds a work. It sends it to the back-end.
 * At page reload it must be visible.
 * @param { Event } event : login form SubmitEvent button click
 */
/*******
 * checkWork debug is ongoing:
 * auth's req.headers.authorization: undefined
0 checkWork enter.
0.1 req: [object Object] 12:48:27
1 req.hostname:portHardCoded:    127.0.0.1:5678 12:48:27
2 req.body.title:    undefined
3 req.body.category:    undefined
4 req protocol:    http
5 req.file:    undefined
12:48:27 Something wrong occured in checkWork.
 ******/
export async function addSubmit(event) {
    event.preventDefault();
    const image = document.querySelector("#image").value;
    const title = document.querySelector("#title").value;
    const category = document.querySelector("#category").value;
    const erreur = document.querySelector("#erreur");
    const form = document.querySelector("#modal-form");
    erreur.innerHTML = "";
    console.log("end submit var")
    try {
        const url = new URL(worksURL);
        console.log("url: " + url);
        const formData = new FormData(form);
        console.log("formData before replace: " + formData);
        form.addEventListener("formdata", (e) => {
            const data = e.formData;
            for(const value of data.values()) {
                console.log("event formdata value: " + value)
            }
        })
        const formDataId = formDataValueReplacer(formData, "category", await getCategoryId());
        const formDataBinary = formDataValueReplacer(formDataId, "image", fileUpload);
        console.log("formDataBinary: " + formDataBinary);
        for(let [key, value] of formDataBinary.entries()) {
            console.log(`${key}: ${value}`);
        }
        const boundary = "----WebKitFormBoundary--" + Math.random().toString(36).substring(2);
        console.log("boundary: " + boundary);
        const fetchOptions = {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-Type": "multipart/form-data; boundary=" + boundary
            },
            body: formDataBinary
        };
        try{
            console.log("Before fetch.");
            console.log("URL: " + url);
            console.log("FormDataBinary: " + formDataBinary);
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
                console.log("FormDataBinary entries:");
                for(let [key, value] of formDataBinary.entries()) {
                    console.log(`${key} : ${value}`);
                }
            } else { console.error("Request -> result error. Status:  " + res.status + ". Message: " + res.statusText);}
        } catch(err) {
            console.error("Fetch err: " + err);
        }
        console.log("add fetch done");
        console.log("res.status: " + res.status);
    } catch(error) {
        erreur.innerHTML = "1 Votre ajout essuie une erreur. Demandez ou lisez les logs s'il vous plaît.";
    }
}