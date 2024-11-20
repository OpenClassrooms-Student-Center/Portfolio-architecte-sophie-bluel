/****** Step 1.2 create category filter buttons ******/
import { filterGallery } from "./filterByCategory.js";
/**
 * This function creates the HTML category filtering buttons elements
 * @param {Set} categories see filterByCategory.js getCategories all unique category of work
 * @param {Element} galleryDiv see filterByCategory.js filterGallery the div containing the figures
 * @param {HTMLElement[]} initialGallery see filterByCategory.js filterGallery initial API figures fetch
 */
export async function createCategoryFilterButtons(categories, galleryDiv, initialGallery) {
    try{
        let filterDiv = document.createElement("div");
        filterDiv.id = "filter";
        let categoryButtons = document.createElement("div");
        categoryButtons.classList.add("buttons");
        categories.forEach(category => {
            let categoryButton = document.createElement("button");
            categoryButton.innerText = category;
            categoryButton.setAttribute("data", category);
            categoryButton.classList.add("button", "filter");
            categoryButton.innerText === "Tous" ? 
                categoryButton.classList.add("selected") : 
                categoryButton.classList.add("unselected");
            categoryButton.addEventListener("click", event => {
                const selectedOption = event.target.getAttribute("data");
                filterGallery(selectedOption, galleryDiv, initialGallery);
                let prevSelected = document.querySelector(".selected");
                prevSelected.classList.remove("selected");
                prevSelected.classList.add("unselected");
                categoryButton.classList.remove("unselected");
                categoryButton.classList.add("selected");
            });
            categoryButtons.appendChild(categoryButton);
        });
        filterDiv.appendChild(categoryButtons);
        insertAfterPortfolioTitle(filterDiv);
    } catch(error) {
        console.error("Error at category filter buttons generation: %o", error);
    }
}

/**
 * This function inserts a HTML element after "Mes Projets"
 * @param {Element} element : the category filter buttons or modification link after login
 */
export function insertAfterPortfolioTitle(element) {
    let portfolio = document.getElementById("portfolio");
    const title = portfolio.querySelector("h2");
    portfolio.insertBefore(element, title.nextSibling);
}