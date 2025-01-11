import {
    worksURL
} from "../script.js";
import {
    closeModal,
    fileUpload
} from "./modal.js";
import {
    displayError
} from "../connection.js";
import {
    getCategoryId
} from "../helpers/category_getId.js";
import {
    formDataValueReplacer
} from "../helpers/FormData_value_replacer.js";

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
/****** whole trace
 * Live reload enabled.
connection.js:6 8:02:37 PM connection page script begins
modal.js:271 wrapper user click
modal.js:252 change file event
modal.js:258 reader: [object FileReader]
modal.js:265 reader.onload enter
add_work.js:42 end submit var
add_work.js:46 formData before replace: [object FormData]
add_work.js:65 Before fetch enter try...
add_work.js:66 url: http://127.0.0.1:5678/api/works/
add_work.js:67 boundary: ----WebKitFormBoundary--6zrkul46ttt
add_work.js:68 formDataBinary.entries except image base64 binary string: [object FormData]
add_work.js:71 title: test
add_work.js:71 category: 1
add_work.js:74 Fetch options: [object Object]
add_work.js:75 
        
        
       POST http://127.0.0.1:5678/api/works/ 400 (Bad Request)
addSubmit @ add_work.js:75
await in addSubmit
(anonymous) @ script.js:170
add_work.js:95 category: Objets
add_work.js:96 Request res.status: 400. res.statusText: Bad Request
add_work.js:97 res.body.toString():    [object ReadableStream]
add_work.js:98 JSON.stringify(res):    {}
add_work.js:99 JSON.stringify(res.body):    {}
add_work.js:101 FormDataBinary entries:
add_work.js:103 image : data:image/jpeg;base64,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
add_work.js:103 title : test
add_work.js:103 category : 1
add_work.js:109 add fetch done
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
        const boundary = "----WebKitFormBoundary--" + Math.random().toString(36).substring(2);
        const fetchOptions = {
            method: "POST",
            headers: {
                accept: "application/json",
                "Content-Type": "multipart/form-data; boundary=" + boundary
            },
            body: formDataBinary
        };
        try{
            console.log("Before fetch enter try...");
            console.log("url: " + url);
            console.log("boundary: " + boundary);
            console.log("formDataBinary.entries except image base64 binary string: " + formDataBinary);
            for(let [key, value] of formDataBinary.entries()) {
                if(key !== "image") {
                    console.log(`${key}: ${value}`);
                }
            }
            console.log("Fetch options: " + fetchOptions);
            const res = await fetch(url, fetchOptions);
            if(res.ok) { 
                console.log("Created. Expected res.status is 201, status: " + res.status + ". Info: " + res.statusText);
                const data = await res.json();
               
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
                console.log("Request res.status: " + res.status + ". res.statusText: " + res.statusText);
                console.log("res.body.toString():    " + res.body.toString());                
                console.log("JSON.stringify(res):    " + JSON.stringify(res));              
                console.log("JSON.stringify(res.body):    " + JSON.stringify(res.body));                          

                console.log("FormDataBinary entries:");
                for(let [key, value] of formDataBinary.entries()) {
                    console.log(`${key} : ${value}`);
                }
            } else { console.error("Request -> result error. Status:  " + res.status + ". Message: " + res.statusText);}
        } catch(err) {
            console.error("Fetch err: " + err);
        }
        console.log("add fetch done");
    } catch(error) {
        erreur.innerHTML = "1 Votre ajout essuie une erreur. Demandez ou lisez les logs s'il vous plaît.";
    }
}