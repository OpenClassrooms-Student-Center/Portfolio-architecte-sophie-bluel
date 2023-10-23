// Récupération des données de l'API

//Données WORKS
export function works() {
    return fetch('http://localhost:5678/api/works')
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors de la récupération des projets:', error);
      });
  }
  
  //Données CATEGORIES
  export function categories() {
    return fetch('http://localhost:5678/api/categories')
      .then(response => response.json())
      .then(data => {
        return data;
      })
      .catch(error => {
        console.error('Une erreur s\'est produite lors de la récupération des catégories:', error);
      });
  }