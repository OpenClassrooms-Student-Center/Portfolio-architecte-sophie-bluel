/***********************************************
************** DONNÉES WORKS API ***************
************************************************/
export const worksPortfolio = async () => {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

/***********************************************
************ DONNÉES CATÉGORIES API ************
************************************************/
export const categoriesPortfolio = async () => {
  try {
    const response = await fetch("http://localhost:5678/api/categories");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

/***********************************************
************ AUTORISATIONS API *****************
************************************************/
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwMDU2MDczNCwiZXhwIjoxNzAwNjQ3MTM0fQ.0Cg_KJJA1UW2U106aoBUzZ5zmSydA_vDy-h3qA1-Zao";
const projectId = 'data-id';

// Stocker le jeton d'authentification et l'ID du projet dans le localStorage
localStorage.setItem('token', token);
localStorage.setItem('data-id', projectId);

console.log("Token stored in localStorage:", localStorage.getItem('token'));

/***********************************************
************ SESSION STORAGE *******************
************************************************/
const userOnlineKey = "userOnline"; // Clé utilisée pour stocker userOnline dans sessionStorage

// Fonction pour récupérer userOnline depuis sessionStorage
export const getUserOnlineFromSessionStorage = () => {
  const storedUserOnline = sessionStorage.getItem(userOnlineKey);
  return storedUserOnline ? JSON.parse(storedUserOnline) : null;
};

// Récupérer userOnline depuis sessionStorage
const userOnline = getUserOnlineFromSessionStorage();
console.log("userOnline retrieved from sessionStorage:", userOnline);

console.log("Bouton de suppression cliqué");

/***********************************************
************ SUPPRESSION PROJET API ************
************************************************/
export const deleteApi = async (event, id) => {
  event.preventDefault();

  try {
    const token = userOnline?.token;

    if (!token) {
      console.error("Token not found.");
      return;
    }

    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        'Authorization': "Bearer " + token,
      }
    });

    if (response.ok) {
      const figureElement = event.target.closest('figure');
      if (figureElement) {
        figureElement.remove();
      }
      console.log(`ID ${id} supprimé avec succès.`);
    } else {
      throw new Error(`Erreur lors de la suppression du projet ID ${id}`);
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du projet:", error);
    if (error instanceof Response) {
      if (error.status === 401) {
        console.error("Erreur d'autorisation : Jeton invalide ou expiré.");
      }
    }
  }
};

/***********************************************
*************** AJOUT PROJET API ***************
************************************************
 * @function createProjectFormData
 */

export const createProjectFormData = (title, image, category) => {
  const formData = new FormData();

  // Logging to check the values being appended
  console.log('Title:', title);
  console.log('Image:', image);
  console.log('Category:', category);

  // Ajouter les champs requis pour l'API
  formData.append('title', title);
  formData.append('image', image);
  formData.append('category', category);

  return formData;
};

export const postApi = async (projectId) => {
  try {
    const userOnline = getUserOnlineFromSessionStorage();

    if (!userOnline || !userOnline.token) {
      console.error("Token not found in userOnline.");
      return;
    }

    const formData = createProjectFormData(
      projectId.title,
      projectId.image,
      projectId.category
    );

    const response = await fetch("http://localhost:5678/api/works", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "Authorization": "Bearer " + userOnline.token,
      },
      body: formData,
    });

    const result = await response.json();
    console.log("Réussite :", result);
  } catch (error) {
    console.error("Erreur :", error);
  }
};

/***********************************************
************ INITIALISATION DES DONNÉES *********
************************************************/
export const works = await worksPortfolio();
export const categories = await categoriesPortfolio();
