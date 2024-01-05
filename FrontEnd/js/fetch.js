// Recuperer les infos du backend
// on comunique avec le backend pour recuperer les projets 
function loadWorks() {
    //  RENVOIE DE TOUT LE FETCH(FONCTION-RACOURCIE)
    return fetch("http://localhost:5678/api/works")
        .then(reponse => reponse.json())
        .then((works) => {
            return works

        })
        .catch((error) => {
            console.error(
                "Il y a eu un problème avec l'opération fetch : " + error.message,
            );
        });
}



// Recuperer les infos du backend
// on comunique avec le backend pour recuperer les catégories

function loadCategories() {
    return fetch("http://localhost:5678/api/categories")
        .then(reponse => reponse.json())
        .then((categories) => {
            return categories

        })
        .catch((error) => {
            console.error(
                "Il y a eu un problème avec l'opération fetch : " + error.message,
            );
        });
}
