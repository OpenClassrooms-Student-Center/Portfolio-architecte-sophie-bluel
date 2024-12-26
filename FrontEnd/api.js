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
    // Envoi de la requête HTTP GET à l'API
    const response = await fetch(API_URI);

    // Vérification de la réponse HTTP
    if (!response.ok) {
      // Si la réponse n'est pas OK (status HTTP entre 200 et 299), on lance
      //  une erreur
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    // Si la réponse est correcte, on tente de récupérer les données au format JSON
    const data = await response.json();

    // Affichage des données dans la console pour vérifier qu'on a bien récupéré la réponse
    console.log(data);

    // Retourne les données récupérées pour qu'elles puissent être utilisées ailleurs dans le code
    return data;
  } catch (error) {
    // Si une erreur survient à n'importe quelle étape (connexion, réponse invalide, etc.),
    // l'erreur est capturée et affichée dans la console
    console.error("Erreur:", error);
  }
};
