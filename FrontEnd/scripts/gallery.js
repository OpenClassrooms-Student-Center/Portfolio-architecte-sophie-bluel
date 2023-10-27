/*********************************************************************************
 * 
 * Ce fichier contient toutes les fonctions nécessaires à l'affichage dynamique 
 * des projets sur le site. 
 * 
 *********************************************************************************/

/**
 * Cette fonction récupère les données des projets del'architecte depuis l'API
 * et remplit la page d'accueil du site avec les visuels & infos desdits projets.
*/
export async function fetchData() {
    try {
      const response = await fetch('http://localhost:5678/api/works');
      if (!response.ok) {
        throw new Error('Request failed');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Cette fonction crée le HTML du projet à ajouter à la galerie,
   * ajoute le projet à la galerie sur la page d'accueuil du site.
   * @param {object} data : tableau d'objets contenant les projets de l'architecte récupérés via l'API
   * @param {object} gallery : élément DOM parent des projets qu'on souhaites insérer
  */
  
  export function appendProjectsToGallery(data, gallery) {
    for (const project of data) {
      let figure = document.createElement('figure');
      const htmlStr = `
        <img src='${project.imageUrl}' alt='${project.title}'>
        <figcaption>${project.title}</figcaption>
      `;
  
      figure.innerHTML = htmlStr;
      gallery.appendChild(figure);
    }
  }
  