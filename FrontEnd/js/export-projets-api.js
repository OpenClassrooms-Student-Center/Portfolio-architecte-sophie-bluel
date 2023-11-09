/** Données WORKS de l'API
* Création d'une fonction pour récupérer les projets de l'API.
* @function worksPortfolio
*Indique le type de valeur qui indique que la fonction renvoie une promesse, pour sa disponibilité asyncrone.
* @returns {Promise}

/** la fonction worksPortfolio envoie une requête à une URL de l'API/works,
* récupère les données JSON de la réponse de la requête, puis renvoie
* ces données sous forme de promesse. */
export const worksPortfolio = async () => {
  try {
    const reponse = await fetch("http://localhost:5678/api/works");
    const data = await reponse.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};

/** Données CATEGORIES de l'API
/ @function categoriesPortfolio
/ @returns {Promise}

/** la fonction categoriesPortfolio envoie une requête à une URL de l'API/categories,
* récupère les données JSON de la réponse de la requête, puis renvoie
* ces données sous forme de promesse.
*/
const categoriesPortfolio = async () => {
  try {
    const reponse = await fetch("http://localhost:5678/api/categories");
    const data = await reponse.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};
/** Exporte les variables contenants les résultats de la variable
 *  works et categories après que la promesse soit résolue
 */
export const works = await worksPortfolio();
export const categories = await categoriesPortfolio();








/**  Supression d'un projet de l'API  */

const token = "avanti";
const projectId = 'data-id';

// Stocker le jeton d'authentification et l'ID du projet dans le localStorage
localStorage.setItem('token', token);
localStorage.setItem('data-id', projectId);

console.log("Token stored in localStorage:", localStorage.getItem('token'));



/** Fonction pour supprimer un projet.
 * @function deleteApi
*/
export function deleteApi(event, id) {
  event.preventDefault();

  const userOnline = JSON.parse(sessionStorage.getItem("userOnline"));
  const token = localStorage.getItem('token');
  console.log("Bouton de suppression cliqué");

  fetch(`http://localhost:5678/api/works/${id}`, {
      method: 'DELETE',
      headers: {
        "content-Type": "application/json",
        'Authorization': "Bearer " + userOnline.token,
      }
  })
  .then(response => {
      if (response.ok) {
          const figureElement = event.target.closest('figure');
          if (figureElement) {
              figureElement.remove();
          }
          console.log(`ID ${id} supprimé avec succès.`);
      } else {
          throw new Error(`Erreur lors de la suppression du projet ID ${id}`);
      }
  })
  .catch(error => {
    console.error("Erreur lors de la suppression du projet:", error);
    if (error instanceof Response) {
        if (error.status === 401) {
            console.error("Erreur d'autorisation : Jeton invalide ou expiré.");
        }
    }
  });
}
