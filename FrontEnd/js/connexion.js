import { loadTemplate } from "./templates-loading.js";
console.log("hello there")
loadTemplate("../templates/header.html", "header-container");
loadTemplate('../templates/footer.html', 'footer-container');