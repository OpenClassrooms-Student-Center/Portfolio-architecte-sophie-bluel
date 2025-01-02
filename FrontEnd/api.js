// Définition de l'URL de l'API à laquelle on va envoyer la requête.
// Celle-ci est utilisé pour obtenir les données de la galerie d'art.
// 11 travaux sont disponibles au départ.
//---------------l'url permet d'accéder aux travaux de l'api---------------
const API_URI = "http://localhost:5678/api/works";

// Fonction asynchrone qui va récupérer les données de l'API de la galerie
// d'art. Asynch permet d'attendre la réponse de l'API avant de poursuivre
// le code.
export const fetchArtGalleryData = async () => {
  // Utilisation de try-catch pour gérer les erreurs
  try {
    // Envoi de la requête HTTP GET à l'API. premier argument est l'url
    const response = await fetch(API_URI);

    // Vérification de la réponse HTTP
    if (!response.ok) {
      // Si la réponse n'est pas OK (status HTTP entre 200 et 299), on lance
      //  une erreur
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    // Si la réponse est correcte, on tente de récupérer les données au format JSON
    const dataWorks = await response.json();

    // Affichage des données dans la console pour vérifier qu'on a bien récupéré la réponse
    console.log(dataWorks);

    // Extraire les catégories uniques des projets
    const categories = new Set();
    dataWorks.forEach((project) => {
      categories.add(project.category.name);
    });

    // Convertir le Set en tableau pour pouvoir le passer en paramètre à
    //  displayFilter. Dans notre cas, je veux récupérer la liste des
    //  projets, mais aussi extraire les catégories uniques des projets.
    return {
      //data est un tableau d'objets qui contient déjà toutes les informations
      // des projets. C'est un objet itérable, donc je n'ai pas besoin de
      // le transformer en tableau avec le spread operator.
      projects: dataWorks,
      //Le spread operator ici va me permettre d'extraire chaque élément
      //  du Set et de les mettre dans un tableau.
      categories: [...categories],
    };
  } catch (error) {
    // Si une erreur survient à n'importe quelle étape (connexion, réponse invalide, etc.),
    // l'erreur est capturée et affichée dans la console
    const errorMessage = document.querySelector("#error-message");
    errorMessage.textContent = `Une erreur est survenue: ${error.message}`;
  }
};
