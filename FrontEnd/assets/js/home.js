import { renderWorks } from './works.js';
import { renderFilters } from "./categories.js";
import { setAdminPage } from "./admin.js";
import { modalFunction } from "./modal.js";




renderWorks("Tous")

const removeMarginClass = function (){
    const navBar = document.querySelector("header");
    navBar.classList.remove("adminHeader")

}

if (localStorage.getItem('token')) {
    setAdminPage();
    modalFunction()
    
} else {
    renderFilters()
    removeMarginClass()
}
