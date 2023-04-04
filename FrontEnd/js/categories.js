/*
 Faites l’appel à l’API avec fetch afin de récupérer dynamiquement les categories des projets.
 */



/**
 * Permet de se connecter API et GET all categories
 * @returns un objet json
 */
async function fetchCategories() {
    const answer = await fetch("http://localhost:5678/api/categories", {
        method: 'GET',
        headers: {
            "Accept": "application/json",
        }
    })
    if (answer.ok === true) {
        return answer.json();
    };
    throw new Error("Impossible de contacter le serveur !!");
};

fetchCategories().then(list => {

});
