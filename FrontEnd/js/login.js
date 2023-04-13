import { fetchJSON } from "./fonctions/api.js";
import { errorMessage } from "./fonctions/dom.js";


/*
GET LOGIN
 */
try {
    var maListWorks = await fetchJSON("http://localhost:5678/api/works");
    renderWorks(maListWorks);
    console.log(maListWorks);
} catch (error) {
    console.error(error);
    const message = "Il y a une erreur sur le fetch des projets !";
    errorMessage(error, message, "#portfolio");
}

