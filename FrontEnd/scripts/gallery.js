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
   * @param {object} categoryNames : tableau d'objets contenant les projets de l'architecte récupérés via l'API
  */
  
  export function appendProjectsToGallery(data, gallery, categoryNames) {
    for (const project of data) {
      let figure = document.createElement('figure');
      const htmlStr = `
        <img src='${project.imageUrl}' alt='${project.title}'>
        <figcaption>${project.title}</figcaption>
      `;
  
      figure.innerHTML = htmlStr;
      figure.setAttribute('data-category', findCategory(project.category.id, categoryNames));
      gallery.appendChild(figure);
    }
  }
  
  /**
 * Cette fonction parcourt le tableau des projets de l'architecte, 
 * élimine les doublons, et renvoie un tableau contenant les classes définies
 * à utiliser dans dans la génération des filtres
 * @param {object} data : tableau d'objets contenant les projets de l'architecte récupérés via l'API
*/

export function getCategoryNames(data) {
  const categoryNames = [];
  const categoryNamesSet = new Set();

  for (const project of data) {
    const formattedCategoryName = formatCategoryName(project.category.name);
    const categoryAndId = {
      id: project.category.id,
      class: formattedCategoryName,
      title: project.category.name,
    };
    const categoryAndIdString = JSON.stringify(categoryAndId);

    if (!categoryNamesSet.has(categoryAndIdString)) {
      categoryNames.push(categoryAndId);
      categoryNamesSet.add(categoryAndIdString);
    }
  }
  return categoryNames;
}

/**
 * Cette fonction formate le nom des catégories pour en faire des noms de classes HTML 
 * (pas d'espaces, pas d'accents, pas de caractères spéciaux),
 * @param {string} categoryName : nom de la catégorie à laquelle appartient le projet
*/

function formatCategoryName(categoryName) {
  return categoryName
    .toLowerCase()
    .normalize('NFD')
    .replaceAll(/[\u0300-\u036f\s]/g, '')
    .replaceAll(/[^a-zA-Z0-9-]/g, '-');
}

/**
 * Cette fonction applique le nom de la catégorie au projet à insérer, qui sera utiles pour
 * le filtrage des projets par catégorie 
 * @param {string} idProject : identifiant du projet
 * @param {string} categoryNames : tableau d'objets contenant les projets de l'architecte récupérés via l'API
*/

function findCategory(idProject, categoryNames) {
  for (let i = 0; i < categoryNames.length; i++) {
    if (categoryNames[i].id === idProject) {
      return categoryNames[i].class;
    }
  }
}
/**
 * Cette fonction applique le nom de la catégorie au projet à insérer, qui sera utiles pour
 * le filtrage des projets par catégorie 
 * @param {object} portfolio : élément DOM parent de la galerie de projets
 * @param {object} gallery : élément DOM parent des projets qu'on souhaites insérer
 * @param {string} categoryNames : tableau d'objets contenant les projets de l'architecte récupérés via l'API
*/

export function addFiltersBtns(portfolio, gallery, categoryNames) {
  const div = document.createElement('div');
  div.classList.add('filters-container');

  const button = document.createElement('button');
  button.type = 'button';
  button.textContent = 'Tous';
  button.classList.add('full-color-btn', 'rounded-btn', 'all-projects');
  div.appendChild(button);
  
  for (const className of categoryNames) {
    let button = document.createElement('button');
    button.type = 'button';
    button.textContent = `${className.title}`;
    button.classList.add('filter-btn', 'rounded-btn');
    button.setAttribute('data-category', `${className.class}`),
    div.appendChild(button);
  }
  portfolio.insertBefore(div, gallery);
}

/**
 * Cette fonction gère l'affichage ou non des projets dans la galerie
 * selon leur tag + le bouton d'affichage de tou sles projets
 * @param {string} category : nom de la category du projet évalué pour déterminer
 * s'il est affiché ou non
*/

export function filterImages(category) {
  const figures = document.querySelectorAll('.gallery figure');
  
  figures.forEach(figure => {
    if (category === 'all' || figure.getAttribute('data-category') === category) {
      // Afficher l'image si la catégorie correspond ou si "Toutes" est sélectionné
      figure.style.display = 'block';
    } else {
      // Masquer l'image si la catégorie ne correspond pas
      figure.style.display = 'none';
    }
  });
}