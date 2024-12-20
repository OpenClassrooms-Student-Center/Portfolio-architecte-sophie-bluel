const API_URI = "http://localhost:5678/api/works";
export const getArtGalleryData = () => {
  return fetch(API_URI)
    .then((response) => {
      if (!response.ok) {
        // Vérifie si la réponse est OK (statut HTTP entre 200 et 299)
        throw new Error(`Erreur HTTP: ${response.status}`);
      }
      return response.json(); // Convertir la réponse en JSON
    })
    .then((data) => {
      console.log(data); // Afficher les données récupérées dans la console
    })
    .catch((error) => {
      console.error("Erreur:", error); // Afficher les erreurs éventuelles
    });
};
getArtGalleryData();
