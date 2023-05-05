import { renderWorks } from './works.js';
import { renderFilters } from "./categories.js";
import { setAdminPage } from "./admin.js";
import { modalFunction } from "./modal.js";




renderWorks("Tous")

if (localStorage.getItem('token')) {
    setAdminPage();
    modalFunction()
    
} else {
    renderFilters()
}
