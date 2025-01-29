import { loadTemplate } from "./templates-loading.js";
import { verificationEmail, htmlSpecialChars} from "./verificateurs.js";
import { requestLog } from "./requestLog.js";


loadTemplate("../templates/header.html", "header-container");
loadTemplate('../templates/footer.html', 'footer-container');

const form = document.getElementById("form-connexion");

form.addEventListener("submit", function(event) {
    event.preventDefault();
    const email = verificationEmail(event.target.email.value);
    const password = htmlSpecialChars(event.target.password.value);
    console.log(email, password);
    requestLog(email, password);
})