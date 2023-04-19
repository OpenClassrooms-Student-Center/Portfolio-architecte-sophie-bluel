import { renderWorks } from "./works.js";
import { renderFilters } from "./filters.js";
import { ifConnect, loginButton } from "./fonctions/connect.js";


/*
ALL WORKS FUNCTION ==> RenderWorks()
 */
renderWorks();

/*
ALL FILTER FUNCTION ==> RenderFilters()
 */
renderFilters();

/*
LOGIN==> RenderLogin()
 */
loginButton();
ifConnect();






