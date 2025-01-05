import {
    worksURL
} from "./delete_works.js";
import {
    closeModal,
    galleryData
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
 * 
 * 16:09:37 connection page script begins
16:15:04 connection page script begins
modal.js:295 wrapper user click
addWork.js:63 end submit var
addWork.js:66 url: http://127.0.0.1:5678/api/works/
addWork.js:68 formData before replace: [object FormData]
helper.js:119 replace key: category
helper.js:120 replace newValue: 1
helper.js:124 enter remove->append
helper.js:125 old value: Objets
helper.js:126 appended new value: 1
helper.js:128 formData after replace: [object FormData]
addWork.js:76 formDataId: [object FormData]
addWork.js:78 input-file-photo: [object File]
addWork.js:78 title: test
addWork.js:78 category: 1
addWork.js:88 Before fetch.
addWork.js:89 URL: http://127.0.0.1:5678/api/works/
addWork.js:90 FormData: [object FormData]
addWork.js:91 Fetch options: [object Object]
addWork.js:92 
        
        
       POST http://127.0.0.1:5678/api/works/ 500 (Internal Server Error)
addSubmit @ addWork.js:92
await in addSubmit
(anonymous) @ script.js:163
addWork.js:93 Request status: 500
addWork.js:113 category: Objets
addWork.js:114 Request result status: 500. Message: Internal Server Error
addWork.js:115 FormData entries:
addWork.js:117 input-file-photo : [object File]
addWork.js:117 title : test
addWork.js:117 category : 1
addWork.js:123 add fetch done

Executing (default): SELECT `id`, `name` FROM `categories` AS `categories`;
auth's req.headers.authorization: undefined
checkWork enter.
1 host: 127.0.0.1:5678
2 title: test
3 req.body.category: 1
3 categoryId: 1
req protocol:        http
Something wrong occured in checkWork.
 */
export async function addSubmit(event) {
    event.preventDefault();
    const image = document.querySelector("#input-file-photo").value;
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
        console.log("formDataId: " + formDataId);
        for(let [key, value] of formDataId.entries()) {
            console.log(`${key}: ${value}`);
        }
        const fetchOptions = {
            method: "POST",
            /*headers: {
                accept: "multipart/form-data"
            },*/
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
        erreur.innerHTML = "1 Votre ajout essuie une erreur. Demandez ou lisez les logs s'il vous plaît.";
    }
}