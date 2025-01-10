/**
 * This function replaces spaces by underscores ("_").
 * It is called in 
 *     filter_by_category.js filterGallery() line 51,
 *     getWorks.js fillGallery line 53.
 * @param {string} name : the class name including one or more spaces (" ")
 * @returns the string substitution with "_" instead of " "
 */
export function replaceSpaceByUnderscore(name) {
    let underscored = name;
    if(name.includes(" ")) {
        underscored = name.replaceAll(" ", "_");
    }
    return underscored;
}