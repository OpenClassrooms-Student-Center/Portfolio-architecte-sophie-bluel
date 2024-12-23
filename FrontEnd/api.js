const API_URI = "http://localhost:5678/api/works";

export const fetchArtGalleryData = async () => {
  try {
    // Effectuer la requête HTTP GET
    const response = await fetch(API_URI);

    if (!response.ok) {
      // Vérifie si la réponse est OK (statut HTTP entre 200 et 299)
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    // Récupère les données au format JSON
    const data = await response.json();
    console.log(data); // Affiche les données récupérées dans la console
    return data; // Retourne les données pour utilisation ultérieure
  } catch (error) {
    console.error("Erreur:", error); // Afficher les erreurs éventuelles
  }
};
