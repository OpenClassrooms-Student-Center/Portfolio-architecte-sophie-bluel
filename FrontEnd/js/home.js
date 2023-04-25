import { renderWorks } from "./works.js";
import { renderFilters } from "./filters.js";
import { setAdmin } from "./admin.js";
import { setLogin } from "./login.js";

// Variables
const pageLogin = document.querySelector("#formLogin");
const pageIndex = document.querySelector("#portfolio");
let SESSION = localStorage.key("SESSION");

/**
 * PAGE INDEX
 */
if (pageIndex) {
    try {
        renderWorks();

        if (SESSION === "SESSION") {
            setAdmin();
        } else {
            renderFilters();
        };

    } catch (e) {
        alert("Veuillez contacter le développeur s'il vous plaît, merci")
        console.log(e);
    };
};

/**
 * PAGE LOGIN
 */
if (pageLogin) {
    try {
        setLogin();
    } catch (e) {
        alert("Veuillez contacter le développeur s'il vous plaît, merci")
        console.log(e);
    };
};



