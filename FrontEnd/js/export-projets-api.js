/***********************************************
************** DONNÉES WORKS API ***************
************************************************
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


/***********************************************
************ DONNÉES CATÉGORIES API ************
************************************************
/ @function categoriesPortfolio
/ @returns {Promise}

/** la fonction categoriesPortfolio envoie une requête à une URL de l'API/categories,
* récupère les données JSON de la réponse de la requête, puis renvoie
* ces données sous forme de promesse */

const categoriesPortfolio = async () => {
  try {
    const reponse = await fetch("http://localhost:5678/api/categories");
    const data = await reponse.json();

    return data;
  } catch (error) {
    console.error(error);
  }
};



/***********************************************
************ AUTORISATIONS API *****************
************************************************/

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiO…Tk0fQ.5z_svrUqj2zQd-LtO6qdVJmOyCFY7ZGAKyxel6NZbuo";
const projectId = 'data-id';

// Stocker le jeton d'authentification et l'ID du projet dans le localStorage
localStorage.setItem('token', token);
localStorage.setItem('data-id', projectId);

console.log("Token stored in localStorage:", localStorage.getItem('token'));

const userOnlineKey = "userOnline"; // Set the key used to store userOnline in sessionStorage

// Function to retrieve userOnline from sessionStorage
export const getUserOnlineFromSessionStorage = () => {
  if (sessionStorage.getItem(userOnlineKey)) {
    return JSON.parse(sessionStorage.getItem(userOnlineKey));
  } else {
    console.error("userOnline key not found in sessionStorage. Make sure it's stored before trying to retrieve it.");
    return null;
  }
};

// Example usage in another part of your code
const userOnline = getUserOnlineFromSessionStorage();
// Now you can use `userOnline` in this part of your code
console.log("userOnline retrieved from sessionStorage:", userOnline);


console.log("Bouton de suppression cliqué");

/***********************************************
************ SUPPRESSION PROJET API ************
************************************************
* @function deleteApi */

export function deleteApi(event, id) {
  event.preventDefault();

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


/***********************************************
*************** AJOUT PROJET API ***************
************************************************
 * @function postApi
 * @returns {Promise} 
 */

const createProjectFormData = (title, imageUploaded, category) => {
  const formData = new FormData();

  // Logging to check the values being appended
  console.log('Title:', title);
  console.log('Image:', imageUploaded);
  console.log('Category:', category);

  // Ajouter les champs requis pour l'API
  formData.append('title', title);
  formData.append('image', imageUploaded);
  formData.append('category', category);

  return formData;
};


export const postApi = async (projectId, userOnline) => {
  try {
    const formData = createProjectFormData(
      projectId.title,
      projectId.imageUrl,
      projectId.categoryId
    );
    const reponse = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Authorization": "Bearer " + userOnline.token,
      },
      body: formData,
    });

    const resultat = await reponse.json();
    console.log("Réussite :", resultat);
  } catch (erreur) {
    console.error("Erreur :", erreur);
  }
};


/***********************************************
************ INITIALISATION DES DONNÉES *********
************************************************/
export const works = await worksPortfolio();
export const categories = await categoriesPortfolio();
