/*
FILTERS MON PREMIER CODE
 */
/**
 * get My Button by ID categories
 * @param {number} categoriesId 
 */
export function filterBy(categoriesId) {
    // get My Button
    const boutonFilter = document.querySelector("#filterBtn_" + categoriesId);
    // onClick
    boutonFilter.addEventListener("click", function () {
        if (categoriesId === 0) {
            document.querySelector(".gallery").innerHTML = "";
            return showWorkBy(maListWorks);
        } else {
            const filterByObjets = maListWorks.filter(function (objet) {
                return objet.category.id === categoriesId;
            });
            document.querySelector(".gallery").innerHTML = "";
            showWorkBy(filterByObjets);
            // console.log(filterByObjets);
        }
    });
}


// Voir pour utiliser la CLASS SET !
filterBy(0);
filterBy(1);
filterBy(2);
filterBy(3);