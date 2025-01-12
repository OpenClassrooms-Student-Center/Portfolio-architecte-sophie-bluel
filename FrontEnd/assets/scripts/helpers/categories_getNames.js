import {
    categories
} from "../script.js";

/**
 * This function stores in a variable all the categories of works.
 * It is called in script.js line 58.
 * @param {Array} works : see portfolio.js displayGallery. Works have a category information.
 * @returns: categories is a set of unique categories.
 */
export async function getCategoriesNames(works) {
    try{
        categories.clear();
        categories.add("Tous");

        works.forEach(work => {
            const categ = work.category.name;
            if(categories.size === 0 || ! categories.has(categ)) {
                categories.add(categ);
            }
        });
        return categories;
    } catch(error) {
        console.error("Error looping works or filling categories variable: ", error);
    }
}