import { renderWorks } from "./works.js";
import { renderFilters } from "./filters.js";
import { ifConnect, loginButton } from "./admin.js";
import { modalWindow } from "./modal.js";

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

modalWindow();




